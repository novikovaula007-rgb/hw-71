import {Box, Card, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteDishById} from "../../app/store/dishesSlice.ts";
import React from "react";

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
                        <IconButton aria-label="addToCart">
                            <ShoppingCartIcon/>
                        </IconButton>
                    </>)}
                </Box>
            </Box>
        </Card>
    );
};

export default DishItem;