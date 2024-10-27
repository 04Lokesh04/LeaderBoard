import { createContext, useContext, useState } from "react";

export const AuthContext=createContext()

export const Authprovider=({children})=>{
    const  [user, setUser]=useState(()=>{
        const udata=localStorage.getItem('user')
        return udata ? udata:null 
    })

    const login=(userdata)=>{
        setUser({userdata})
        localStorage.setItem('user', JSON.stringify(userdata))
    }

    const logout=()=>{
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=>  {
    return useContext(AuthContext) 
}