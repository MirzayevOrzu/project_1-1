const express = require('express');
const genValidator = require("../shared/validation")
const { isLogin, hasRole } = require('../shared/auth');
const schemas = require('../controllers/directions/schemas');
const {
    getDirections,
    showDirection,
    patchDirection,
    deleteDirection,
    postDirection }
    = require('../controllers/directions');

const router = express.Router()

const mGetDIrections = [isLogin]
const mPostDirection=[isLogin, genValidator(schemas.postDirectionSchema)]
const mPatchDirection=[isLogin, hasRole(['super_admin', 'admin']), genValidator(schemas.patchDirectionSchema)]
const mDeleteDirection=[ isLogin, hasRole(['super_admin', 'admin'])]

router.get('/directions', mGetDIrections, getDirections)
router.get('/directions/:id', isLogin, showDirection)
router.post('/directions', mPostDirection, postDirection)
router.patch('/directions/:id',mPatchDirection ,patchDirection )
router.delete('/directions/:id', deleteDirection)

module.exports = router;