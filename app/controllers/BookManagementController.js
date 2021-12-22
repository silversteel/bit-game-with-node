const bookManagementModel = require('../models/BookManagementModel');
import { v1 as uuidv1 } from 'uuid';

async function create(req, res) {
    try {
        let { book_code, title, publisher, author, description } = req.body;
        let id_book = uuidv1();
        let is_deleted = false;
        if (!code) {
            code = uuidv1();
        }
        const checkBookManagement = await bookManagementModel.findById(book_code);
        if (checkBookManagement.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Book code is already exists!',
            });
        } else {
            const result = await bookManagementModel.insert(id_book, book_code, title, publisher, author, description, is_deleted);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Book successfully created!"
                });
            }
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function remove(req, res) {
    try {
        const { book_code } = req.body;
        const checkBookManagement = await bookManagementModel.findById(book_code);
        if (checkBookManagement.rowCount > 0) {
            const result = await bookManagementModel.remove(book_code);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Book successfully deleted!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Book not found!"
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function update(req, res) {
    try {
        const { book_code, title, description, publisher, author, updated_by } = req.body;
        const checkBookManagement = await bookManagementModel.findById(code);
        if (checkBookManagement.rowCount > 0) {
            const result = await bookManagementModel.update(book_code, title, description, publisher, author, updated_by);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Book successfully updated!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Book not found!"
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function readAll(req, res) {
    try {
        let { bookCode, title, publisher, orderBy, asc } = req.body;
        asc = asc ? "ASC" : "DESC";
        const response = await bookManagementModel.findAllOrderBy(bookCode, title, publisher, orderBy, asc);
        if (response.rowCount > 0) {
            res.status(200);
            res.json(response.rows);
        } else {
            res.status(200);
            res.json([]);
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

module.exports = {
    create,
    update,
    remove,
    readAll
}