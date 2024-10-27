import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Registration=()=>{

    const [formData, setFormData]=useState({firstName:"", lastName:"",email:"", username:"",password:""})
    const navigate=useNavigate()

    const changeForm=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const submitForm= async (e)=>{
        e.preventDefault()

        try{const url=`http://localhost:7000/api/auth/v1/register`
        const options={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
        }

        const response= await fetch (url, options)
        if (response.ok){
            navigate('/login')
        }}
        catch (error){
            console.log('error in registering:', error)
        }

    }

    return (
        <div className='bg-white flex justify-center items-center h-screen w-screen bg-cover'>
            <form className=' bg-slate-200 flex flex-col justify-center items-center h-100 w-96 rounded-xl shadow-black p-5' onSubmit={submitForm}>
            <h1 className='text-2xl text-black m-4 text-center'>Register</h1>
            <div className=' flex flex-col  w-full mb-4'>
                <label className='text-slate-800 text-xl mb-2' htmlFor='firstname'>First name</label>
                <input id='firstname' className='h-8 w-4/5 bg-slate-50 border-stone-400 text-gray-800 ' placeholder='First Name' 
                type='text' value={formData.firstName} onChange={changeForm} name='firstName' required/>
            </div>

            <div className='flex flex-col w-full mb-4'>
                <label className='text-slate-800 text-xl mb-2' htmlFor='lastname'>Last name</label>
                <input id='lastname' className='h-8 w-4/5 bg-slate-50 border-stone-400 text-gray-800 ' placeholder='Last Name' 
                type='text' value={formData.lastName} onChange={changeForm} name='lastName' required/>
            </div >

            <div className='flex flex-col w-full mb-4'>
                <label className='text-slate-800 text-xl mb-2' htmlFor='username'>User name</label>
                <input id='username' className='h-8 w-4/5 bg-slate-50 border-stone-400 text-gray-800 ' placeholder='User Name' 
                type='text' value={formData.username} onChange={changeForm} name='username' required/>
            </div>

            <div className='flex flex-col w-full mb-4'>
                <label className='text-slate-800 text-xl mb-2' htmlFor='email'>Email</label>
                <input id='email' className='h-8 w-4/5 bg-slate-50 border-stone-400 text-gray-800 ' placeholder='Email' 
                type='email' value={formData.email} onChange={changeForm} name='email' required/>
            </div>

            <div className='flex flex-col w-full mb-4 '>
                <label className='text-slate-800 text-xl mb-2'  htmlFor='password'>Password</label>
                <input id='password' className='h-8 w-4/5 bg-slate-50 border-stone-400 text-gray-800 ' placeholder='Password' 
                type='password' value={formData.password} onChange={changeForm} name='password' required/>
            </div>

            <button className='self-center bg-sky-950 h-8 w-28 text-indigo-50 rounded-2xl border-0 hover:bg-transparent hover:text-neutral-950 hover:border-slate-950 hover:border-2' type='submit'>Register</button>
        </form>
        </div>
    )
}

export default Registration