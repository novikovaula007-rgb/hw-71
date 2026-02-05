import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAllDishes, selectAllDishes, selectDishesLoading} from "../../app/store/dishesSlice.ts";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Box, Button, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import DishItem from "../../components/DishItem/DishItem.tsx";
import {NavLink, useLocation} from "react-router-dom";

const Dishes = () => {
    const location = useLocation();
    const dishesLoading = useAppSelector(selectDishesLoading).loadingFetchDishes;
    const dishes = useAppSelector(selectAllDishes);
    const dispatch = useAppDispatch();

    const isAdminPage = location.pathname.startsWith('/admin');

    useEffect(() => {
        dispatch(fetchAllDishes())
    }, [dispatch, location])

    return (
        <Box>
            <Typography variant='h4'>Dishes</Typography>

            {isAdminPage && (<NavLink to='/admin/dishes/add'>
                <Button endIcon={<AddBoxIcon/>}
                        sx={{backgroundColor: '#171717', margin: '10px 0'}}
                        variant='contained'>
                    Add new dish
                </Button>
            </NavLink>)}

            {dishesLoading && <Spinner/>}
            <Box sx={{margin: '10px'}}>
                <Box sx={
                    {
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto',
                        rowGap: '30px',
                    }
                }>
                    {!dishesLoading && dishes.length > 0 && dishes.map(dish => {
                        return <DishItem
                            key={dish.id}
                            title={dish.title}
                            price={dish.price}
                            image={dish.image}
                            id={dish.id}
                            isAdmin={isAdminPage}
                        />
                    })}
                    {!dishesLoading && dishes.length === 0 && 'There is no dishes yet.'}
                </Box>
            </Box>
        </Box>
    )
};

export default Dishes;