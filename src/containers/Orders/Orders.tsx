import {Box, Stack, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchOrders, selectAllOrders, selectOrdersLoading} from "../../app/store/ordersSlice.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useEffect} from "react";
import OrderItem from "./OrderItem/OrderItem.tsx";

const Orders = () => {
    const dispatch = useAppDispatch();
    const ordersData = useAppSelector(selectAllOrders);
    const ordersLoading = useAppSelector(selectOrdersLoading).fetchOrders;

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch])

    return (
        <Box>
            <Typography variant='h4' sx={{margin: '10px 0'}}>Orders</Typography>
            {ordersLoading && <Spinner/>}
            {!ordersLoading && ordersData.length === 0 && <Typography>There is no orders yet.</Typography>}
            {!ordersLoading && ordersData.length > 0 && (
                <Stack spacing={2}>
                    {ordersData.map(order => {
                        return <OrderItem order={order}/>
                    })}
                </Stack>
            )}
        </Box>
    );
};

export default Orders;