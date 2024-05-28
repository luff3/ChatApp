import { useState } from 'react'
import { useAuthContext } from '../context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

            console.log(res);
            if(res.error){
                throw new Error(res.error);
            }
            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            toast.error(error);
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    return {loading, logout}
}

export default useLogout
