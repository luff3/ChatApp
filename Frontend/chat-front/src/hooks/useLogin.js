import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/authContext";
const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();


    const login = async (data) => {
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8000/api/auth/login', data);
            console.log(res.data);
            if(res.error){
                throw new Error(res.error);
            }


            localStorage.setItem('chat-user', JSON.stringify(res.data));
            setAuthUser(res.data);

            toast.success("Happy")

        } catch (error) {
            toast.error('Again');
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    return { loading, login };
}

export default useLogin;
