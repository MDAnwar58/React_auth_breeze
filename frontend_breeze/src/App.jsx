import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";

function App() {
  return (
    <div className="bg-slate-100 min-h-screen">
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/" element={<Home/>} />
                </Route>
                <Route element={<GuestLayout/>}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>} />
                </Route>
            </Routes>
    </div>
  )
}

export default App
