import { Route, Routes } from 'react-router-dom';
import { FormLogin } from './pages/FormLogin'
import { FormRegister } from './pages/FormRegister';
import { Admin } from './pages/admin/admin';
import { Client } from './pages/client/client';

function App() {
  const admin = {
    name: 'admin',
    password: 'admin123'
  }

  return (
    <>
    
    <Routes>
      <Route path="/" element={<FormLogin admin={admin}/>} />
      <Route path="/formLogin" element={<FormLogin admin={admin}/>} />
      <Route path="/formRegister" element={<FormRegister />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/client" element={<Client />} />
    </Routes>
    </>
    
  );
}

export default App