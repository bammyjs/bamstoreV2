
import React, { useState } from "react"
import BreadCrumb from '../componets/BreadCrumb'
import { Meta } from '../componets/Meta'
import { Link } from "react-router-dom"

const ForgotPassword = () => {


    
  return (
    <>
        <Meta title={"Forgot Password"} />
        <BreadCrumb title="Forgot Password" />
        <main className= ' w-full px-6 flex flex-col items-center justify-center gap-6 my-32 md:my-60'>
            <form action="" className="w-full container px-6   bg-light py-6 rounded-lg max-w-md gap-6 flex flex-col shadow-2xl">
                <h3 className="text-3xl text-dark text-center md:text-4xl font-bold">Reset Password</h3>
                <p className="text-center text-dark">Enter Your email to reset password</p>
                {/*    <!-- Component: Rounded basic input  --> */}
                <input 
                type="email" 
                name="" id="" 
                placeholder="E-mail" 
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                
                <button type='button' className="btn btn-primary">Reset</button>
            </form>
            <p className="text-dark">Remembered your password? <Link to={"/login" } end className="text-sec-color" >Login</Link> </p>
        </main>
    </>
  )
}

export default ForgotPassword