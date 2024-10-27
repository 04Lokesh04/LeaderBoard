import {useState} from 'react'
import { useAuth } from '../../context/authcontext'
import { useNavigate } from 'react-router-dom'

const Login =()=>{
    const [Loginform, setLoginform]=useState({username:"", password:""})
    const navigate=useNavigate()
    const {login}=useAuth()

    const changeLoginForm=(e)=>{
        setLoginform({...Loginform, [e.target.name]:e.target.value})
    }

    const submitLoginForm= async(e)=>{
        e.preventDefault()

        try{
            const url=`http://localhost:7000/api/auth/v1/login`
            const options={
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(Loginform)
            }

            const response = await fetch (url, options)
            if (response.ok){
                const data=await response.json()
                login(data)
                navigate('/')
            }
    }
        catch(error){
            console.log('error logging in :', error)
        }
    }

    return (
        <div className='bg-white flex flex-col justify-center items-center h-screen w-screen bg-cover'>
        <form className=' bg-slate-200 flex flex-col justify-center items-center h-100 w-96 rounded-xl shadow-black p-5' onSubmit={submitLoginForm}>
            <h1 className='text-black m-4 '>Login</h1>
            <div  className=' flex flex-col  w-full mb-4'>
                <label className='text-slate-800 text-xl mb-2' htmlFor='username'>User name</label>
                <input id='username' className='h-8 w-4/5 bg-slate-50 border-stone-400 text-gray-800 ' placeholder='User Name' 
                type='text' value={Loginform.username} onChange={changeLoginForm} name='username' required/>
            </div>

            <div  className=' flex flex-col  w-full mb-4'>
                <label className='text-slate-800 text-xl mb-2' htmlFor='password'>Password</label>
                <input id='password' className='h-8 w-4/5 bg-slate-50 border-stone-400 text-gray-800 ' placeholder='Password' 
                type='password' value={Loginform.password} onChange={changeLoginForm} name='password' required/>
            </div>

            <button className='self-center bg-sky-950 h-8 w-28 text-indigo-50 rounded-2xl border-0 hover:bg-transparent hover:text-neutral-950 hover:border-slate-950 hover:border-2' type='submit'>Login</button>
        </form>
            <p className='text-red-800'> New User ? please register first and then login</p>
            <p className='text-blue-800 underline-offset-2 hover:cursor-pointer' onClick={()=>navigate('/register')}>Register</p>
        </div>
    )
}

export default Login