import { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/authContext';


const useSignup = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const API = '/api/auth/signup';

    const signup = async ({fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputError({fullName, username, password, confirmPassword, gender});

        if(!success) return;

        setLoading(true);

        try {
            const res = await fetch(API, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })



            const data = await res.json();

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

            console.log(data);
        } catch (error) {
            console.log(error);
            toast.error(error.error);
        }finally{
            setLoading(false)
        }

        
    }


    return {loading, signup};
}

export default useSignup;

const handleInputError = ({fullName, username, password, confirmPassword, gender }) =>{
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill in all fields.");
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match.");
    }

    if(password.lenght < 6){
        toast.error("Password should be at least 6 characters");
    }

    return true;
}