const db = require('../../database');

async function insert([book_code, title, description, publisher, author]) {
    try {
        const result = await db.query('insert into gudang_ilmu_lib.book(code, title, description, publisher, author) values($1, $2, $3, $4, $5)', [book_code, title, description, publisher, author]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(customer_id, username, fullname, phone_number, email, id_number, gender, address, is_primary, updated_by) {
    try {
        const result = await db.query(
            `'with disable_all_secondary AS (update celine.customer set is_primary = false 
                where username = $2 and $9 = true) update celine.customer set username = $2, fullname = $3, 
            phone_number = $4, email = $5, id_number = $6, gender = $7, address = $8, is_primary = $9, 
            updated_by = $10, updated = now() where customer_id = $1'`, [customer_id, username, fullname, phone_number, email, id_number, gender, address, is_primary, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function remove(code, updated_by) {
    try {
        const result = await db.query('update gudang_ilmu_lib.book set is_deleted = true, changed_date = now(), changed_by = $2, deleted_date = $now(), deleted_by = $2 where user_id = $1', [user_id, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}


async function findAllOrderBy(bookCode, title, publisher, orderBy, asc) {
    try {
        const result = await db.query('select * from gudang_ilmu_lib.book where code LIKE %$1% , title LIKE %$2% , publisher LIKE %$3% , order by $4 $5', [bookCode, title, publisher, orderBy, asc]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findById(code) {
    try {
        const result = await db.query('select * from gudang_ilmu_lib.book where code = $1', [code]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

module.exports = {
    insert,
    remove,
    findAllOrderBy,
    findById
}