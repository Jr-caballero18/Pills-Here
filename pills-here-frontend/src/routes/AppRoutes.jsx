import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import InicioMedico from "../pages/medico/InicioMedico";
import InicioPaciente from "../pages/paciente/InicioPaciente";

function AppRoutes(){
 return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/inicio-medico" element={<InicioMedico />} />
        <Route path="/inicio-paciente" element={<InicioPaciente />} />
    </Routes>
    </BrowserRouter>
 );

}

export default AppRoutes;