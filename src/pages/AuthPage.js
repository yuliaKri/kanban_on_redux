import React, {useState} from "react";
import {Card, Button, CardTitle} from 'reactstrap';
import axios from "axios";

function AuthPage() {

    const [form, setForm] = useState({
        email:"",
        password: ""
    });

    const changeHandler = event => {
        setForm({...form,[event.target.name]: event.target.value})
    }

    const registerHandler = (email,password) => {
      //  тут нужно отправить запрос с методом POST на сервер localhost:5000/user/register или API
        axios({
            method: 'POST',
            url: 'https://kanban-yulia.herokuapp.com/user/register',
            headers: {'Content-Type':'application/json'},
            data: JSON.stringify({email: email, password: password})
        })
            .then(function(body){
                console.log(body);
                // props.cardAdd({name: name,description: description, priority:Number(priority),status:status});
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="row align-items-start">
       {/* <div className="col" >*/}
            <div className="card" style={{ width: '42rem', height:'11rem'}}>
                <Card body inverse color="primary">
                    <CardTitle tag="h5">Authorization</CardTitle>
                    <input placeholder="email" style={{ width: '21rem'}}/>
                    <input placeholder="password" style={{ width: '21rem'}}/>
                    <table>
                        <Button color="warning" style={{ width: '10rem', marginRight: 12}} onChange={changeHandler}>Log in</Button>
                        <Button color="secondary" style={{ width: '10rem'}} onChange={registerHandler}>Sign in</Button>
                    </table>
                </Card>
            </div>


        </div>
    )
}

export default AuthPage;