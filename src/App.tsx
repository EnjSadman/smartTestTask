import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './lib/store';
import DataFetcher from './components/DataFetcher/DataFetcher';
import { initializeUsersList } from './lib/UsersSlice/UsersSlice';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { AscDesc, SortTypes } from './utils/enums';
import { changeDirection, changeField, changeFilter } from './lib/FilterSlice/FilterSlice';
import { User } from './utils/types';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';

function App() {
  const dispatch = useDispatch();

  const userStorage = useSelector((state : RootState) => state.UserReducer);
  const usersArray = userStorage.users;

  const filtersStorage = useSelector((state : RootState) => state.FilterReducer);

  const nameFilter = filtersStorage.nameFilter;
  const usernameFilter = filtersStorage.usernameFilter;
  const phoneFilter = filtersStorage.phoneFilter;
  const emailFilter = filtersStorage.emailFilter;

  const sortField = filtersStorage.sortByField;
  const sortDirection = filtersStorage.sortDirection;

  const iconMap = {
    upArrow: <ArrowUpwardIcon fontSize='inherit' />,
    downArrow: <ArrowDownwardIcon fontSize='inherit' />,
    swapVert: <SwapVertIcon fontSize='inherit' />
  }

  async function fetchDispatchData () {
    let result = await DataFetcher();

    dispatch(initializeUsersList(result))
  }

  function orderArray (array : User[], parameter: keyof User, order : AscDesc) : User[] {
    const copyArray = [...array];

    copyArray.sort((a, b) => {
      const aParameter = a[parameter];
      const bParameter = b[parameter];

      if (typeof aParameter === "string" && typeof bParameter === "string") {
        return (order === AscDesc.ascending)
        ? aParameter.localeCompare(bParameter)
        : bParameter.localeCompare(aParameter)
      }
      return 0;
    })

    return copyArray;
  }

  const orderedArray = useMemo(() => {
    return orderArray(usersArray, sortField, sortDirection);
  }, [usersArray, sortField, sortDirection]);

  useEffect(() => {
    fetchDispatchData();
  }, []);

  return (
    <div className="App">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TextField
                label="Name filter"
                value={nameFilter}
                onChange={(event) => {
                  dispatch(changeFilter({type: SortTypes.name, payload: event.target.value}));
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Username filter"
                value={usernameFilter}
                onChange={(event) => {
                  dispatch(changeFilter({type: SortTypes.username, payload: event.target.value}));
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Email filter"
                value={emailFilter}
                onChange={(event) => {
                  dispatch(changeFilter({type: SortTypes.email, payload: event.target.value}));
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Phone filter"
                value={phoneFilter}
                onChange={(event) => {
                  dispatch(changeFilter({type: SortTypes.phone, payload: event.target.value}));
                }}
              />
            </TableCell>    
          </TableRow>
          <TableRow>
            <TableCell
              onClick={() => {
                if (sortField !== SortTypes.name) {
                  dispatch(changeField(SortTypes.name));
                  dispatch(changeDirection(AscDesc.ascending));
                } else {
                  if (sortDirection === AscDesc.ascending) {
                    dispatch(changeDirection(AscDesc.descending))
                  } else {
                    dispatch(changeDirection(AscDesc.ascending))
                  }
                }
              }}
            >
              <div className='thead__item--wrapper'>
                Name
                {(sortDirection === AscDesc.ascending) && (sortField === SortTypes.name) && iconMap.upArrow}
                {(sortDirection === AscDesc.descending) && (sortField === SortTypes.name) && iconMap.downArrow}
                {(sortField !== SortTypes.name) && iconMap.swapVert}
              </div>
            </TableCell>
            <TableCell
              onClick={() => {
                if (sortField !== SortTypes.username) {
                  dispatch(changeField(SortTypes.username));
                  dispatch(changeDirection(AscDesc.ascending));
                } else {
                  if (sortDirection === AscDesc.ascending) {
                    dispatch(changeDirection(AscDesc.descending))
                  } else {
                    dispatch(changeDirection(AscDesc.ascending))
                  }
                }
              }}
            >
              <div className='thead__item--wrapper'>
                Username
                {(sortDirection === AscDesc.ascending) && (sortField === SortTypes.username) && iconMap.upArrow}
                {(sortDirection === AscDesc.descending) && (sortField === SortTypes.username) && iconMap.downArrow}
                {(sortField !== SortTypes.username) && iconMap.swapVert}
              </div>
            </TableCell>
            <TableCell
              onClick={() => {
                if (sortField !== SortTypes.email) {
                  dispatch(changeField(SortTypes.email));
                  dispatch(changeDirection(AscDesc.ascending));
                } else {
                  if (sortDirection === AscDesc.ascending) {
                    dispatch(changeDirection(AscDesc.descending))
                  } else {
                    dispatch(changeDirection(AscDesc.ascending))
                  }
                }
              }}
            >
              <div className='thead__item--wrapper'>
                E-mail
                {(sortDirection === AscDesc.ascending) && (sortField === SortTypes.email) && iconMap.upArrow}
                {(sortDirection === AscDesc.descending) && (sortField === SortTypes.email) && iconMap.downArrow}
                {(sortField !== SortTypes.email) && iconMap.swapVert}
              </div>
            </TableCell>
            <TableCell
              onClick={() => {
                if (sortField !== SortTypes.phone) {
                  dispatch(changeField(SortTypes.phone));
                  dispatch(changeDirection(AscDesc.ascending));
                } else {
                  if (sortDirection === AscDesc.ascending) {
                    dispatch(changeDirection(AscDesc.descending))
                  } else {
                    dispatch(changeDirection(AscDesc.ascending))
                  }
                }
              }}
            >
              <div className='thead__item--wrapper'>
                Phone
                {(sortDirection === AscDesc.ascending) && (sortField === SortTypes.phone) && iconMap.upArrow}
                {(sortDirection === AscDesc.descending) && (sortField === SortTypes.phone) && iconMap.downArrow}
                {(sortField !== SortTypes.phone) && iconMap.swapVert}
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>    
          { orderedArray
          .filter(el => 
            el.name.toLowerCase().includes(nameFilter.toLowerCase().trim())
            && el.username.toLowerCase().includes(usernameFilter.toLowerCase().trim())
            && el.phone.toLowerCase().includes(phoneFilter.toLowerCase().trim())
            && el.email.toLowerCase().includes(emailFilter.toLowerCase().trim())
          )
          .map(el => (
            <TableRow key={el.id}>
              <TableCell>
                {el.name}
              </TableCell>
              <TableCell>
                {el.username}
              </TableCell>
              <TableCell>
                {el.email}
              </TableCell>
              <TableCell>
                {el.phone}
              </TableCell>
            </TableRow>
          ))         
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
