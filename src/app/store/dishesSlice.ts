import type {IDish, IDishAPI, IDishMutation} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosAPI} from "../../axiosAPI.ts";
import {toast} from "react-toastify";
import type {AppDispatch} from "./store.ts";

interface dishesState {
    dishes: IDish[],
    loading: {
        loadingForm: boolean,
        loadingDeleteDish: boolean,
        loadingFetchDishes: boolean,
    }
}

const initialState: dishesState = {
    dishes: [],
    loading: {
        loadingForm: false,
        loadingDeleteDish: false,
        loadingFetchDishes: false
    }
}

export const fetchAllDishes = createAsyncThunk<IDish[]>(
    'dishes/fetchAllDishes',
    async () => {
        const response = await axiosAPI.get<IDishAPI | null>('dishes.json');
        const dishesObject = response.data;

        if (!dishesObject) {
            return []
        } else {
            return Object.keys(dishesObject).map(key => ({
                ...dishesObject[key],
                id: key,
            }));
        }
    }
)

export const deleteDishById = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
    'dishes/deleteDishById',
    async (id, thunkAPI) => {
        await axiosAPI.delete(`dishes/${id}.json`);
        toast.success('Dish deleted successfully');
        await thunkAPI.dispatch(fetchAllDishes());
    }
);

export const addDish = createAsyncThunk<void, IDishMutation, {dispatch: AppDispatch}>(
    'dishes/addDish',
    async(dish, thunkAPI) => {
        await axiosAPI.post('dishes.json', dish);
        toast.success('Dish added successfully');
        await thunkAPI.dispatch(fetchAllDishes());
    }
)

export const editDish = createAsyncThunk<void, IDish, {dispatch: AppDispatch}>(
    'dishes/editDish',
    async(dish, thunkAPI) => {
        const editedDish = {
            title: dish.title,
            price: dish.price,
            image: dish.image
        };

        await axiosAPI.put(`dishes/${dish.id}`, editedDish);
        toast.success('Dish edited successfully');
        await thunkAPI.dispatch(fetchAllDishes())
    }
)

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllDishes.pending, (state) => {
            state.loading.loadingFetchDishes = true;
        });
        builder.addCase(fetchAllDishes.fulfilled, (state, {payload: dishes}) => {
            state.loading.loadingFetchDishes  = false;
            state.dishes = dishes;
        });
        builder.addCase(fetchAllDishes.rejected, (state) => {
            state.loading.loadingFetchDishes  = false;
        });

        builder.addCase(deleteDishById.pending, (state) => {
            state.loading.loadingDeleteDish = true;
        });
        builder.addCase(deleteDishById.fulfilled, (state) => {
            state.loading.loadingDeleteDish = false;
        });
        builder.addCase(deleteDishById.rejected, (state) => {
            state.loading.loadingDeleteDish = false;
        });
    }
});

export const dishesReducer = dishesSlice.reducer;