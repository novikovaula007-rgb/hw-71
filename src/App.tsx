import NavBar from "./components/UI/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Dishes from "./containers/Dishes/Dishes.tsx";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage.tsx";
import EditDish from "./containers/EditDish/EditDish.tsx";
import AddDish from "./containers/AddDish/AddDish.tsx";
import Orders from "./containers/Orders/Orders.tsx";
import { Container } from "@mui/material";

const App = () => {
    return (
        <>
            <NavBar/>
            <Container sx={{margin: '20px auto'}}>
                <Routes>
                    <Route path='/' element={(<Dishes/>)}/>
                    <Route path='/dishes' element={(<Dishes/>)}/>

                    <Route path='/admin' element={(<Dishes/>)}/>
                    <Route path='/admin/dishes' element={(<Dishes/>)}/>

                    <Route path='/admin/dishes/add' element={(<AddDish/>)}/>
                    <Route path='/admin/dishes/:id/edit' element={(<EditDish/>)}/>
                    <Route path='/admin/orders' element={(<Orders/>)}/>

                    <Route path='*' element={(<NotFoundPage/>)}/>
                </Routes>
            </Container>

        </>
    )
}

export default App
