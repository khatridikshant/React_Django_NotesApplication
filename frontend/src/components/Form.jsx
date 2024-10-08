import React, { useState } from 'react'
import api from '../api'
import { Navigate, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants'
import { REFRESH_TOKEN } from '../constants'
import axios from 'axios'

const Form = ({route, method}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (formValue) => {

        formValue.preventDefault()
        setLoading(true)
        try{
            const res = await api.post(route , {username, password})
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                window.location.href = "/"
            }

            if (method === "register"){
                navigate("/login")
            }
            else 
            {
                navigate("/login")}
        }catch(error){
                console.log(error)
                if (axios.isAxiosError(error)){
                    console.log(error)
                }
        }finally {setLoading(false)}

    }

    return (

        <div className='container text-center'>
            <div className='row'>
                <div className='col'></div>
                <div className='col-10'>

                
                    <form action="" onSubmit={handleSubmit} className='form-container bg-secondary p-2'>
                    <h1>{method === "login" ? "Login" : "Register"}</h1>

                        <div class="mb-3 px-5">
                            <label for="exampleFormControlInput1" class="form-label text-white">Email address</label>
                            <input type="text" class="form-control"
                                id="username" placeholder="name@example.com" value={username}
                                onChange={(e) => { setUsername(e.target.value) }} />
                        </div>

                        <div class="mb-3 px-5">
                            <label for="exampleFormControlInput1" class="form-label text-white">Password</label>
                            <input type="password" class="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }}
                                id="password" />
                        </div>


                        <button type="submit" class="btn btn-primary">{method === "login" ? "Login" : "Register"}</button>


                    </form>
                </div>
                <div className='col'></div>
            </div>
        </div>
    )
}

export default Form