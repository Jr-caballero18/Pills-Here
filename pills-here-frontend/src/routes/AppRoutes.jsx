import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import InicioMedico from "../pages/medico/InicioMedico";
import InicioPaciente from "../pages/paciente/InicioPaciente";
import NuevoPaciente from "../pages/medico/NuevoPaciente";
import DetallePaciente from "../pages/medico/DetallePaciente";
import ListaPacientes from "../pages/medico/ListaPacientes";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/register" element={<Register />} />
                <Route path="/inicio-medico" element={<InicioMedico />} />
                <Route path="/inicio-paciente" element={<InicioPaciente />} />
                <Route path="/nuevo-paciente" element={<NuevoPaciente />} />
                <Route path="/detalle-paciente/:idPaciente" element={<DetallePaciente />} />
                <Route path="/lista-pacientes" element={<ListaPacientes />} />
            </Routes>
        </BrowserRouter>
    );

}

export default AppRoutes;