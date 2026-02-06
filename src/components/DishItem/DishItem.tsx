import {Box, Card, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteDishById} from "../../app/store/dishesSlice.ts";
import React from "react";
import {addDishToCart, deleteDishFromCart, selectCartDishes} from "../../app/store/cartSlice.ts";

interface Props {
    isAdmin?: boolean,
    title: string,
    price: number,
    image: string,
    id: string,
}

const defaultCardImage = "https://i.ytimg.com/vi/w6geNk3QnBQ/sddefault.jpg";

const DishItem: React.FC<Props> = ({title, price, image, isAdmin, id}) => {
    const dispatch = useAppDispatch();
    const cartDishes = useAppSelector(selectCartDishes)
    const dishInCart = cartDishes.find(item => item.dish.id === id);

    const deleteItemDish = () => {
        dispatch(deleteDishById(id))
    }

    return (
        <Card sx={
            {
                width: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        }>
            <CardMedia
                sx={{height: 140}}
                title="dish"
                component="img"
                image={image || defaultCardImage}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultCardImage;
                }}
            />
            <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
            </CardContent>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                <Box sx={{p: 2, pt: 0}}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {price} KGS
                    </Typography>
                </Box>
                <Box sx={{margin: '0 5px'}}>
                    {isAdmin ? (<>
                        <IconButton aria-label="delete" onClick={() => deleteItemDish()}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton aria-label="edit" component={NavLink} to={`/admin/dishes/${id}/edit`}>
                            <EditIcon/>
                        </IconButton>
                    </>) : (<>

                        {dishInCart ? (<Box sx={{display: 'flex', alignItems: 'center'}}>
                                <IconButton aria-label="removeToCart" onClick={() => dispatch(deleteDishFromCart(id))}>
                                    <RemoveIcon/>
                                </IconButton>
                                <Typography sx={{display: 'inline', fontSize: '18px', fontWeight: 'bold'}}>
                                    {dishInCart.count}
                                </Typography>
                                <IconButton aria-label="addToCart" onClick={() => dispatch(addDishToCart({id, image, title, price}))}>
                                    <AddIcon/>
                                </IconButton>
                            </Box>
                            ) : (
                            <IconButton aria-label="addToCart" onClick={() => dispatch(addDishToCart({id, image, title, price}))}>
                                <ShoppingCartIcon/>
                            </IconButton>
                            )}
                </>)}
            </Box>
        </Box>
</Card>
)
    ;
};

export default DishItem;