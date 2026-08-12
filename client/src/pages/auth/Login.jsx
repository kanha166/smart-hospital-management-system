// File: src/pages/auth/Login.jsx

import { useState } from "react";

import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

function Login() {

    const [isLogin, setIsLogin] = useState(true);

    return (

        <AuthLayout>

            {
                isLogin
                    ? (
                        <LoginForm
                            onSwitch={() => setIsLogin(false)}
                        />
                    )
                    : (
                        <RegisterForm
                            onSwitch={() => setIsLogin(true)}
                        />
                    )
            }

        </AuthLayout>

    );

}

export default Login;