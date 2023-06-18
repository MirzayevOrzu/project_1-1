const express = require('express')
const validate = require('../shared/validation')
const schema = require('../controllers/student/schemas')
const tekshiruv = require('../shared/auth')
const {
    postStudent,
    getStudent,
    showStudent,
    patchStudent,
    deleteStudent
} 
= require('../controllers/student')


const router = express.Router()

const mPostStudent=[tekshiruv.isLogin,tekshiruv.hasRole(['super_admin','admin']),
validate(schema.postStudentSchema)]
const mGetStudent=[tekshiruv.isLogin]
const mgetSHowStudent=[tekshiruv.isLogin]
const mPatchStudent=[tekshiruv.isLogin,validate(schema.patchStudentSchema)]
const mDeleteStudent=[tekshiruv.isLogin,tekshiruv.hasRole(['super_admin','admin'])]

router.post('/student',mPostStudent,postStudent)
router.get('/student',mGetStudent,getStudent)
router.get('/student/:id',mgetSHowStudent,showStudent)
router.patch('/student/:id',mPatchStudent,patchStudent)
router.delete('/student/:id',mDeleteStudent,deleteStudent)

module.exports = router