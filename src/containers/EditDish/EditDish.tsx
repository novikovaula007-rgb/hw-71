import {useParams} from "react-router-dom";
import DishForm from "../../components/DishForm/DishForm.tsx";
import {fetchSelectedDish, selectDish} from "../../app/store/dishesSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useCallback, useEffect} from "react";


const EditDish = () => {
    const {id} = useParams();
    const selectedDish = useAppSelector(selectDish);
    const dispatch = useAppDispatch();

    const fetchDish = useCallback(async () => {
        if (id) {
            dispatch(fetchSelectedDish(id));
        }
    }, [dispatch, id])

    useEffect(() => {
        void fetchDish()
    }, [fetchDish]);

    return (
        <>
            {selectedDish && id && <DishForm
                isEditing
                initialValueForm={selectedDish}
                editId={id}
            />}
        </>
    );
};

export default EditDish;