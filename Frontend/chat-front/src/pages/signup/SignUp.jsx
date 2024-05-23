import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

	const {loading, signup} = useSignup();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'radio' ? value : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
		const data = await signup(formData);
		console.log('Data', data);
        console.log('Form Data:', formData);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder='John Doe'
                            className='w-full input input-bordered h-10'
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10'
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                        />
                    </div>

                    <div className='flex'>
                        <div className='form-control'>
                            <label className='label gap-2 cursor-pointer'>
                                <span className='label-text'>Male</span>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='male'
                                    checked={formData.gender === 'male'}
                                    onChange={handleChange}
                                    className='radio border-slate-900'
                                />
                            </label>
                        </div>
                        <div className='form-control'>
                            <label className='label gap-2 cursor-pointer'>
                                <span className='label-text'>Female</span>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='female'
                                    checked={formData.gender === 'female'}
                                    onChange={handleChange}
                                    className='radio border-slate-900'
                                />
                            </label>
                        </div>
                    </div>

                    <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </Link>

                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            <Outlet />
        </div>
    );
};

export default SignUp;
