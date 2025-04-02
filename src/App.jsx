import { Route, Routes } from 'react-router-dom';
import { FormLogin } from './pages/FormLogin'
import { FormRegister } from './pages/FormRegister';

function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<FormLogin/>} />
      <Route path="/formLogin" element={<FormLogin />} />
      <Route path="/formRegister" element={<FormRegister />} />
    </Routes>
    </>
    
  );
}

export default App