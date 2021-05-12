import React, {useContext, useEffect, useState} from "react";
import {Card, Button, CardTitle} from 'reactstrap';
import axios from "axios";
import {useCallback} from "react";
import {AuthContext} from "../context/AuthContext";

function AuthPage() {
    const auth = useContext(AuthContext)
    const [error,setError] = useState(null)
    const clearError = useCallback(()=>setError(null),[])

    const useMessage = () => {
        return useCallback(text => {
            if (window.M && text) {
                window.M.toast({html: text})
            }
        },[])
    }
    const message = useMessage();

    useEffect(()=>{
        console.log('Error from useEffect:',error)
        message(error)
        clearError()
    },[error,message,clearError])

    const [form, setForm] = useState({
        email:"",
        password: ""
    });

    const changeHandler = event => {
        setForm({...form,[event.target.name]: event.target.value})
    }

//    const [currentUser, setCurrentUser] = useState('')
    /*const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")*/

    const registerHandler = async () => {
        axios({
            method: 'POST',
            url: 'https://kanban-yulia.herokuapp.com/user/register',
            headers: {'Content-Type':'application/json'},
            data: JSON.stringify({...form}) //{email:email, password:password}
        })
            .then(function(data){console.log(data.request.response);message(data.request.response)})
            .catch(function (data){console.log(data.request.response);setError(data.request.response)})
    }

    const loginHandler = () => {
         axios({
            method: 'POST',
            url: 'https://kanban-yulia.herokuapp.com/user/login',
            headers: {'Content-Type':'application/json'},
            data: JSON.stringify({...form})
        })
            .then(function(data){
                console.log('data.request.response:',data.request.response);
                console.log("data: ",data, "data.data.token",data.data.token);
                auth.login(data.data.token,data.data.userId)})
            .catch(function (data){console.log(data.request.response);console.log(data)})
    }

    return (
        <div className="row align-items-start">
       {/* <div className="col" >*/}
            <div className="card" style={{ width: '42rem', height:'11rem'}}>
                <Card body inverse color="primary">
                    <CardTitle tag="h5">Authorization</CardTitle>
                    <input placeholder="inter email" name="email" style={{ width: '21rem'}} onChange={changeHandler}/>
                    <input placeholder="inter password" name="password" type="password" style={{ width: '21rem'}}  onChange={changeHandler} />
                    <table>
                        <Button color="warning" style={{ width: '10rem', marginRight: 12}} onClick={loginHandler}>Log in</Button>
                        <Button color="secondary" style={{ width: '10rem'}} onClick={registerHandler}>Sign in</Button>
                    </table>
                </Card>
            </div>


        </div>
    )
}

export default AuthPage;