import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useState} from "react";
import React from "react";
import {useNavigate} from "react-router-dom";
import {addDish, editDish, selectDishesLoading} from "../../app/store/dishesSlice.ts";
import type {IDishMutation} from "../../types";
import {toast} from "react-toastify";

const initialDishForm: IDishMutation = {
    title: '',
    image: '',
    price: 0,
}

interface Props {
    isEditing?: boolean,
    editId?: string,
    initialValueForm?: IDishMutation,
}

const DishForm: React.FC<Props> = ({isEditing, editId, initialValueForm = initialDishForm}) => {
    const loadingForm = useAppSelector(selectDishesLoading).loadingForm;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState<IDishMutation>(initialValueForm);

    const onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        let valueForm: number | string = value

        if (name === 'price') {
            const valuePrice = Number(value)
            if (valuePrice > 0) {
                valueForm = valuePrice
            }
        }

        setForm((prevState) => ({
            ...prevState,
            [name]: valueForm
        }));
    }

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (form.title.trim().length > 0 && form.price > 0) {
            if (isEditing && editId) {
                await dispatch(editDish({...form, id: editId}))
                navigate('/admin/dishes');
            } else {
                await dispatch(addDish(form))
                navigate('/admin/dishes');
            }
            setForm(initialDishForm);
        } else {
            toast.error('You have not filled in all the required fields.')
        }
    }

    return (
        <Box component="form" sx={{maxWidth: 450, mx: 'auto', mt: 4}} onSubmit={onSubmit}>
            <Typography variant='h4' sx={{textAlign: 'center', marginBottom: '15px'}}>
                {isEditing ? 'Edit' : 'Add'} dish
            </Typography>
            <Stack spacing={2} sx={{alignItems: 'center'}}>
                <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    disabled={loadingForm}
                    onChange={onChangeField}
                    value={form.title}
                />

                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    variant='outlined'
                    disabled={loadingForm}
                    value={form.price}
                    onChange={onChangeField}
                    inputProps={{min: 0}}
                    fullWidth
                />

                <TextField
                    label="Image"
                    name="image"
                    fullWidth
                    disabled={loadingForm}
                    value={form.image}
                    onChange={onChangeField}
                />

                <Button
                    fullWidth
                    type='submit'
                    sx={{width: '50%', backgroundColor: '#171717', textAlign: 'center'}}
                    loading={loadingForm}
                    loadingPosition='end'
                    variant='contained'
                    endIcon={<SaveIcon/>}>
                    {isEditing ? 'Edit' : 'Add'}
                </Button>
            </Stack>
        </Box>
    );
};

export default DishForm;