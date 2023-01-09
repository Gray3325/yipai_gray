import React from "react";
import { Link } from "react-router-dom";
import "./users.css";

const Users = () => (
    <div id='users'>
        <img
            className='object-center bg-center'
            url='' 
            alt='使用者頭貼'
        />
        <h1 className='text-center'>您好 MAY 你現在是藝拍小夥伴啦！</h1>
        <div className="flex flex-row content-center flex-wrap ">
            <button className='border-4 rounded-full '>帳戶設定</button>
            <button className='border-4 rounded-full '>購買記錄</button>
            <button className='border-4 rounded-full '>我的訂單</button>
            <button className='border-4 rounded-full '>我喜愛的藝術家</button>
            <button className='border-4 rounded-full '>我喜愛的藝術品</button>
        </div>
        
        <button className='login-button'>
            <Link to='/users/login'>Login</Link>
        </button>
    </div>
);

export default Users;
