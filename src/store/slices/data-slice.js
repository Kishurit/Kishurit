import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPost } from '../../api'

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const response =  getPost ('/');
    return response;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { },
  reducers: {
    
    /*todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    }*/

  },
  extraReducers: builder => { 
    builder.addCase (fetchData.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
    })
    
    builder.addCase (fetchData.rejected, (state, action) => {
        state.status = 'error'; 
        state.error = action.error;
    })
  
    builder.addCase (fetchData.fulfilled, (state, action) => {
        return {
          status: 'ready',
          error: undefined,
          ...action.payload
        }
    })

    }
});

export default dataSlice.reducer;
