import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listProduct: []
};

const storeSlices = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.listProduct.push(action.payload)
        },
        deleteProduct: (state, action) => {
            state.listProduct = state.listProduct.filter((item) => item.idProduct !== action.payload);
            console.log(action.payload)
        }

    },
})

export const { addProduct, deleteProduct } = storeSlices.actions
export default storeSlices.reducer