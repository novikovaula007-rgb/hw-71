import {configureStore} from "@reduxjs/toolkit";
import {dishesReducer} from "./dishesSlice.ts";
import {cartReducer} from "./cartSlice.ts";
import {ordersReducer} from "./ordersSlice.ts";

export const store = configureStore({
    reducer: {
        dishes: dishesReducer,
        cart: cartReducer,
        orders: ordersReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;