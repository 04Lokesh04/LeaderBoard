import { useAuth } from "../../context/authcontext";
import { useState, useEffect} from "react";
import Modal from 'react-modal'
import Navbar from "../Navbar";

const LeaderBoard=()=>{
    const {user}=useAuth()
    const parseduser=JSON.parse(user)
    const [users, setUsers]=useState([])
    const [time, setTime]=useState('daily')
    const [showmodal, setModal]=useState(false)
    const [selecteduserdata, setSelecteduserdata]=useState([])

    Modal.setAppElement("#root")

    useEffect(()=>{
        fetchusers()
    }, [time])

    const fetchusers= async()=>{
        //let url=`${process.env.REACT_APP_API_URL}/your-daily-history`

        /*if (time==='weekly'){
            url=`${process.env.REACT_APP_API_URL}/your-weekly-history`
        }
        else if (time==='monthly'){
            url=`${process.env.REACT_APP_API_URL}/your-monthly-history`
        } */

        const url=`${process.env.REACT_APP_API_URL}/get-users`

        const options={
            method:"GET",
        }

        try{
            const response= await fetch(url, options)
            const data= await response.json()
            if (response.ok){
                
                setUsers(data.data.sort((a,b)=>b.Points-a.Points))
                console.log(data.data.sort((a,b)=>b.Points-a.Points))
            }
        }catch (error){
            console.log('error in fetching leaderboard:', error)
        }
    }

    const fetchhistoryofpoints= async(username)=>{
        const url=`${process.env.REACT_APP_API_URL}/your-history`
        const options={
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${parseduser.token}`
            },
            body:JSON.stringify({username})
        }
        try{
            
            const response =await fetch(url, options)
            const data=await response.json()
            if (response.ok){
                console.log(data)
                setSelecteduserdata(data.data)
                setModal(true)
            }
        }
        catch(error){
            console.log('error in fetching history:', error)
        }
    }

    const closeModal=()=>{
        setModal(false)
        setSelecteduserdata([])
    }

    return (
        <div className="h-full w-full">
            <Navbar />
            <div className="h-full w-full flex flex-col justify-center items-center p-11">
                <div className=" bg-slate-200  h-4/5 w-2/3 flex flex-col justify-between items-center">
                    <div className=" bg-blue-700 h-10 w-full flex  justify-between items-center p-8 ">
                        <div>
                            <p className="">{parseduser.data.Points} Today</p>
                            <p className="">Rs.{parseduser.data.Points} /-</p>
                        </div>
                        <p className="">LeaderBoard</p>
                    </div>

                    <div className="flex flex-col p-8">
                        <div className="flex flex-row justify-start items-center p-5">
                            <button className={`${time === 'daily' ? 'text-black bg-orange-500 rounded-lg h-10 w-20 m-6' : 'text-black bg-white rounded-lg h-10 w-20 m-6'}`}  onClick={()=>setTime('daily')}>Daily</button>
                            <button className={`${time === 'weekly' ? 'text-black bg-orange-500 rounded-lg h-10 w-20 m-6' : 'text-black bg-white rounded-lg h-10 w-20 m-6'}`}  onClick={()=>setTime('weekly')}>Weekly</button>
                            <button className={`${time === 'monthly' ? 'text-black bg-orange-500 rounded-lg h-10 w-20 m-6' : 'text-black bg-white rounded-lg h-10 w-20 m-6'}`}  onClick={()=>setTime('monthly')}>Monthly</button>
                        </div>

                        <div className="">
                            <hr className="border-t-2 border-slate-700"/>
                            <ul className="flex flex-row justify-between items-center  mt-1 mb-1">
                                {users.slice(0,3).map((each)=>(
                                    <li className="" key={each.username}>
                                        
                                        <p className="">{each.username}</p>
                                        <p className="">{each.Points}</p>
                                        <p className="text-orange-700">Prize: Rs.{each.Points}</p>
                                    </li>
                                ))}
                            </ul>
                            
                            <ul className=" w-full">
                                {users.map((each, index)=>(
                                    <li className=" flex flex-row justify-between mt-2 hover:bg-slate-300" key={each.username} onClick={()=>fetchhistoryofpoints(each.username)}>
                            
                                        <div className="w-28 mr-24">
                                            <p className="">{each.username}</p>
                                            <p className="">Rank : {index+1}</p>
                                        </div>
                                        <p className="text-red-800 mr-24">Prize: Rs.{each.Points}</p>
                                        <p className="text-green-700">{each.Points}</p>
                        

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Modal className= 'h-3/5 w-1/3 rounded-md p-3'
                isOpen={showmodal}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Optional: Dark overlay behind the modal
                    },
                    content: {
                        position: 'fixed', 
                        top: '50%', 
                        left: '50%', 
                        right: 'auto', 
                        bottom: 'auto', 
                        marginRight: '-50%', 
                        transform: 'translate(-50%, -50%)', 
                        border: 'none', 
                        borderRadius: '0.5rem', 
                        padding: '1rem', 
                        backgroundColor: '#f8fafc', 
                    },
                }}
                
                contentLabel="USers History of points claimed">
                        <div className="h-full w-full flex flex-col justify-center items-center">
                        <h1 className="font-bold mb-3">History</h1>
                        <ul className=" mb-5">
                            {selecteduserdata.length >0 ? (
                                selecteduserdata.map((each, index)=>(
                                    <li className="mb-2" key={index}>
                                        <p className="text-slate-700">Date: {each.date}</p>
                                        <p className="text-slate-700">Points Awarded:{each.pointsAwarded}</p>
                                    </li>
                                ))
                            ):
                            (<p className="text-red-600 mb-5">History Not Available </p>)}
                        </ul>

                                <button className="bg-blue-800 text-white h-14 w-32 rounded-md" onClick={closeModal}>Close</button>
                        </div>

                    </Modal>
                </div>
            </div>
        </div>
    )

}

export default LeaderBoard