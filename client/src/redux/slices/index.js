import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
  name: 'rootReducer',
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
  },
})

export const { setPosts } = rootSlice.actions

export default rootSlice.reducer


