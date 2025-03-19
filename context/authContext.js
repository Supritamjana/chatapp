import { createContext, useContext, useEffect, useState } from "react";



export const AuthContext = createContext();


export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(()=>{
        //onAuthStateChanged function
        setTimeout(()=>{
            setIsAuthenticated(false);
        },3000)
    },[])

    const login = async(email, password)=>{
        //login function
        try {
            
        } catch (error) {
            
        }
    }

    const register = async(email, password, mobile, profileUrl)=>{
        //register function
        try {
            
        } catch (error) {
            
        }
    }

    const logout = async()=>{
        //logout function
        try {
            
        } catch (error) {
            
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const values = useContext(AuthContext);

    if(!values){
        throw new Error('useAuth must be wrapped in AuthContextProvider');
    }
    
    return values;
}