import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
	const { loading, login } = useLogin();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
		await login(formData);
        console.log('Username:', formData.username);
        console.log('Password:', formData.password);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            name='username'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Link to={'/signup'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>
                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
