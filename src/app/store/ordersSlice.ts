import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {IOrder} from "../../types";
import {axiosAPI} from "../../axiosAPI.ts";

interface ordersState {
    orders: { id: string; items: IOrder }[];
    loading: {
        fetchOrders: boolean,
    }
}

const initialState: ordersState = {
    orders: [],
    loading: {
        fetchOrders: false
    }
}

export const fetchOrders = createAsyncThunk<{ id: string; items: IOrder }[]>(
    'orders/fetchOrders',
    async () => {
        const response = await axiosAPI.get('orders.json');
        const orderObject = response.data;
        if (orderObject) {
            return Object.keys(orderObject).map((key) => ({
                id: key,
                items: orderObject[key]
            }));
        }
        return [];
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading.fetchOrders = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading.fetchOrders = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state) => {
                state.loading.fetchOrders = false;
            });
    },
});

export default ordersSlice.reducer;
