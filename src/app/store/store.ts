import {configureStore} from "@reduxjs/toolkit";
import {dishesReducer} from "./dishesSlice.ts";
import {cartReducer} from "./cartSlice.ts";

export const store = configureStore({
    reducer: {
        dishes: dishesReducer,
        cart: cartReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;