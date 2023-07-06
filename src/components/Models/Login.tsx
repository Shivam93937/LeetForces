import { authModelState } from '@/atoms/authmodelatom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {useSetRecoilState} from "recoil";
type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const setAuthModelState=useSetRecoilState(authModelState);
    function handleClick(type:"register" | "forgotPassword" | "login"){
        setAuthModelState((prev)=>({...prev, type}));
    }
    const router=useRouter();
    const [inputs,setInputs]=useState({email:"",password:""});
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    const handleLogin= async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!inputs.email || !inputs.password) return alert("Please enter all fields!")
        try {
            const Newuser=await signInWithEmailAndPassword(inputs.email,inputs.password);
            if(!Newuser) return;
            router.push("/");

        } catch (error:any) {
            alert(error.message);
        }
    }
    useEffect(()=>{
        if(error) alert(error.message)
    },[error]);
    
    return (
    <form className='space-y-6 px-6 py-4' onSubmit={handleLogin}>
        <h3 className='text-xl font-medium text-white'>Sign In to LeetForces</h3>
        <div>
            <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                Your Email 
            </label>
            <input onChange={handleInputChange} type='email' name='email' id='email' className='
            border-2 outline-none s:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='name@example.com'/>
        </div>

        <div>
            <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
                Your password 
            </label>
            <input onChange={handleInputChange} type='password' name='password' id='password' className='
            border-2 outline-none s:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='**********'/>
        </div>

        <button type="submit" className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'>
            {loading?"Loading...":"Login"}
        </button>

        <button className='flex w-full justify-end' onClick={()=>handleClick("forgotPassword")}>
            <a href="#" className='text-sm block text-brand-orange hover:underline w-full text-right'>
                Forgot Password?
            </a>
        </button>

        <div className='text-sm font-medium text-gray-300' onClick={()=>handleClick("register")}>
            Not Registered?{" "}{" "}
            <a href="#" className='text-blue-700 hover:underline'>
                Create Account
            </a>
        </div>
    </form>)
}
export default Login;