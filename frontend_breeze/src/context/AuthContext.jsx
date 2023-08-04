import {createContext, useContext, useEffect, useState} from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        const {data} = await axios.get('/api/user');
        setUser(data);
        // console.log(data);
    }

    const login =  async ({ ... data }) => {
        await csrf();
        // serErrors([]);
        try {
            await axios.post("/login", data);
            await getUser();
            navigate("/");
        } catch (e) {
            setErrors(e.response.data.errors);
        }
    }

    const register =  async ({ ... data }) => {
        await csrf();
        // serErrors([]);
        try {
            await axios.post("/register", data);
            await getUser();
            navigate("/");
        } catch (e) {
            setErrors(e.response.data.errors);
        }
    }

    const logout = async () => {
        axios.post('/logout').then(() => {
           setUser(null);
        });
    };

    useEffect(() => {
        if (!user)
        {
            getUser();
        }
    }, []);

    return <AuthContext.Provider value={{ user, errors, getUser, login, register, logout }}>
        {children}
    </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}