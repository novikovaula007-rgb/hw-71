import {useParams} from "react-router-dom";
import DishForm from "../../components/DishForm/DishForm.tsx";
import {fetchSelectedDish, selectDish, clearSelectedDish, selectDishesLoading} from "../../app/store/dishesSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useCallback, useEffect} from "react";
import {Box} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const EditDish = () => {
    const {id} = useParams();
    const selectedDish = useAppSelector(selectDish);
    const dishesLoading = useAppSelector(selectDishesLoading).loadingFetchDishes;
    const dispatch = useAppDispatch();

    const fetchDish = useCallback(async () => {
        if (id) {
            dispatch(fetchSelectedDish(id));
        }
    }, [dispatch, id])

    useEffect(() => {
        void fetchDish()
        return () => {
            dispatch(clearSelectedDish());
        };
    }, [dispatch, fetchDish]);

    return (
        <>
            {dishesLoading && (<Box sx={{textAlign: 'center'}}><Spinner/></Box>)}
            {selectedDish && id && <DishForm
                isEditing
                initialValueForm={selectedDish}
                editId={id}
            />}
        </>
    );
};

export default EditDish;