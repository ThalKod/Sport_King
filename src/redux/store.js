import { configureStore } from '@reduxjs/toolkit'
import usersReducer  from "./features/userSlice"

export default configureStore({
  reducer: {
    user: usersReducer,
  }
})
