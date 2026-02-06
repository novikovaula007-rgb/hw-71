import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import type {IOrderData} from '../../../types';
import {DELIVERY_PRICE} from "../../../globalConstants.ts";
import {Box, Button, Card, Divider, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {fetchAllDishes, selectAllDishes} from "../../../app/store/dishesSlice.ts";
import {deleteOrderById, selectOrdersLoading} from "../../../app/store/ordersSlice.ts";

interface Props {
    order: IOrderData;
}

const OrderItem: React.FC<Props> = ({order}) => {
    const allDishes = useAppSelector(selectAllDishes);
    const dispatch = useAppDispatch();
    const loadingOrder = useAppSelector(selectOrdersLoading).completeOrder;

    const totalPrice = Object.entries(order.items).reduce((sum, [id, count]) => {
        const dish = allDishes.find(d => d.id === id);
        return sum + (dish ? dish.price * count : 0);
    }, 0) + DELIVERY_PRICE;

    useEffect(() => {
        dispatch(fetchAllDishes())
    }, [dispatch])

    return (
        <Card sx={{mb: 2, p: 2, maxWidth: '60%'}}>
            <Typography variant="caption" color="text.secondary">Order ID: {order.id}</Typography>

            <Box sx={{my: 1}}>
                {Object.entries(order.items).map(([id, count]) => {
                    const dish = allDishes.find(d => d.id === id);
                    console.log(allDishes)
                    return (
                        <Typography key={id} variant="body2">
                            {dish && dish.title} x {count}
                            <span style={{marginLeft: '10px', fontWeight: 'bold'}}>
                                {dish && dish.price * count} KGS
                            </span>
                        </Typography>
                    );
                })}
            </Box>

            <Divider sx={{my: 1}}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6">Total: {totalPrice} KGS</Typography>
                <Button
                    onClick={() => dispatch(deleteOrderById(order.id))}
                    variant="contained"
                    disabled={loadingOrder === order.id}
                    loading={loadingOrder === order.id}
                    loadingPosition="end"
                    sx={{backgroundColor: '#171717', margin: '10px 0'}}
                >
                    Complete order
                </Button>
            </Box>

        </Card>
    );
};

export default OrderItem;