import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAllDishes, selectAllDishes, selectDishesLoading} from "../../app/store/dishesSlice.ts";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Box, Button, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import DishItem from "../../components/DishItem/DishItem.tsx";
import {NavLink, useLocation} from "react-router-dom";
import Cart from "../../components/Cart/Cart.tsx";

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
            <Box sx={{margin: '10px 0', ...(!isAdminPage && {display: 'grid', gridTemplateColumns: '60% 40%'})}}>
                <Box>
                    <Typography variant='h4' sx={{margin: '10px 0'}}>Dishes</Typography>
                    {dishesLoading && <Spinner/>}
                    {isAdminPage && (<NavLink to='/admin/dishes/add'>
                        <Button endIcon={<AddBoxIcon/>}
                                sx={{backgroundColor: '#171717', margin: '10px 0'}}
                                variant='contained'>
                            Add new dish
                        </Button>
                    </NavLink>)}

                    <Box sx={
                        {
                            display: 'grid',
                            gridTemplateColumns: 'auto auto auto',
                            rowGap: '30px',
                            ...(isAdminPage && {gridTemplateColumns: '30% 30% 30%'}),
                            ...(!isAdminPage && {gridTemplateColumns: '50% 50%'})
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
                        {!dishesLoading && dishes.length === 0 && <Typography>There is no dishes yet.</Typography>}
                    </Box>
                </Box>

                {!isAdminPage && (<Box>
                    <Typography variant='h4' sx={{margin: '10px 0'}}>Cart</Typography>
                    <Cart/>
                </Box>)}
            </Box>
        </Box>
    )
};

export default Dishes;