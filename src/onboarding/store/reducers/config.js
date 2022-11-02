import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  templates: {
    isLoaded: false,
    data: []
  },
}

export const signup = createSlice({
  name: 'signup',
  initialState,
  reducers: {

    update: (state, action) => {
      const id = action.payload.id
      return {
        ...state,
        templates: {
          isLoaded: true,
          data: action.payload.listTaskTemplates?.items,
        }

      }
    }
  },
})
// Action creators are generated for each case reducer function
export const { update } = signup.actions

export default signup.reducer