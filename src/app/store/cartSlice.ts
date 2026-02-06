import type {CartDish, IDish} from "../../types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";

interface CartState {
    cartDishes: CartDish[];
}

const initialState: CartState = {
    cartDishes: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addDishToCart: (state, action: PayloadAction<IDish>) => {
            const dish = action.payload;
            const findDish = state.cartDishes.find((cartItem) =>
                dish.id === cartItem.dish.id
            );

            if (findDish) {
                state.cartDishes = state.cartDishes.map(cartDish => {
                    if (cartDish.dish.id === dish.id) {
                        return {...cartDish, count: cartDish.count + 1}
                    }
                    return cartDish;
                });
            } else {
                state.cartDishes.push({count: 1, dish});
            }
        },
        deleteDishFromCart: (state, {payload: id}: PayloadAction<string>) => {
            const findDish = state.cartDishes.find((cartItem) => id === cartItem.dish.id);

            if (findDish && findDish.count > 1) {
                state.cartDishes = state.cartDishes.map(cartDish => {
                    if (cartDish.dish.id === id) {
                        return {...cartDish, count: cartDish.count - 1}
                    }
                    return cartDish;
                })
            } else if (findDish && findDish.count <= 1) {
                state.cartDishes = state.cartDishes.filter(cartDish => cartDish.dish.id !== id);
            }
        },
        updateDishesInCart: (state, action: PayloadAction<IDish[]>) => {
            const dishes = action.payload;
            const newCartDishes: CartDish[] = [];

            state.cartDishes.forEach(cartDish => {
                const existingDish = dishes.find(dish => cartDish.dish.id === dish.id);

                if (!existingDish) {
                    newCartDishes.push({...cartDish});
                } else {
                    newCartDishes.push({
                        ...cartDish,
                        dish: existingDish,
                    });
                }
            });
            state.cartDishes = newCartDishes;
        },
        clearCart: (state) => {
            state.cartDishes = [];
        }
    },
});

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;

export const cartReducer = cartSlice.reducer;
export const {addDishToCart, clearCart, deleteDishFromCart, updateDishesInCart} = cartSlice.actions;