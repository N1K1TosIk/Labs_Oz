import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][];
}

const initialState: ListsState = {
  lists: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists.splice(index, 0, items);
    },
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      if (index >= 0 && index < state.lists.length) {
        state.lists[index] = items;
      }
    },
    setSelectedAnswer: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      if (index >= 0 && index < state.lists.length) {
        state.lists[index] = items;
      } else {
        state.lists.push(items);
      }
    },
    clearLists: (state) => {
      state.lists = [];
    }
  },
});

export const { addList, setDraggedItems, setSelectedAnswer, clearLists } = listsSlice.actions;
export default listsSlice.reducer;
