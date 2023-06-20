const express = require('express')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const db = require('../../db');
const config = require('../../shared/config');
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const postStuff = async (req, res) => {
    console.log('salom');
    try {
        const { ...changes } = req.body
        changes.password = await bcrypt.hash(changes.password, 10)
        const result = await db('stuff').insert(
            { ...changes })
            .returning('*')
        console.log(result)
        res.status(201).json({
            stuff: result[0]
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getStuff=async(req,res)=>{
    try{
        const {role,q, limit = 5, offset = 0, sort_by = 'id', sort_order = 'desc'}=req.query

        const dbQuery=db('stuff').select('id','first_name','last_name','role','username')
        if(role){
            dbQuery.where({role})
        }
        if(q){
            dbQuery.whereILike('firstname',`%{q}`).orWhereILike('last_name',`%${q}`)
        }

        dbQuery.orderBy(sort_by, sort_order)
        dbQuery.limit(limit).offset(offset)

        const stuff=await dbQuery;
        res.status(200).json({
            stuff,
            pageInfo: {
              total: total.length,
              limit,
              offset
            }
        })

    }


    catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const loginStuff = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existing = await db('stuff').where({ username }).select('id', 'password', 'role').first()
        if (!existing) {
            return res.status(401).json({
                error: "Username yoki password xato"
            })
        }
        const comparePassword=await bcrypt.compare(password,existing.password)
        console.log('1dan otdi',comparePassword);
        if (!comparePassword) {
            return res.status(401).json({
                error: "Username yoki password xato"
            })
        }
        const token = jwt.sign({ id: existing.id, role: existing.role },config.jwt.secret)

        res.status(200).json({
            token
        })

    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const showStuff = async (req, res) => {
    try {
      const { id } = req.params;
      const stuff = await db('stuff')
        .select('id', 'first_name', 'last_name', 'role', 'username')
        .where({ id })
        .first();
  
      if (!stuff) {
        return res.status(404).json({
          error: 'Xodim topilmadi.',
        });
      }
  
      res.status(200).json({
        stuff,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const patchStuff = async (req, res) => {
    try {
      const { ...changes } = req.body;
      const { id } = req.params;
  
      const existing = await db('stuff').where({ id }).first();
  
      if (!existing) {
        return res.status(404).json({
          error: `${id} idli xodim topilmadi.`,
        });
      }
      if(existing.password){
        changes.password = await bcrypt.hash(changes.password, 10)
      }
      const updated = await db('stuff')
        .where({ id })
        .update({ ...changes })
        .returning(['id', 'first_name', 'last_name', 'role', 'username']);
  
      res.status(200).json({
        updated: updated[0],
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteStuff = async (req, res) => {
    try {
      const { id } = req.params;
  
      const existing = await db('stuff').where({ id }).first();
  
      if (!existing) {
        return res.status(404).json({
          error: `${id} idli xodim topilmadi.`,
        });
      }
  
      const deleted = await db('stuff')
        .where({ id })
        .delete()
        .returning(['id', 'first_name', 'last_name', 'role', 'username']);
  
      res.status(200).json({
        deleted: deleted[0],
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };
  
module.exports = {
    postStuff,
    getStuff,
    loginStuff,
    showStuff,
    deleteStuff,
    patchStuff
}
