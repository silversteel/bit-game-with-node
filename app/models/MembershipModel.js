const db = require('../../database');

async function insert(id_membership, nik, name, birth_date, birth_place, address, last_rent, is_activated, created_by) {
  try {
    const result = await db.query('insert into gudang_ilmu_lib.membership(id_membership, nik, name, birth_date, birth_place, address, last_rent, is_activated, created_by) values($1, $2, $3, $4, $5, $6, $7, $8, $1)', [id_membership, nik, name, birth_date, birth_place, address, last_rent, is_activated, created_by]);
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

async function update(id_membership, nik, name, birth_date, birth_place, address, last_rent, is_activated, changed_by) {
  try {
    const result = await db.query("update gudang_ilmu_lib.membership set nik = $2, name = $3, birth_date = to_date($4, 'YYYY-MM-DD'), birth_place = $5, address = $6, last_rent = $7, updated_by = $8, updated = now() where employee_id = $1", [employee_id, username, fullname, phone_number, address, is_show, profile_image, updated_by]);
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

module.exports = {
  insert,
  update
}