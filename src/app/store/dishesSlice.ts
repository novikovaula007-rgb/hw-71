import type {IDish, IDishAPI, IDishMutation} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosAPI} from "../../axiosAPI.ts";
import {toast} from "react-toastify";
import type {AppDispatch, RootState} from "./store.ts";

interface dishesState {
    dishes: IDish[],
    selectedDish: IDish | null,
    loading: {
        loadingForm: boolean,
        loadingDeleteDish: boolean,
        loadingFetchDishes: boolean,
    }
}

const initialState: dishesState = {
    dishes: [],
    selectedDish: null,
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

export const fetchSelectedDish = createAsyncThunk<IDish, string>(
    'dishes/fetchSelectedDish',
    async(id) => {
        const response = await axiosAPI.get<IDishMutation>(`dishes/${id}.json`);
        const dishData = response.data;
        return {
            id: id,
            image: dishData.image,
            title: dishData.title,
            price: dishData.price
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

        await axiosAPI.put(`dishes/${dish.id}.json`, editedDish);
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

        builder.addCase(fetchSelectedDish.fulfilled, (state, {payload}) => {
            state.selectedDish = payload;
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

        builder.addCase(editDish.pending, (state) => {
            state.loading.loadingForm = true;
        });
        builder.addCase(editDish.fulfilled, (state) => {
            state.loading.loadingForm = false;
        });
        builder.addCase(editDish.rejected, (state) => {
            state.loading.loadingForm = false;
        });

        builder.addCase(addDish.pending, (state) => {
            state.loading.loadingForm = true;
        });
        builder.addCase(addDish.fulfilled, (state) => {
            state.loading.loadingForm = false;
        });
        builder.addCase(addDish.rejected, (state) => {
            state.loading.loadingForm = false;
        });
    }
});

export const selectAllDishes = (state: RootState) => state.dishes.dishes;
export const selectDishesLoading = (state: RootState) => state.dishes.loading;
export const selectDish = (state: RootState) => state.dishes.selectedDish;

export const dishesReducer = dishesSlice.reducer;