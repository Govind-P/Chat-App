import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:null,
  },
  reducers: {
    setUserDetails: (state, action) => {
        state.user=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails} = userSlice.actions

export default userSlice.reducer