import React from "react";
import { Link } from "react-router-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

import Userstyle from "./users.css";
import { AccountSettings } from "./AccountSettings";


//  圖片導入
import Usericon from "./image/Usericon.png";
import Artisticon from "./image/Artisticon.png";
import imgBG from "./image/img-BG.png";


const Users = () => (
    <div id='users'>
        {/* <img
            className='object-center bg-center object-scale-down'
            src="./image/user.png" 
            alt='使用者頭貼'
        /> */}
        {/* <h1 className='text-center'>您好 MAY 你現在是藝拍小夥伴啦！</h1> */}
        <img className="imgBG" src={imgBG} alt="背景圖"></img>
        <button className='login-button'>
            <div
                className='smallBox textSize'
                style={{ backgroundColor: "#F9F7F2" }}
            >
                <img className='imgSize' src={Usericon} alt="買家icon"></img>
                <Link to='/users/UserLogin'>買家登入</Link>
            </div>
            <div
                className='smallBox textSize'
                style={{ backgroundColor: "#C9D7E3" }}
            >
                <img className='imgSize' src={Artisticon} alt="賣家icon"></img>
                <Link to='/users/ArtistLogin'>賣家登入</Link>
            </div>
        </button>
    </div>
);

export default Users;
