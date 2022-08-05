import { createSlice } from '@reduxjs/toolkit';
import { IRequestReducerState } from '../states/IRequestReducerState';

export const requestSlice = createSlice({
  name: 'request',
  initialState: [
    {
      requestDetail: undefined,
      formGenDetail: undefined,
    },
  ] as IRequestReducerState[],
  reducers: {
    handleAddRequest: (state, action) => {
      debugger;
      var result = action.payload;
      state.push(result);
    },
  },
});

export const { handleAddRequest } = requestSlice.actions;

export default requestSlice.reducer;
