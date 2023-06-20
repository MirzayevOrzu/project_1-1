const express = require('express')
const { postGroupSchema, patchGroupSchema } = require('../controllers/groups/schemas')
const validate = require('../shared/validation')
const { isLogin, hasRole } = require('../shared/auth')
const {
    postGroup,
    getGroup,
    showGroup,
    getGroupStudents,
    postGroupStudent,
    deleteGroupStudent,
    deleteGroup
}= require('../controllers/groups')


const router = express.Router()

const mPostGroup = [isLogin, hasRole(['super_admin', 'admin']), validate(postGroupSchema)]
const mGetGroup = [isLogin]
const mShowGroup = [isLogin]
const mDeleteGroup = [isLogin, hasRole(['super_admin', 'admin'])]
const mAddStudent = [isLogin, hasRole(['super_admin', 'admin'])]
const mDeleteStudent = [isLogin, hasRole(['super_admin', 'admin'])]



router.post('/groups', mPostGroup, postGroup)
router.get('/groups', mGetGroup, getGroup)
router.get('/groups_students', getGroupStudents)
router.get('/groups/:id', mShowGroup, showGroup)
router.delete('/groups/:id', mDeleteGroup, deleteGroup)

router.post('/groups/:id/students/:student_id', mAddStudent, postGroupStudent)
router.delete('/groups/:id/students/:student_id', mDeleteStudent, deleteGroupStudent)

module.exports = router