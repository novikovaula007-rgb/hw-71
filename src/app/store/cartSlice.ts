import type {CartDish, IDish} from "../../types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";
import {fetchAllDishes} from "./dishesSlice.ts";

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

        deleteAllItemOfDishFromCart: (state, {payload: id}: PayloadAction<string>) => {
            state.cartDishes = state.cartDishes.filter(
                (item) => item.dish.id !== id
            );
        },

        clearCart: (state) => {
            state.cartDishes = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAllDishes.fulfilled, (state, action) => {
            const newDishes = action.payload;

            state.cartDishes = state.cartDishes.map(cartItem => {
                const updatedDish = newDishes.find(dish => dish.id === cartItem.dish.id);

                if (updatedDish) {
                    return {
                        ...cartItem,
                        dish: updatedDish
                    };
                }
                return cartItem;
            });
        });
    }
});

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;

export const cartReducer = cartSlice.reducer;
export const {addDishToCart, clearCart, deleteDishFromCart, deleteAllItemOfDishFromCart} = cartSlice.actions;