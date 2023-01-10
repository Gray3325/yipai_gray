import React from "react";
import { Link } from "react-router-dom";
import "./users.css";

const Users = () => (
    <div id='users'>
        <img
            className='object-center bg-center object-scale-down'
            url='' 
            alt='使用者頭貼'
        />
        <h1 className='text-center'>您好 MAY 你現在是藝拍小夥伴啦！</h1>
        <div className="flex flex-row content-center flex-wrap gap-x-4">
            {/* <a className='border-4 rounded-full px-3 py-1' href="#">帳戶設定</a>
            <a className='border-4 rounded-full px-3 py-1' href="#">購買記錄</a>
            <a className='border-4 rounded-full px-3 py-1' href="#">我的訂單</a>
            <a className='border-4 rounded-full px-3 py-1' href="#">我喜愛的藝術家</a>
            <a className='border-4 rounded-full px-3 py-1' href="#">我喜愛的藝術品</a> */}
        </div>
        <div></div>
        <button className='login-button'>
            <Link to='/users/login'>Login</Link>
        </button>
    </div>
);

export default Users;
