import React from "react";
import ReactDOM from "react-dom";
import BuyBotton from "./BuyBotton";
// 帳號設定
function BuyerSettings(params) {
    ReactDOM.render(
        <div>
            <div
                className='_buyLogin_flex'
                style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
                <div style={{ margin: "0 2em 0 2em" }}>
                    <div
                        className='_buyLogin_Titlebox _buyLogin_flex'
                        style={{ alignItems: "flex-start" }}
                    >
                        <div
                            className='_buyLogin_h4'
                            style={{ marginLeft: "0" }}
                        >
                            帳戶設定
                        </div>
                    </div>
                    <div
                        className='_buyLogin_Contentbox _buyLogin_flex'
                        style={{
                            alignItems: "unset",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* 左邊表單 */}
                        <form method='post'>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    用戶姓名：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='text'
                                    name='username'
                                ></input>
                            </div>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    帳號：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='text'
                                    name='account'
                                ></input>
                            </div>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    Email：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='email'
                                    name='email'
                                ></input>
                            </div>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    Tel：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='tel'
                                    name='tel'
                                ></input>
                            </div>
                            <div
                                className='_buyLogin_flex _buyLogin_p2'
                                style={{
                                    alignItems: "end",
                                    paddingBottom: "2em",
                                }}
                            >
                                <button className='_buyLogin_ChangeControlBtn '>
                                    更改
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/*  */}
                <div style={{ margin: "0 2em 0 2em" }}>
                    <div
                        className='_buyLogin_Titlebox _buyLogin_flex'
                        style={{ alignItems: "flex-start" }}
                    >
                        <div
                            className='_buyLogin_h4'
                            style={{ marginLeft: "0" }}
                        >
                            地址設定
                        </div>
                    </div>
                    <div className='_buyLogin_Contentbox'>
                        {/* 右邊表單 */}
                        <form method='post'>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    城市：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='text'
                                    name='city'
                                ></input>
                            </div>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    區：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='text'
                                    name='township'
                                ></input>
                            </div>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    路：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='text'
                                    name='rode'
                                ></input>
                            </div>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    路鄰里：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='text'
                                    name='adjacent'
                                ></input>
                            </div>
                            <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                <label
                                    className='_buyLogin_h4'
                                    style={{
                                        fontSize: 14,
                                        marginLeft: "0",
                                    }}
                                >
                                    郵遞區號：
                                </label>
                                <input
                                    className='_buyLogin_SettingInput'
                                    type='number'
                                    name='postalCode'
                                ></input>
                            </div>
                            <div
                                className='_buyLogin_flex _buyLogin_p2'
                                style={{
                                    alignItems: "end",
                                    paddingBottom: "2em",
                                }}
                            >
                                <button className='_buyLogin_ChangeControlBtn '>
                                    更改
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("userDown")
    );
}
// 我的訂單選項
function MyOrder(params) {
    ReactDOM.render(
        <div>
            <div style={{ overflowX: "auto" }}>
                <table className='_buyLogin_table'>
                    <thead className="_buyLogin_tline">
                        <tr className='_buyLogin_td'>
                            <th>訂單編號</th>
                            <th>出貨狀態</th>
                            <th>金額</th>
                            <th>訂購時間</th>
                            <th>訂購品項</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='_buyLogin_tr _buyLogin_tline' style={{borderColor:"#CAB296"}}>
                            <td>1002939311112</td>
                            <td>未出貨</td>
                            <td>109,800</td>
                            <td>2022/11/02</td>
                            <td>3</td>
                            <td>
                                <button className="_buyLogin_tableBtn">詳細資訊</button>
                            </td>
                        </tr>
                        <tr className='_buyLogin_tr _buyLogin_tline' style={{borderColor:"#CAB296"}}>
                            <td>100293931223</td>
                            <td>已出貨</td>
                            <td>10,800</td>
                            <td>2022/12/02</td>
                            <td>2</td>
                            <td>
                                <button className="_buyLogin_tableBtn">詳細資訊</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>,
        document.getElementById("userDown")
    );
}

export { BuyerSettings, MyOrder };
