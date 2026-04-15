import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/authService';
import Login from './pages/Login';
import Departments from './pages/Departments';
import Teachers from './pages/Teachers';
import Students from './pages/Students';

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/departments" element={
          <PrivateRoute><Departments /></PrivateRoute>
        } />
        <Route path="/teachers" element={
          <PrivateRoute><Teachers /></PrivateRoute>
        } />
        <Route path="/students" element={
          <PrivateRoute><Students /></PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}