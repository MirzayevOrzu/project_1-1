const express = require('express')
const db = require('../../db')

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const postGroup = async (req, res) => {
  console.log('k34');
  try {
    const { name, teacher_id = null, assistent_teacher_id = null, direction_id = null } = req.body
    if (teacher_id) {
      const existing = await db('stuff').where({ id: teacher_id }).first()
      console.log(existing, 'teacher');
      if (!existing || (existing.role != 'teacher'))
        return res.status(404).json({
          error: "Bunday idlik teacher MAVJUD EMAS"
        })
    }
    

    if (assistent_teacher_id) {
      const existing = await db('stuff').where({ id: assistent_teacher_id }).first()
      if (!existing || (existing.role != 'assistent_teacher'))
        return res.status(404).json({
          error: "Bunday idlik assistent_teacher MAVJUD EMAS"
        })
    }
    if (direction_id) {
      const existing = await db('directions').where({ id: direction_id }).first()
      if (!existing)
        return res.status(404).json({
          error: "Bunday idlik yo'nalish MAVJUD EMAS"
        })
    }
    const result = await db('groups').insert(
      {
        name,
        teacher_id,
        assistent_teacher_id,
        direction_id
      }
    ).returning('*')
    console.log(result);
    res.status(200).json(
      {
        group: result[0]
      }
    )

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
const getGroup = async (req, res) => {
  try {
    const { q, limit = 5, offset = 0, sort_by = 'id', sort_order = 'desc', direction_id } = req.query
    console.log(direction_id, 'sss');

    const dbQuery = db('groups').select('*');
    const total = await dbQuery.clone().count().groupBy('id');

    if (q) {
      dbQuery.whereILike('name', `%${q}%`)
    }

    if (direction_id) {
      dbQuery.where({ direction_id: parseInt(direction_id) })
    }

    dbQuery.orderBy(sort_by, sort_order)
    dbQuery.limit(limit).offset(offset)

    const groups = await dbQuery;

    res.status(200).json({
      groups,
      pageInfo: {
        total: total.length,
        limit,
        offset
      }
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
 * @param {express.Response} req 
 */
// const showGroup = async (req, res) => {
//     try {
//         const { id } = req.params
//         const group = await db('groups')
//             .leftJoin('stuff as stuff_teacher', 'stuff_teacher.id', 'groups.teacher_id')
//             .leftJoin('stuff as stuff_assistent ', 'stuff_assistent.id', 'groups.assistent_teacher_id')
//             .innerJoin('groups_students', 'groups_students.group_id', 'groups.id')
//             .innerJoin('students', 'groups_students.student_id', 'students.id')
//             .select(
//                 'groups.id',
//                 'groups.name',
//                 'stuff_teacher.id as teacher_id',
//                 db.raw("CONCAT(stuff_teacher.first_name, ' ', stuff_teacher.last_name) as teacher"),
//                 'stuff_assistent.id as assistent_id',
//                 db.raw(
//                     "CONCAT(stuff_assistent.first_name, ' ', stuff_assistent.last_name) as assistent_teacher"
//                 ),
//                 db.raw(
//                     `json_agg(json_build_object(
//              'id', students.id,
//              'first_name', students.first_name, 
//              'last_name', students.last_name
//            )) as students`
//                 )
//             )
//             .where({ 'groups.id': id })
//             .groupBy('groups.id', 'stuff_teacher.id', 'stuff_assistent.id')
//             .first();
//         //  const group=await db('groups')
//         //  .leftJoin('stuff as teacher','teacher.id','groups.teacher_id')
//         //  .leftJoin('stuff as assistent_teacher','assistent_teacher.id','groups.assistent_teacher_id')
//         //  .innerJoin('groups_student','groups_students.group_id','groups.id')
//         //  .innerJoin('students','students.id','groups_students.student_id','students.id')
//         //  .select(
//         //     '*'
//         // 'groups.id',
//         // 'groups.name',
//         // 'teacher.id',
//         // db.raw("CONCAT(teacher.first_name,teacher.last_name)"),
//         // 'assistent_teacher.id',
//         // db.raw("CONCAT(assistent_teacher.first_name,' ',assistent_teacher.last_name)"),
//         // db.raw(
//         //     `json_agg(json_build_object(
//         //     'id', students.id,
//         //     'first_name', students.first_name, 
//         //     'last_name', students.last_name
//         //   )) as students`
//         //   )
//         //   )
//         //   .where({id})
//         //   .groupBy('groups.id', 'stuff_teacher.id', 'stuff_assistent.id')
//         //   .first();
//         if (!group) {
//             return res.status(404).json({
//                 error: 'Bunday guruh mavjud emas',
//             });
//         }
//         res.status(200).json({
//             group
//         })
//     }
//     catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// }

// const showGroup = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const group = await db('groups')
//       .leftJoin('stuff as stuff_teacher', 'stuff_teacher.id', 'groups.teacher_id')
//       .leftJoin('stuff as stuff_assistent ', 'stuff_assistent.id', 'groups.assistent_teacher_id')
//       .leftJoin('groups_students', 'groups_students.group_id', 'groups.id')
//       .leftJoin('students', 'students.id', 'groups_students.student_id')
//       .leftJoin('directions', 'directions.id', 'groups.direction_id')
//       .select(
//         'groups.id',
//         'groups.name',
//         db.raw(`
//         CASE 
//         WHEN groups.direction_id IS NULL THEN NULL
//         ELSE   json_build_object(
//           'id', directions.id,
//           'name', directions.name
//         )
//         END as direction
//         `),
//         db.raw(`
//           CASE
//           WHEN stuff_teacher.id IS NULL THEN NULL
//           ELSE json_build_object(
//             'id', stuff_teacher.id,
//             'first_name', stuff_teacher.first_name,
//             'last_name', stuff_teacher.last_name,
//             'role', stuff_teacher.role,
//             'username', stuff_teacher.username
//           )
//           END as teacher
//           `),
//         db.raw(`
//           CASE
//           WHEN stuff_assistent.id IS NULL THEN NULL
//           ELSE json_build_object(
//             'id', stuff_assistent.id,
//             'first_name', stuff_assistent.first_name,
//             'last_name', stuff_assistent.last_name,
//             'role', stuff_assistent.role,
//             'username', stuff_assistent.username
//           )
//           END as assistent_teacher
//           `),
//         db.raw(`
//           CASE
//           WHEN students.id IS NULL THEN '[]'
//           ELSE json_agg(
//             json_build_object(
//               'id', students.id,
//               'first_name', students.first_name,
//               'last_name', students.last_name
//             )
//           )
//           END as students
//           `)
//       )
//       .where({ 'groups.id': id })
//       .groupBy('groups.id', 'stuff_teacher.id', 'stuff_assistent.id', 'students.id', 'directions.id')
//       .first();

//     if (!group) {
//       return res.status(404).json({
//         error: 'Group not found',
//       });
//     }

//     res.status(201).json({
//       group,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };


const showGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await db('groups')
      .leftJoin('stuff as stuff_teacher', 'stuff_teacher.id', 'groups.teacher_id')
      .leftJoin('stuff as stuff_assistent ', 'stuff_assistent.id', 'groups.assistent_teacher_id')
      .leftJoin('groups_students', 'groups_students.group_id', 'groups.id')
      .leftJoin('students', 'groups_students.student_id', 'students.id')
      .select(
        'groups.id',
        'groups.name',
        db.raw(`
        CASE
        WHEN stuff_teacher.id IS NULL THEN NULL
        ELSE json_build_object(
          'id', stuff_teacher.id,
          'first_name', stuff_teacher.first_name,
          'last_name', stuff_teacher.last_name,
          'role', stuff_teacher.role,
          'username', stuff_teacher.username
        )
        END as teacher
        `),
        db.raw(`
        CASE
        WHEN stuff_assistent.id IS NULL THEN NULL
        ELSE json_build_object(
          'id', stuff_assistent.id,
          'first_name', stuff_assistent.first_name,
          'last_name', stuff_assistent.last_name,
          'role', stuff_assistent.role,
          'username', stuff_assistent.username
        )
        END as assistent
        `),
        db.raw(`
        CASE
        WHEN students.id IS NULL THEN '[]'
        ELSE json_agg(
          json_build_object(
            'id', students.id,
            'first_name', students.first_name,
            'last_name', students.last_name
          )
        )
        END as students
        `)
      )
      .where({ 'groups.id': id })
      .groupBy('groups.id', 'stuff_teacher.id', 'stuff_assistent.id', 'students.id')
      .first();

    if (!group) {
      return res.status(404).json({
        error: 'Group not found',
      });
    }

    res.status(201).json({
      group,
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


const getGroupStudents = async (req, res) => {
  try {
    const { q, limit = 5, offset = 0, sort_by = 'id', sort_order = 'desc' } = req.query

    const dbQuery = db('groups_students').select('*');
    const total = await dbQuery.clone().count().groupBy('id');

    if (q) {
      dbQuery.whereILike('name', `%${q}%`)
    }

    dbQuery.orderBy(sort_by, sort_order)
    dbQuery.limit(limit).offset(offset)

    const groups = await dbQuery;

    res.status(200).json({
      groups,
      pageInfo: {
        total: total.length,
        limit,
        offset
      }
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
const postGroupStudent = async (req, res) => {
  try {
    const { id, student_id } = req.params

    if (id) {
      const existing = await db('groups').where({ id }).first()
      console.log(existing, 'teacher');
      if (!existing)
        return res.status(404).json({
          error: "Bunday idlik guruh MAVJUD EMAS"
        })
    }

    if (student_id) {
      const existing = await db('students').where({ id: student_id }).first()
      console.log(existing, 'teacher');
      if (!existing)
        return res.status(404).json({
          error: "Bunday idlik student MAVJUD EMAS"
        })
    }

    const result = await db('groups_students')
      .insert({
        group_id: id,
        student_id
      })
      .returning('*')
console.log(result);
    res.status(201).json({
      message: `${student_id} lik Student ${id} idlik guruhga qo'shildi`
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
const deleteGroupStudent = async (req, res) => {
  try {
    const { id, student_id } = req.params

    if (id) {
      const existing = await db('groups').where({ id }).first()
      console.log(existing, 'teacher');
      if (!existing)
        return res.status(404).json({
          error: "Bunday idlik guruh MAVJUD EMAS"
        })
    }

    if (student_id) {
      const existing = await db('students').where({ id: student_id }).first()
      console.log(existing, 'teacher');
      if (!existing)
        return res.status(404).json({
          error: "Bunday idlik student MAVJUD EMAS"
        })
    }
    const deleted = await db('groups_students').where({ id }).delete().returning('*');

    res.status(200).json({
      deleted: deleted[0],
    });

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
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await db('groups').where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idle guruh topilmadi`,
      });
    }

    const deleted = await db('groups').where({ id }).delete().returning(['id', 'name']);

    res.status(200).json({
      deleted: deleted[0],
    });

  }
  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}


module.exports = {
  postGroup,
  getGroup,
  showGroup,
  getGroupStudents,
  postGroupStudent,
  deleteGroupStudent,
  deleteGroup
}