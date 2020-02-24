const express = require('express')
const router = express.Router()
const path = require('path');
//来到首页
router.get('/canvas', async(req, res) => {
    res.render("canvas.html")
});

//来到详情
router.get('/rain', async(req, res) => {
    res.render("rain.html")
});

//来到注册界面
router.get('/chocolate', (req, res) => {
    res.render('chocolate.html')
});

//来到登录界面
router.get('/bodyshake', (req, res) => {
    res.render('bodyshake.html')
});

//来到管理界面
router.get('/shine', (req, res) => {
    var user = req.session.user;
    res.render('shine.html', { user: user })
});

module.exports = router;