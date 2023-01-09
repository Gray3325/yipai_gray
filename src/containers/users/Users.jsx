import React from "react";
import { Link } from "react-router-dom";
import "./users.css";


const Users = () => (
    <div id='users'>
        
        <h1 className="text-center">您好 MAY 你現在是藝拍小夥伴啦！</h1>
        

        <br />
    <button className='login-button'><Link to='/users/login' >Login</Link></button>
    </div>
);

export default Users;
