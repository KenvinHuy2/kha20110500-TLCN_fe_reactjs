import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  currentUser: null,
};

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { reducer: sharedReducer, actions: sharedActions } = sharedSlice;
const selectSharedFeature = (state) => state.shared;
export const sharedSelectors = {
  selectIsLoading: createSelector(selectSharedFeature, (state) => state.isLoading),
  selectCurrentUser: createSelector(selectSharedFeature, (state) => state.currentUser),
};
