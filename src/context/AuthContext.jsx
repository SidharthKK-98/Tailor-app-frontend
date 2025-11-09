import {  createContext,useContext,useState } from "react";

export const AuthContext=createContext()

export const useAuthContext=()=>{
    return useContext(AuthContext)
}

export const AuthContextProvider=({children})=>{

    const[authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem("autherized-user")) || null) //Allows the app to retain the authenticated user session across page refreshes or app restarts.

    return <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
    </AuthContext.Provider>
}