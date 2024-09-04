import { useEffect, useMemo } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import DataFetcher from './lib/DataFetcher/DataFetcher';
import { initializeUsersList } from './store/UsersSlice/UsersSlice';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { AscDesc } from './utils/enums';
import { changeFilter } from './store/FilterSlice/FilterSlice';
import { User } from './utils/types';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { changeDirection, changeField } from './store/SortSlice/SortSlice';
import { orderArray } from './lib/OrderArray/OrderArray';
import { objectStringifier } from './lib/ObjectStringifier/ObjectStringifier';
import { initateTableKeys } from './store/TableKeysSlice/TableKeysSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation()

  //  "homepage": "https://github.com/EnjSadman.github.io/smartTestTask/",

  const userStorage = useSelector((state : RootState) => state.UserReducer);
  const usersArray = userStorage.users;

  const filtersStorage = useSelector((state : RootState) => state.FilterReducer);

  const sortStorage = useSelector((state : RootState) => state.SortReducer);

  const tableFields = useSelector((state : RootState) => state.TableKeysReducer);

  const usedFields = tableFields.tableKeys;

  const sortField = sortStorage.sortByField;
  const sortDirection = sortStorage.sortDirection;

  const iconMap = {
    upArrow: <ArrowUpwardIcon fontSize='inherit' />,
    downArrow: <ArrowDownwardIcon fontSize='inherit' />,
    swapVert: <SwapVertIcon fontSize='inherit' />
  }

  const orderedArray = useMemo(() => {
    return orderArray(usersArray, sortField, sortDirection);
  }, [usersArray, sortField, sortDirection]);

  async function fetchDispatchData () {
    let result = await DataFetcher();

    dispatch(initializeUsersList(result))
  }

  function singleCellContent (user : User, item : keyof User) {
    const value = user[item]

    if (typeof value === "string" || typeof value === "number") {
      return (
        <TableCell key={uuidv4()}>
          {value}
        </TableCell>   
      )
    } else if (typeof value === "object" && value !== null){
      const result = objectStringifier(value).split("\n")

      return(
        <TableCell key={uuidv4()}>
          {
            result.map((el, index) => (
              <div key={index}>
                {el}
              </div>
            )
            )
          }
        </TableCell>
      )
    }
  }

  function filtratingFunction(element : User) {
    for (let i = 0; i < usedFields.length; i++) {
      if (element[usedFields[i]] === undefined || element[usedFields[i]] === null) {
        return
      }
      if (!element[usedFields[i]].toString().includes(filtersStorage.filterValues[i])) {
        return 
      }
    }
    return element;
  }

  useEffect(() => {
    const tableKeys : (keyof User)[] = ["name", "username", "email", "phone"];
    const tempArr : string[] = Array(tableKeys.length).fill("");

    fetchDispatchData();  
    

    const params = new URLSearchParams(location.search);
    const queryParams : {[key: string]: string} = {};

    if (params.size === 0) {
      dispatch(initateTableKeys(tableKeys));
      dispatch(changeFilter(tempArr));
    } else {
      const keysArray : (keyof User)[] = [];
      const filtersArray : string[] = [];
      console.log(params);
      params.forEach((value, key) => {
        keysArray.push(key as keyof User);
        filtersArray.push(value);
      });

      dispatch(initateTableKeys(keysArray));
      dispatch(changeFilter(filtersArray))
    }

    

  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className='App__heading'>User Table</h1>
        <Table>
          <TableHead>
            <TableRow>
              {
               usedFields.map((el, index)=> {
                 return (
                   <TableCell key={index}>
                     <TextField
                       label={el}
                       value={filtersStorage.filterValues[index]}
                       onChange={(event) => {
                        const arrCopy = [...filtersStorage.filterValues];
                        let resultingPath = "";
                        arrCopy[index] = event.target.value;
                         
                        usedFields.forEach((element, index)=> {
                          if (index === 0) {
                            resultingPath += `?&${element}=${arrCopy[index]}`
                          } else {
                            resultingPath += `&${element}=${arrCopy[index]}`
                          }
                        });
                        navigate(`/${resultingPath}`, {relative: "path"})
                        dispatch(changeFilter(arrCopy));
                       }}
                     />
                   </TableCell>
                 )
               })
              }
            </TableRow>
            <TableRow>
              {
                usedFields.map((el, index) => {
                  return(
                    <TableCell key={index}>
                      <div
                        className='thead__item--wrapper'
                        onClick={() => {
                          if (sortField !== el) {
                            dispatch(changeField(el))
                            dispatch(changeDirection(AscDesc.ascending))
                          } else {
                            if (sortDirection === AscDesc.ascending) {
                              dispatch(changeDirection(AscDesc.descending))
                            } else {
                              dispatch(changeDirection(AscDesc.ascending))
                            }
                          }
                        }}
                      >
                        {el}
                        {(sortField === el) && (sortDirection === AscDesc.ascending) && iconMap.upArrow}
                        {(sortField === el) && (sortDirection === AscDesc.descending) && iconMap.downArrow}
                        {(sortField !== el) && iconMap.swapVert}
                      </div>
                    </TableCell>
                  )
                })
              }              
            </TableRow>
          </TableHead>
          <TableBody>
            {usersArray.length === 0 && <TableRow><TableCell>No users here. Sorry!</TableCell></TableRow>}    
            { orderedArray
            .filter(el=> filtratingFunction(el))
            .map(el => (
              <TableRow key={el.id}>
                {
                  usedFields.map((singleUsedField : keyof User) => singleCellContent(el, singleUsedField))
                }
              </TableRow>
            ))         
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
