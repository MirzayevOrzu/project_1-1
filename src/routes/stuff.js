const express = require('express')
const controllers = require('../controllers/stuff')
const validate = require('../shared/validation')
const schema = require('../controllers/stuff/schemas')
const tekshiruv = require('../shared/auth')
const router = express.Router()

router.post('/stuff',  validate(schema.postStuffSchema), controllers.postStuff)
router.post('/login', controllers.loginStuff)
router.get('/stuff', tekshiruv.isLogin, controllers.getStuff)
router.get('/stuff/:id', tekshiruv.isLogin, controllers.showStuff)
router.delete('/stuff/:id', tekshiruv.isLogin, tekshiruv.hasRole(['super_admin', 'admin']),controllers.deleteStuff)
router.patch('/stuff/:id', tekshiruv.isLogin, tekshiruv.hasRole(['super_admin', 'admin']), validate(schema.patchStuffSchema), controllers.patchStuff)

module.exports = router