import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material';
import {useLocation, NavLink} from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return (
        <Box sx={{flexGrow: 1, zIndex: 10}}>
            <AppBar position='static' sx={{backgroundColor: '#171717'}}>
                <Container>
                    <Toolbar>
                        {location.pathname.startsWith('/admin') ? (<>
                            <Typography variant='h4'
                                        sx={{
                                            padding: '8px',
                                            flexGrow: 1,
                                            textDecoration: 'none',
                                            color: 'white'
                                        }}
                                        component={NavLink}
                                        to='/admin/dishes'>
                                Pizza <Typography sx={{fontSize: '14px', color: 'gray', display: 'inline'}}>admin</Typography>
                            </Typography>

                            <Button color='inherit' to='/admin/dishes' component={NavLink}>Dishes</Button>
                            <Button color='inherit' to='/admin/orders' component={NavLink}>Orders</Button> </>) : (
                            <>
                                <Typography variant='h4'
                                            sx={{
                                                padding: '8px',
                                                flexGrow: 1,
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}
                                            component={NavLink}
                                            to='/dishes'>
                                    Pizza
                                </Typography>

                                <Button color='inherit' to='/dishes' component={NavLink}>Dishes</Button>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
};

export default NavBar;