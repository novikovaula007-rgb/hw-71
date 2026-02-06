import {Stack} from "@mui/material";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectCartDishes} from "../../../app/store/cartSlice.ts";
import CartItem from "../CartItem/CartItem.tsx";

const CartDishes = () => {
    const cartDishes = useAppSelector(selectCartDishes);

    return (
        <Stack spacing={2}>
            {
                cartDishes.map(cartDish => {
                    return <CartItem key={cartDish.dish.id}
                                     dish={{
                                         title: cartDish.dish.title,
                                         image: cartDish.dish.image,
                                         price: cartDish.dish.price,
                                         id: cartDish.dish.id
                                     }}/>
                })
            }

        </Stack>
    );
};

export default CartDishes;