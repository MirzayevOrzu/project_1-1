const express = require('express')
const validate = require('../shared/validation')
const schema = require('../controllers/stuff/schemas')
const {isLogin,hasRole} = require('../shared/auth')
const {
    postStuff,
    getStuff,
    loginStuff,
    showStuff,
    deleteStuff,
    patchStuff} = require('../controllers/stuff')


const router = express.Router()

const mPostStuff=[isLogin,hasRole(['super_admin', 'admin']), validate(schema.postStuffSchema)]
const mDeleteStuff=[ isLogin, hasRole(['super_admin', 'admin'])]
const mPatchStuff=[isLogin, hasRole(['super_admin', 'admin']), validate(schema.patchStuffSchema)]


router.post('/stuff', mPostStuff, postStuff)
router.post('/login', loginStuff)
router.get('/stuff', isLogin,getStuff)
router.get('/stuff/:id', isLogin, showStuff)
router.delete('/stuff/:id',mDeleteStuff,deleteStuff)
router.patch('/stuff/:id',mPatchStuff ,patchStuff)

module.exports = router