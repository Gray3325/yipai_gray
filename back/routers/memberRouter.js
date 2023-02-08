const express = require('express');
const router = express.Router();
const pool = require("../utils/db");
const { checkLogin } = require('../middlewares/authMiddleware');
// 圖片上傳的套件 https://www.npmjs.com/package/multer
const multer = require('multer');
const path = require('path');
// 設定圖片存哪裡: 位置跟名稱
const storage = multer.diskStorage({
  // 先手動建立好檔案夾 public/uploads
  destination: function (req, file, cb) {
    // path.join: 避免不同的作業系統之間 / 或 \
    // __dirname 目前檔案所在的目錄路徑
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  // 圖片名稱
  filename: function (req, file, cb) {
    console.log('multer storage', file);
    // { 回傳的資料格式
    //   fieldname: 'photo',
    //   originalname: 'AI-replace.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg'
    // }
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
    // uuid https://www.npmjs.com/package/uuid
  },
});
// 真正在處理上傳
const uploader = multer({
  storage: storage,
  // 圖片格式的 validation
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
      cb(new Error('上傳圖片格式錯誤'), false);
    } else {
      cb(null, true);
    }
  },
  // 限制檔案的大小
  limits: {
    // 1k = 1024 => 200k 200x1024
    fileSize: 200 * 1024, // 204800
  },
});


// GET /api/members
router.get('/', checkLogin, (req, res, next) => {
  // 能夠通過 checkLogin 中間件，表示一定一定有 req.session.member -> 一定是登入後
  res.json(req.session.member);
});
// GET /api/members/orders 使用者的訂單
router.get('/orders', checkLogin, async(req, res, next) => {
  // 能夠通過 checkLogin 中間件，表示一定一定有 req.session.member -> 一定是登入後
  // 安心地使用 req.session.member.id 去資料庫拿這個 id 的訂單
  let [data] = await pool.query("SELECT * FROM user_order WHERE user_id=?",[req.session.member.users_id]);
  res.json(data);
});
// GET  /api/members/userData
router.get("/userData",checkLogin, async (req, res, next) => {
  let [data] = await pool.query("SELECT user_imageHead,user_imagePage,users_name,users_account,users_main_product,users_aside_picture,users_phone,users_email,users_slogan,users_introduce,users_city,users_township,users_street FROM users WHERE users_valid_role=0 && users_id=? ", [
    req.session.member.users_id,
  ]);
  res.json(data);
});
//GET  /api/members/artistData
router.get("/artistData",checkLogin, async (req, res, next) => {
  let [data] = await pool.query("SELECT user_imageHead,user_imagePage,users_name,users_account,users_main_product,users_aside_picture,users_phone,users_email,users_slogan,users_introduce,users_city,users_township,users_street FROM users WHERE users_valid_role=1 && users_id=? ", [
    req.session.member.users_id,
  ]);
  res.json(data);
});

// 更新買家資料
// PUT /api/members/userData
router.put("/userData",checkLogin,uploader.single('imageHead'), async (req, res, next) => {
  // 允許使用者不上傳圖片，所以要先檢查一下使用者到底有沒有上傳
  const filename = req.file ? path.join('uploads', req.file.filename) : '';
  console.log("/users/:usersId TO upload ", req.session.member.users_id,filename);
  
  let [data] = await pool.execute(
      "UPDATE users SET users_name = ? , users_account = ? , users_email = ? ,users_phone = ? ,user_imageHead=? WHERE  users_valid_role=0 && users_id = ?",
      [
          req.body.username,
          req.body.account,
          req.body.email,
          req.body.phone,
          filename,
          req.session.member.users_id,
      ]
  );
  console.log(req.body,req.file.filename);
  res.json(data);
});

// 藝術家更新
// PUT /api/members/artistData
router.put("/artistData",checkLogin, async (req, res, next) => {
  // console.log("/users/:usersId TO upload ", req.params.usersId);
  let [data] = await pool.query(
      "UPDATE users SET users_name = ? , users_account = ? ,users_phone = ? WHERE users_valid_role=1 && users_id = ?",
      [
          req.body.username,
          req.body.account,
          // req.body.email,
          req.body.phone,
          req.body.usersId,
      ]
  );
  console.log(req.body);
  res.json(data);
});
module.exports = router;
