const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../db');
const config = require('../../shared/config');
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const postStudent = async (req, res) => {
  console.log('salom', req.body);
  try {
    const { first_name, last_name } = req.body
    const result = await db('students').insert(
      {
        first_name,
        last_name
      }).returning('*')
    res.status(201).json({
      students: result[0]
    })
  }
  catch (error) {
    console.log('xasas');
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
const getStudent = async (req, res) => {
  try {
    const { q, limit = 5, offset = 0, sort_by = 'id', sort_order = 'desc' } = req.query

    const dbQuery = db('students').select('id', 'first_name', 'last_name');
    const total = await dbQuery.clone().count().groupBy('id');

    if (q) {
      dbQuery.whereILike('first_name', `%${q}%`)
      .orWhereILike('last_name',`%${q}%`)
    }

    dbQuery.orderBy(sort_by, sort_order)
    dbQuery.limit(limit).offset(offset)

    const students = await dbQuery;

    res.status(200).json({
      students,
      pageInfo: {
        total: total.length,
        limit,
        offset
      }
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
const showStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await db('students')
      .select('id', 'first_name', 'last_name')
      .where({ id })
      .first();

    if (!student) {
      return res.status(404).json({
        error: 'Student topilmadi.',
      });
    }

    res.status(200).json({
      student
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
const patchStudent = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const { id } = req.params;

    const existing = await db('students').where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} idli Student topilmadi.`,
      });
    }

    const updated = await db('students')
      .where({ id })
      .update({
         first_name,
         last_name
         })
      .returning(['id', 'first_name', 'last_name']);

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
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await db('students').where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} idli student topilmadi.`,
      });
    }

    const deleted = await db('students')
      .where({ id })
      .delete()
      .returning(['id', 'first_name', 'last_name']);

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
  postStudent,
  getStudent,
  showStudent,
  patchStudent,
  deleteStudent
}
