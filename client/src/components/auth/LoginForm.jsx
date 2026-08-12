import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

import { loginUser } from "../../api/authApi";
import { getMyProfile } from "../../api/patientApi";

import useAuth from "../../hooks/useAuth";


function LoginForm({ onSwitch }) {


    const navigate = useNavigate();

    const { login } = useAuth();


    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [remember, setRemember] = useState(false);

    const [loading, setLoading] = useState(false);

    const [serverMessage, setServerMessage] = useState("");

    const [errors, setErrors] = useState({});



    const validateForm = () => {


        const newErrors = {};


        if (!email.trim()) {

            newErrors.email = "Email is required.";

        } 
        else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {

            newErrors.email =
                "Enter a valid email address.";

        }



        if (!password.trim()) {

            newErrors.password =
                "Password is required.";

        }



        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;

    };




    const handleSubmit = async (e) => {


        e.preventDefault();


        setServerMessage("");



        if (!validateForm()) {

            return;

        }



        try {


            setLoading(true);



            const response = await loginUser({

                email,

                password

            });

console.log("LOGIN RESPONSE:", response);
console.log("USER:", response.data.user);
console.log("ROLE:", response.data.user.role);

            login(

                response.data.user,

                response.data.accessToken

            );




            if (remember) {


                localStorage.setItem(

                    "rememberEmail",

                    email

                );


            } 
            else {


                localStorage.removeItem(

                    "rememberEmail"

                );


            }




            const role = response.data.user.role;



            switch(role) {



                case "admin":


                    navigate("/admin/dashboard");

                    break;




                case "doctor":


                    navigate("/doctor/dashboard");

                    break;




                case "patient": {


                    const profile =
                         await getMyProfile();


                    console.log("PATIENT PROFILE RESPONSE:", profile);

                    console.log("FULL PROFILE:", profile);

                    console.log("PATIENT DATA:", profile.data);

                    const patient = profile.data || profile;


                    const profileCompleted =

                        patient.phone &&

                        patient.date_of_birth &&

                        patient.gender &&

                        patient.blood_group &&

                        patient.address &&

                        patient.emergency_contact;



                    if(profileCompleted) {


                        navigate(
                            "/patient/profile"
                        );


                    }
                    
                    else {

                      console.log("REDIRECTING TO COMPLETE PROFILE");

                        navigate("/patient/complete-profile");

}


                    break;


                }





                default:


                    navigate("/login");


            }



        } 
        catch(error) {


            setServerMessage(

                error.response?.data?.message ||

                "Login failed."

            );


        }
        finally {


            setLoading(false);


        }



    };





    return (


        <div className="login-form">


            <h2 className="login-title">

                Welcome Back 👋🏻 

            </h2>



            <p className="login-subtitle">

                Sign in to continue

            </p>




            <form onSubmit={handleSubmit} noValidate>




                {/* Email */}


                <div className="mb-3">


                    <label

                        htmlFor="email"

                        className="login-label mb-2"

                    >

                        Email

                    </label>




                    <input

                        id="email"

                        type="email"

                        className={
                            `form-control login-input ${
                                errors.email
                                ? "is-invalid"
                                : ""
                            }`
                        }

                        placeholder="Enter your email"

                        value={email}

                        onChange={(e)=>{


                            setEmail(e.target.value);



                            if(errors.email){

                                setErrors({

                                    ...errors,

                                    email:""

                                });

                            }


                        }}

                    />



                    {
                        errors.email &&

                        <small className="validation-error">

                            {errors.email}

                        </small>

                    }



                </div>







                {/* Password */}



                <div className="mb-3">



                    <label

                        htmlFor="password"

                        className="login-label mb-2"

                    >

                        Password

                    </label>





                    <div className="password-wrapper">



                        <input


                            id="password"


                            type={
                                showPassword
                                ? "text"
                                : "password"
                            }


                            className={
                                `form-control login-input ${
                                    errors.password
                                    ? "is-invalid"
                                    : ""
                                }`
                            }


                            placeholder="Enter your password"


                            value={password}


                            onChange={(e)=>{


                                setPassword(
                                    e.target.value
                                );


                                if(errors.password){


                                    setErrors({

                                        ...errors,

                                        password:""

                                    });


                                }


                            }}



                        />





                        <button


                            type="button"


                            className="password-toggle"


                            onClick={()=>


                                setShowPassword(
                                    !showPassword
                                )


                            }


                        >

                            {
                                showPassword
                                ? "🙈"
                                : "👀"
                            }


                        </button>



                    </div>





                    {
                        errors.password &&


                        <small className="validation-error">

                            {errors.password}

                        </small>


                    }



                </div>







                {/* Remember Me */}




                <div className="d-flex justify-content-between align-items-center mb-4">


                    <div className="form-check">


                        <input


                            className="form-check-input"


                            type="checkbox"


                            id="remember"


                            checked={remember}


                            onChange={(e)=>

                                setRemember(
                                    e.target.checked
                                )

                            }


                        />



                        <label


                            className="form-check-label text-white"


                            htmlFor="remember"


                        >

                            Remember Me


                        </label>



                    </div>


                </div>


                {
                    serverMessage &&


                    <div className="alert alert-danger">

                        {serverMessage}

                    </div>


                }







                <button


                    type="submit"


                    className="login-button"


                    disabled={loading}



                >


                    {

                        loading

                        ? "Logging in..."

                        : "Login"

                    }



                </button>







                <p className="text-center text-white mt-4">


                    Don't have an account?{" "}



                    <button


                        type="button"


                        className="register-link bg-transparent border-0"


                        onClick={onSwitch}



                    >

                        Create Account


                    </button>



                </p>





            </form>





        </div>



    );


}



export default LoginForm;