import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {IOrder, IOrderAPI} from "../../types";
import {axiosAPI} from "../../axiosAPI.ts";
import type {AppDispatch, RootState} from "./store.ts";
import {toast} from "react-toastify";

interface ordersState {
    orders: {id: string; items: IOrder}[];
    loading: {
        fetchOrders: boolean,
        completeOrder: null | string
    }
}

const initialState: ordersState = {
    orders: [],
    loading: {
        fetchOrders: false,
        completeOrder: null
    }
}

export const fetchOrders = createAsyncThunk<{ id: string; items: IOrder }[]>(
    'orders/fetchOrders',
    async () => {
        const response = await axiosAPI.get<IOrderAPI | null>('orders.json');
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

export const deleteOrderById = createAsyncThunk<string, string, { dispatch: AppDispatch }>(
    'orders/deleteOrderById',
    async (id, thunkAPI) => {
        await axiosAPI.delete(`orders/${id}.json`);
        toast.success('Order completed successfully');
        await thunkAPI.dispatch(fetchOrders());
        return id;
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
            })
            .addCase(deleteOrderById.pending, (state, action) => {
                state.loading.completeOrder = action.meta.arg
            })
            .addCase(deleteOrderById.fulfilled, (state) => {
                state.loading.completeOrder = null;
            })
            .addCase(deleteOrderById.rejected, (state) => {
                state.loading.completeOrder = null;
            })
        ;
    },
});

export const selectAllOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const ordersReducer = ordersSlice.reducer;
