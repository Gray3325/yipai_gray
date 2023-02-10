// 安裝expressSession套件 https://www.npmjs.com/package/express-session
const expressSession = require("express-session");
// 安裝session-file-store套件 https://www.npmjs.com/package/session-file-store
const FileStore = require("session-file-store")(expressSession);
const path = require("path");
const { checkLogin } = require("./middlewares/authMiddleware");
const express = require("express");
const app = express();
require("dotenv").config();
const pool = require("./utils/db");
const fs = require("fs");

// 連線網址 http://localhost:3001
// 允許跨源存取,預設是全部開放,也可以做部分限制，參考 npm cors 的文件
const cors = require("cors");
app.use(
    cors({
        // 必須把 credentails 設定成 true，一定要設定 origin (來源)
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);
// 如果要讓 express 認得 json 資料,需要加上這個中間件
app.use(express.json());

app.use(
    expressSession({
        // 告訴 express-session session 要存sessions資料夾
        store: new FileStore({
            path: path.join(__dirname, "..", "sessions"),
        }),
        secret: process.env.SESSION_SECRET,
        // true: 即使 session 沒有改變也重新儲存一次
        resave: false,
        // true: 還沒有正式初始化的 session 也真的存起來
        saveUninitialized: false,
    })
);
//================================================================
// middleware => pipeline pattern
const uploadsPhoto = require('./routers/photoUplod');
// /uploadsPhoto
app.use('/uploadsPhoto', uploadsPhoto);
// 處理使用者註冊時上傳的圖片網址
// http://localhost:3001/public/uploads/XXX.jpg
app.use("/public", express.static("./public"));

// 首頁
app.get("/", async (req, res, next) => {
    console.log("這裡是藝拍首頁,顯示首頁資料");
    let [data] = await pool.query(
        "SELECT * FROM users JOIN user_order ON users.users_id = user_order.user_id JOIN product ON product.id = user_order.product_id LIMIT 1"
    );
    res.json(data);
});
// =================================================================
// https://www.npmjs.com/package/express-fileupload
// const fileUpload = require("express-fileupload"); //
// https://www.npmjs.com/package/body-parser
// const bodyParser = require('body-parser');
// https://www.npmjs.com/package/morgan
// const morgan = require('morgan');
// https://www.npmjs.com/package/lodash
// const _ = require('lodash');
// app.use(
//     fileUpload({
//         createParentPath: true,
//     })
// );

// 加入其它的middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('dev'));

//讓uploads目錄公開
// https://expressjs.com/zh-tw/starter/static-files.html
// app.use(express.static("uploads"));
// 如果想要改網址路徑用下面的
// 您可以透過 /static 路徑字首，來載入 uploads 目錄中的檔案。
// app.use("/uploads", express.static("uploads"));

// 單檔上傳到後端資料夾
// app.post("/upload-avatar", async (req, res) => {
//     try {
//         if (!req.files) {
//             res.send({
//                 status: false,
//                 message: "No file uploaded",
//             });
//         } else {
//             //使用輸入框的名稱來獲取上傳檔案 (例如 "avatar")
//             let avatar = req.files.avatar;

//             //使用 mv() 方法來移動上傳檔案到要放置的目錄裡 (例如 "uploads")
//             avatar.mv("./uploads/" + avatar.name);
//             // let [dataImg] = await pool.query(
//             //     "UPDATE users SET user_imageHead=? WHERE user_id=?",
//             //     ["./uploads/" + avatar.name, 84]
//             // );

//             //送出回應
//             res.json({
//                 status: true,
//                 message: "File is uploaded",
//                 data: {
//                     name: avatar.name,
//                     mimetype: avatar.mimetype,
//                     size: avatar.size,
//                     // Imgname: dataImg,
//                 },
//             });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


//訂單送出請求
app.post("/submitOrder", async (req, res) => {
    const { userName, productId, orderDate } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO user_order (user_id, product_id, order_date) VALUES ((SELECT users_id FROM users WHERE users_name = ?), ?, ?)",
            [userName, productId, orderDate]
        );
        res.json({ status: "success", result });
    } catch (error) {
        res.json({ status: "error", error });
    }
});

// 購物車
app.get("/cart", async (req, res, next) => {
    console.log("這裡是 /cart");
    let [data] = await pool.query(
        "SELECT * FROM product JOIN user_order ON product.id = user_order.product_id ORDER BY RAND() LIMIT 1"
    );
    res.json(data);
});
app.get("/maybelike", async (req, res, next) => {
    console.log("這裡是 /maybelike");
    let [data] = await pool.query(
        "SELECT * FROM product ORDER BY RAND() LIMIT 0,5 "
    );
    res.json(data);
});
// 商品頁
app.get("/product", async (req, res, next) => {
    console.log("這裡是 /product");
    let [data] = await pool.query("SELECT * FROM product");
    res.json(data);
});
// 商品頁細節
app.get("/product/:productId", async (req, res, next) => {
    console.log("/product/:productId => ", req.params.productId);
    let [data] = await pool.query("SELECT * FROM product WHERE id=? ", [
        req.params.productId,
    ]);
    res.json(data);
});
// 所有使用者資料
app.get("/users", async (req, res, next) => {
    console.log("這裡是 /users");
    let [data] = await pool.query("SELECT * FROM users");
    res.json(data);
});
//
app.get("/news/:newsId", async (req, res, next) => {
    console.log("/news/:newsId => ", req.params.newsId);
    let [data] = await pool.query("SELECT * FROM news WHERE news_id=? ", [
        req.params.newsId,
    ]);
    res.json(data);
});
// 會員部分路由
app.get("/api", checkLogin, async (req, res, next) => {
    // if(req.session.member){
    console.log(req.session.member);
    let [data] = await pool.query("SELECT * FROM users WHERE users_id=? ", [
        req.session.member.id,
    ]);
    res.json(data);
});
// 授權路由
const authRouter = require("./routers/authRouter");
app.use("/api/auth", authRouter);

// 會員登入路由
const memberRouter = require("./routers/memberRouter");
app.use("/api/members", memberRouter);

// 會員資料檢視
app.get("/users/:usersId", async (req, res, next) => {
    console.log("/users/:usersId => ", req.params.usersId);
    let [data] = await pool.query("SELECT * FROM users WHERE users_id=? ", [
        req.params.usersId,
    ]);
    res.json(data);
});
// 更改會員資料
app.put("/users/:usersId", async (req, res, next) => {
    console.log("/users/:usersId TO upload ", req.params.usersId);
    let [data] = await pool.query(
        `UPDATE users SET users_name = ? , users_account = ? , users_email = ? ,users_phone = ? WHERE users_id = ?`,
        [
            req.body.username,
            req.body.account,
            req.body.email,
            req.body.phone,
            req.body.usersId,
        ]
    );
    console.log(req.body);
    res.json(data);
});

// 展覽消息
app.get("/news", async (req, res, next) => {
    console.log("這裡是 /news");
    let [data] = await pool.query("SELECT * FROM news");
    res.json(data);
});
app.get("/news/:newsId", async (req, res, next) => {
    console.log("/news/:newsId => ", req.params.newsId);
    let [data] = await pool.query("SELECT * FROM news WHERE news_id=? ", [
        req.params.newsId,
    ]);
    res.json(data);
});
// 空間
app.get("/space", async (req, res, next) => {
    console.log("這裡是 /space");
    let [data] = await pool.query("SELECT * FROM space");
    res.json(data);
});
app.get("/space/:spaceId", async (req, res, next) => {
    console.log("/space/:spaceId => ", req.params.spaceId);
    let [data] = await pool.query("SELECT * FROM space WHERE space_id=? ", [
        req.params.spaceId,
    ]);
    res.json(data);
});
// 藝術家頁面
app.get("/artist", async (req, res, next) => {
    console.log("這裡是 /artist");
    let [data] = await pool.query(
        "SELECT * FROM users WHERE users_valid_role=1"
    );
    res.json(data);
});
app.get("/artist/:artistId", async (req, res, next) => {
    console.log("/artist/:artistId => ", req.params.artistId);
    let [data] = await pool.query(
        "SELECT * FROM users WHERE users_valid_role=1 AND users_id=? ",
        [req.params.artistId]
    );
    res.json(data);
});
app.get("/image/:filename", (req, res) => {
    fs.readFile(`../uploads/${req.params.filename}`, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
    });
});
app.use((req, res, next) => {
    console.log("出現404！");
    res.status(404).send("錯誤代號404，請輸入正確的網址");
    const cors = require("cors");
    app.use(cors());
});

app.listen(3001, () => {
    console.log("Server running at port 3001");
});
