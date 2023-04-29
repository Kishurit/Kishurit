import { configureStore } from '@reduxjs/toolkit'
import data from './slices/data-slice';

export const store = configureStore({
    reducer: {
      data
    }
  })
  
  