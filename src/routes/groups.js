const express=require('express')
const {postGroupSchema,patchGroupSchema}=require('../controllers/groups/schemas')
const validate=require('../shared/validation')
const {postGroup, getGroup, showGroup, getGroupStudents}=require('../controllers/groups')
const {isLogin,hasRole}=require('../shared/auth')
const router=express.Router()

const mPostGroup=[isLogin,validate(postGroupSchema)]
const mGetGroup=[isLogin]
const mShowGroup=[isLogin]


router.post('/groups',mPostGroup,postGroup)
router.get('/groups',mGetGroup,getGroup)
router.get('/groups_students',getGroupStudents)
router.get('/groups/:id',mShowGroup,showGroup)

module.exports=router