import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './lib/store';
import DataFetcher from './components/DataFetcher/DataFetcher';
import { initializeUsersList } from './lib/UsersSlice/UsersSlice';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { AscDesc, SortTypes } from './utils/enums';
import { changeFilter } from './lib/FilterSlice/FilterSlice';
import { User } from './utils/types';

function App() {
  const dispatch = useDispatch();

  const userStorage = useSelector((state : RootState) => state.UserReducer);
  const usersArray = userStorage.users;

  const filtersStorage = useSelector((state : RootState) => state.FilterReducer);

  const nameFilter = filtersStorage.nameFilter;
  const usernameFilter = filtersStorage.usernameFilter;
  const phoneFilter = filtersStorage.phoneFilter;
  const emailFilter = filtersStorage.emailFilter;

  const [sortedBy, setSortedBy] = useState<AscDesc>(AscDesc.ascending);
  const [sortedDirection, setSortedDirection] = useState<SortTypes>(SortTypes.name);

  async function fetchDispatchData () {
    let result = await DataFetcher();

    dispatch(initializeUsersList(result))
  }

  function orderArray (array : User[], parameter: string, order : AscDesc) : User[] {
    if (order === AscDesc.ascending) {
      [...array].sort((a, b) => {
        let aParameter = a[parameter as keyof User] as string;
        let bParameter = b[parameter as keyof User] as string;

        return aParameter.localeCompare(bParameter);
      }
      )
    } else {
      [...array].sort((a, b) => {
        let aParameter = a[parameter as keyof User] as string;
        let bParameter = b[parameter as keyof User] as string;

        return aParameter.localeCompare(bParameter) * -1;
      }
      )
    }

    return array;
  }

  const orderedArray = useMemo(() => {
    return orderArray(usersArray, sortedDirection, sortedBy);
  }, [usersArray, sortedBy, sortedDirection]);

  useEffect(() => {
    fetchDispatchData();
  }, []);

  useEffect(() => {

  }, [usersArray]);

  useEffect(() => {

  })

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
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Username
            </TableCell>
            <TableCell>
              E-mail
            </TableCell>
            <TableCell>
              Phone
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
