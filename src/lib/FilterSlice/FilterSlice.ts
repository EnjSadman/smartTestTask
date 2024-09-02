import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AscDesc, SortTypes } from "../../utils/enums";

interface changeFilterAction {
  type: SortTypes,
  payload: string,
}

interface InitialState {
  nameFilter: string,
  usernameFilter: string,
  emailFilter: string,
  phoneFilter: string,
  sortByField: SortTypes,
  sortDirection: AscDesc,
}

const initialState : InitialState = {
  nameFilter: "",
  usernameFilter: "",
  emailFilter: "",
  phoneFilter: "",
  sortByField: SortTypes.name,
  sortDirection: AscDesc.ascending,
}

const FilterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter : (state, action : PayloadAction<changeFilterAction>) => {
      switch (action.payload.type) {
        case (SortTypes.name) : {
          state.nameFilter = action.payload.payload;
          break;
        }
        case (SortTypes.email) : {
          state.emailFilter = action.payload.payload;
          break;
        }
        case (SortTypes.username) : {
          state.usernameFilter = action.payload.payload;
          break;
        }
        case (SortTypes.phone) : {
          state.phoneFilter = action.payload.payload;
          break;
        }
        default : {
          return state;
        }
      }
    },
    changeDirection: (state, action : PayloadAction<AscDesc>) => {
      state.sortDirection = action.payload;
    },
    changeField: (state, action : PayloadAction<SortTypes>) => {
      state.sortByField = action.payload;
    }
  }
})

export default FilterSlice.reducer;

export const {changeFilter, changeDirection, changeField} = FilterSlice.actions;