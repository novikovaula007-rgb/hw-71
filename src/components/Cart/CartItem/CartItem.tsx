import {Box, Card, IconButton, Typography, Stack} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addDishToCart, deleteDishFromCart, selectCartDishes} from '../../../app/store/cartSlice.ts';
import type {IDish} from "../../../types.d.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import React from "react";

interface Props {
    dish: IDish
}

const CartItem: React.FC<Props> = ({dish}) => {
    const dispatch = useAppDispatch();
    const cartDishes = useAppSelector(selectCartDishes);
    const dishInCart = cartDishes.find(item => item.dish.id === dish.id);

    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                mb: 1,
                borderRadius: '5px',
                variant: 'outlined'
            }}
        >
            <Box sx={{flexGrow: 1}}>
                <Typography sx={{fontWeight: 'bold'}}>
                    {dish.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Price: {dish.price} KGS
                </Typography>
            </Box>

            <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" sx={{backgroundColor: '#f5f5f5', borderRadius: 2, px: 0.5}}>
                    <IconButton
                        aria-label="removeToCart"
                        size="small"
                        onClick={() => dispatch(deleteDishFromCart(dish.id))}
                    >
                        <RemoveIcon/>
                    </IconButton>

                    <Typography sx={{minWidth: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px'}}>
                        {dishInCart && dishInCart.count}
                    </Typography>

                    <IconButton
                        size="small"
                        aria-label="addToCart"
                        onClick={() => dispatch(addDishToCart(dish))}
                    >
                        <AddIcon/>
                    </IconButton>
                </Stack>

                <Typography sx={{minWidth: '90px', textAlign: 'right', fontWeight: 'bold'}}>
                    {dishInCart && dish.price * dishInCart.count} KGS
                </Typography>
            </Stack>
        </Card>
    );
};

export default CartItem;