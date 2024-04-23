import {createContext, useContext, useState } from "react";

// create a context
// create a provider


// creating context
export const AuthContext = createContext();

// creating provider

export const AuthProvider = ({children}) => {

    const [isClicked, setIsClicked] = useState(false)
    const [isHostelBtnClicked, setIsHostelBtnClicked] = useState(false)
    const [isPassBtnClicked, setIsPassBtnClicked] = useState(false)

    const storeTokenToLocal = (token) => {
        return localStorage.setItem("Token", token)
    }
    // const storeEmailToLocal = (email) => {
    //     return localStorage.setItem("Token", email)
    // }

    


    return <AuthContext.Provider value={{ storeTokenToLocal, isClicked, setIsClicked,isPassBtnClicked, setIsPassBtnClicked, isHostelBtnClicked, setIsHostelBtnClicked }}>
        {children}
    </AuthContext.Provider>
}

// creating a dispatcher
export const useAuth = () => {
    const contextValue = useContext(AuthContext)

    if(!contextValue){
        throw new Error("useAuth used outside the Provider!!!")
    }

    return contextValue;
}



