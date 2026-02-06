import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, IconButton,
    Stack,
    Typography
} from "@mui/material";
import CartDishes from "./CartDishes/CartDishes.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {clearCart, deleteAllItemOfDishFromCart, selectCartDishes} from "../../app/store/cartSlice.ts";
import {DELIVERY_PRICE} from "../../globalConstants.ts";
import ClearIcon from '@mui/icons-material/Clear';
import {useState} from "react";
import {axiosAPI} from "../../axiosAPI.ts";
import {toast} from "react-toastify";

const Cart = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const cartDishes = useAppSelector(selectCartDishes);

    const totalPrice = cartDishes.reduce((sum, item) => {
        return sum + (item.dish.price * item.count);
    }, 0) + DELIVERY_PRICE

    const submitOrder = async () => {
        const orderData = cartDishes.reduce((acc, item) => {
            acc[item.dish.id] = item.count;
            return acc;
        }, {} as Record<string, number>);
        try {
            setLoading(true)
            await axiosAPI.post('orders.json', orderData);
            toast.success('The order has been successfully sent.')
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }

        dispatch(clearCart());
        setOpen(false);
    };

    return (
        <Box>
            {cartDishes.length > 0 ? (
                <Box>
                    <CartDishes/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography color="text.secondary"
                                    sx={{margin: '10px 10px'}}>Delivery: {DELIVERY_PRICE} KGS</Typography>
                        <Typography sx={{margin: '10px 0', fontSize: '20px'}}>Total
                            price: {totalPrice} KGS
                        </Typography>
                    </Box>
                    <Button sx={{display: 'block', marginLeft: 'auto', backgroundColor: '#171717'}}
                            variant='contained'
                            onClick={() => setOpen(true)}>Checkout</Button>
                </Box>
            ) : (<Typography>There is no dishes in cart yet.</Typography>)}

            <Dialog open={open && cartDishes.length > 0} onClose={() => !loading && setOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Confirm Order</DialogTitle>
                <DialogContent dividers>
                    <Typography sx={{backgroundColor: '#f5f5f5', borderRadius: 2, px: 0.5, mb: 2, textAlign: 'center', fontWeight: 'bold'}}>Dishes:</Typography>
                    <Stack spacing={1}>
                        {cartDishes.map((item) => (
                            <Box key={item.dish.id} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography>{item.dish.title} x {item.count}</Typography>
                                <Typography fontWeight="bold">{item.dish.price * item.count} KGS</Typography>
                                <IconButton aria-label="delete" onClick={() => dispatch(deleteAllItemOfDishFromCart(item.dish.id))}>
                                    <ClearIcon/>
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                    <Divider sx={{my: 2}}/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', my: 2}}>
                        <Typography>Delivery</Typography>
                        <Typography fontWeight="bold">{DELIVERY_PRICE} KGS</Typography>
                    </Box>
                    <Typography variant="h6" textAlign="right">
                        Total: {totalPrice} KGS
                    </Typography>
                </DialogContent>

                <DialogActions sx={{p: 2}}>
                    <Button onClick={() => setOpen(false)} disabled={loading} sx={{color: '#171717'}}>
                        Cancel
                    </Button>
                    <Button
                        onClick={submitOrder}
                        variant="contained"
                        sx={{backgroundColor: '#171717', margin: '10px 0'}}
                        disabled={loading}
                        loading={loading}
                        loadingPosition='end'
                    >
                        Confirm order
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Cart;