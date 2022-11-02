import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedin: false,


}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return {
        isLoggedin: true,
        ...action.payload
      }
    },

  },
})
// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export default userSlice.reducer