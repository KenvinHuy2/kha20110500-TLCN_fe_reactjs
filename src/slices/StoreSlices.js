import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listProduct: []
};

const storeSlices = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addProdcut: (state, action) => {
            const index = state.listProductOrders?.findIndex(item => item.id === action.id)
            if (index != -1) {
                state.listProductOrders[index].number++
                return { ...state };
            } else {
                state.listProductOrders.push(action)
                return { ...state};
            }
        },

    },
})

export const { setAllUsers } = storeSlices.actions
export default storeSlices.reducer