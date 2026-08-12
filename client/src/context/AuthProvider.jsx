// File: src/context/AuthProvider.jsx

import { useState } from "react";
import { AuthContext } from "./AuthContext";


export default function AuthProvider({ children }) {


    const [user, setUser] = useState(

        JSON.parse(
            localStorage.getItem("user")
        ) || null

    );


    const [token, setToken] = useState(

        localStorage.getItem("accessToken") || null

    );



    const login = (userData, accessToken) => {


        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );


        localStorage.setItem(
            "accessToken",
            accessToken
        );


        setUser(userData);

        setToken(accessToken);

    };



    const logout = () => {


        localStorage.removeItem(
            "user"
        );


        localStorage.removeItem(
            "accessToken"
        );


        setUser(null);

        setToken(null);

    };



    const isAuthenticated = !!token;



    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                isAuthenticated,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}