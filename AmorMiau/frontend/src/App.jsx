
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeDesktop from './pages/HomeDesktop'; 
import EventosDesktop from './pages/HomeDesktop/eventos';
import DoacoesDesktop from './pages/HomeDesktop/doacoes';
import PetSittersDesktop from './pages/HomeDesktop/petsitters';
import SobreDesktop from './pages/HomeDesktop/sobre';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDesktop />} />
        <Route path="/eventos" element={<EventosDesktop />} />
        <Route path="/doacoes" element={<DoacoesDesktop />} />
        <Route path="/petsitters" element={<PetSittersDesktop />} />
        <Route path="/sobre" element={<SobreDesktop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;