import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import InicioMedico from "../pages/medico/InicioMedico";
import InicioPaciente from "../pages/paciente/InicioPaciente";
import NuevoPaciente from "../pages/medico/NuevoPaciente";
import DetallePaciente from "../pages/medico/DetallePaciente";
import ListaPacientes from "../pages/medico/ListaPacientes";
import HistorialClinico from "../pages/medico/HistorialClinico";
import CrearTratamiento from "../pages/medico/CrearTratamiento";;
import EditarTratamiento from "../pages/medico/EditarTratamiento";
import TratamientosPaciente from "../pages/paciente/TratamientosPaciente";
import DetalleTratamientoPaciente from "../pages/paciente/DetalleTratamientoPaciente";
import HistorialPaciente from "../pages/paciente/HistorialPaciente";
import PerfilPaciente from "../pages/paciente/PerfilPaciente";
import NotasPaciente from "../pages/paciente/NotasPaciente";
import PerfilMedico from "../pages/medico/PerfilMedico";
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
                <Route path="/historial-clinico/:idPaciente" element={<HistorialClinico />} />
                <Route path="/crear-tratamiento/:idPaciente" element={<CrearTratamiento />} />
                <Route path="/editar-tratamiento/:idTratamiento" element={<EditarTratamiento />} />
                <Route path="/tratamientos-paciente" element={<TratamientosPaciente />} />
                <Route path="/tratamiento-paciente/:idTratamiento" element={<DetalleTratamientoPaciente />} />
                <Route path="/historial-paciente" element={<HistorialPaciente />} />
                <Route path="/perfil-paciente" element={<PerfilPaciente />} />
                <Route path="/notas-paciente" element={<NotasPaciente />} />
                <Route path="/perfil-medico" element={<PerfilMedico />} />
            </Routes>
        </BrowserRouter>
    );

}

export default AppRoutes;