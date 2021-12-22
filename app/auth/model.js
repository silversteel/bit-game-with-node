const db = require('../../database');

async function checkUser(username) {
  try {
    const result = await db.query('select * from gudang_ilmu_lib.user where username = $1', [username]);
    return result;
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function getUser(username, password) {
  try {
    const result = await db.query('select * from gudang_ilmu_lib.user where username = $1 and password = $2 and is_activated = true', [username, password]);
    return result;
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function createUser(username, password, id_user) {
  try {
    const result = await db.query('insert into gudang_ilmu_lib.user(id_user, username, password, created_by) values($1, $2, $3, $1)', [id_user, username, password]);
    return result;
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function updateUser(id_user, username, password) {
  try {
    let query = "update gudang_ilmu_lib.user set changed_date = now(), changed_by = $1";
    let params =  [id_user];

    if (username) {
      let totalParams = parseInt(params.length) + 1;
      query += " username = $"+totalParams+",";
      params.push(password);
    }
    if (password) {
      let totalParams = parseInt(params.length) + 1;
      query += " password = $"+totalParams+",";
      params.push(password);
    }
    if (!username && !password) {
      throw new Error('all field is empty!');
    }
    query += " where id_user = $1";

    const result = await db.query(query, params);
    return result;
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function deleteUser(id_user, deleted_by) {
  try {
    const result = await db.query('update gudang_ilmu_lib.user set is_deleted = true, deleted_date = now(), deleted_by = $2 where id_user = $1', [id_user, deleted_by]);
    return result;
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function updateToken(id_user, token) {
  try {
    const result = await db.query('update gudang_ilmu_lib.user set last_login = now(), token = $2 where id_user = $1 returning id_user, username, token', [id_user, token]);
    return result;
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function checkToken(token) {
  try {
    const result = await db.query('select 1 from gudang_ilmu_lib.user where token = $1', [token]);
    return result;
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

module.exports = {
  getUser,
  createUser,
  checkUser,
  updateUser,
  updateToken,
  checkToken,
  deleteUser
}