import { Route, Routes } from 'react-router-dom';
import { FormLogin } from './pages/FormLogin'
import { FormRegister } from './pages/FormRegister';
import { Admin } from './pages/admin/admin';
import { Client } from './pages/client/client';

function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Admin/>} />
      <Route path="/formLogin" element={<FormLogin />} />
      <Route path="/formRegister" element={<FormRegister />} />
    </Routes>
    </>
    
  );
}

export default App