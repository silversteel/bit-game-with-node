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

async function update(book_code, title, description, publisher, author, updated_by) {
    try {
        const result = await db.query(
            `update gudang_ilmu_lib.book set title = $2, description = $3, publisher = $4, author = $5 where code = $1 `, [book_code, title, description, publisher, author, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function remove(code, updated_by) {
    try {
        const result = await db.query('update gudang_ilmu_lib.book set is_deleted = true, changed_date = now(), changed_by = $2, deleted_date = $now(), deleted_by = $2 where code = $1', [code, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}


async function findAllOrderBy(book_code, title, publisher, orderBy, asc) {
    try {
        const result = await db.query('select * from gudang_ilmu_lib.book where code LIKE %$1% , title LIKE %$2% , publisher LIKE %$3% , order by $4 $5', [book_code, title, publisher, orderBy, asc]);
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