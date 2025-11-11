import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views - Secciones educativas principales
import HomePage from "../views/HomePage";
import GeografiaView from "../views/GeografiaView";
import TecnologiaView from "../views/TecnologiaView";
import ArteView from "../views/ArteView";

// Views - Demos adicionales (anteriores)
import ThreeDemoView from "../views/ThreeDemoView";
import LayoutsView from "../views/LayoutsView";
import SpeechDemoView from "../views/SpeechDemoView";
import GeometryExplorer from "../views/GeometryExplorer";
import SettingsView from "../views/SettingsView";
import TablasMul from "../views/TablasMul";
import ConversorUnid from "../views/ConversorUnid";
import ValidContrasena from "../views/ValidContrasena";
import ContadorClics from "../views/ContadorClics";
import ListaTareas from "../views/ListaTareas";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        
        {/* Rutas principales educativas */}
        <Route path="geografia" element={<GeografiaView />} />
        <Route path="tecnologia" element={<TecnologiaView />} />
        <Route path="arte" element={<ArteView />} />
        
        {/* Rutas secundarias (demos anteriores) */}
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="tts" element={<SpeechDemoView />} />
        <Route path="three_2" element={<GeometryExplorer />} />
        <Route path="settings" element={<SettingsView />} />
        <Route path="tablasmul" element={<TablasMul />} />
        <Route path="conversorunid" element={<ConversorUnid />} />
        <Route path="validcontrasena" element={<ValidContrasena />} />
        <Route path="contadorclics" element={<ContadorClics />} />
        <Route path="listareas" element={<ListaTareas />} />
      </Route>
    </Routes>
  );
}