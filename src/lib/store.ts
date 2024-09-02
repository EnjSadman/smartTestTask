import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UsersSlice/UsersSlice';
import FilterReducer from './FilterSlice/FilterSlice';
import SortReducer from './SortSlice/SortSlice'

export const store = configureStore({
  reducer: {
    UserReducer,
    FilterReducer,
    SortReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch