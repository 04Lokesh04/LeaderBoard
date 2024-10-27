import { useState, useEffect, } from "react";
import { useAuth } from "../../context/authcontext";
import Navbar from '../Navbar'

const Home=()=>{
    const [friends, setFriends]=useState([])
    const {user}=useAuth()
    const parseduser=JSON.stringify(user)

    const fetchusers= async ()=>{

        const url=`${process.env.REACT_APP_API_URL}/get-users`
        const options={
            method:'GET',
        }

        try {
            const response= await fetch (url, options)
        const data=await response.json()

        if (response.ok){
            setFriends(Array.isArray(data.data) ? data.data : [])
        }
        }catch (error){
            console.log('error in getting users:', error)
        }
    }

    useEffect(()=>{
        fetchusers()
    }, [])

    const handlepoints= async(username)=>{
        const url=`${process.env.REACT_APP_API_URL}/claim-points`
        const options={
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${parseduser.token}`
            },
            body:JSON.stringify({username})
        }
        
        try{
            const response=await fetch(url, options)
        const data=await response.json()

        if (response.ok){
            setFriends(data)
            
            fetchusers()
        }
        } catch (error){
            console.log('error in increasing points:',error )
        }
    }

    return (
        <div className="h-full w-full">
            <Navbar />
            <div className="h-full w-full flex flex-col justify-center items-center p-10">
            <h1 className="text-black text-3xl  font-bold mb-5"> Welcome </h1>
            <p className="text-black text-3xl font-bold mb-5"> Your Friends</p>
            <ul className="h-3/4 w-2/3 bg-slate-400 rounded-xl p-4">
            {friends && friends.length > 0 ? (
    friends.map((each) => (
        <li key={each.username}>
            <hr />
            <div className="flex flex-row justify-between p-2">
                <h1 className="w-28">{each.username}</h1>
                <p className="">{each.firstName} {each.lastName}</p>
                <div className="">
                    <p className="text-red-900">Points: {each.Points}</p>
                    <button
                        className="bg-slate-800 text-white h-8 w-16 rounded-xl hover:bg-transparent hover:border-2"
                        onClick={() => handlepoints(each.username)}
                    >
                        Help
                    </button>
                </div>
            </div>
            <hr />
        </li>
    ))
) : (
    <p>No friends found.</p>
)}

            </ul>

        </div>
        </div>
    )
}

export default Home