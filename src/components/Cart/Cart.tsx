import {Box, Typography} from "@mui/material";
import CartDishes from "./CartDishes/CartDishes.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import {selectCartDishes} from "../../app/store/cartSlice.ts";
import {DELIVERY_PRICE} from "../../globalConstants.ts";

const Cart = () => {
    const cartDishes = useAppSelector(selectCartDishes);

    return (
        <Box>
            {cartDishes.length > 0 ? (
                <Box>
                    <CartDishes/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography color="text.secondary"
                                    sx={{margin: '10px 10px'}}>Delivery: {DELIVERY_PRICE} KGS</Typography>
                        <Typography sx={{margin: '10px 0', fontSize: '20px'}}>Total
                            price: {cartDishes.reduce((sum, item) => {
                                return sum + (item.dish.price * item.count);
                            }, 0) + DELIVERY_PRICE
                            } KGS
                        </Typography>
                    </Box>
                </Box>
            ) : (<Typography>There is no dishes in cart yet.</Typography>)}
        </Box>
    );
};

export default Cart;