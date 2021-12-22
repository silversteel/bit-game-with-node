const rentManagementModel = require('../models/rentManagementModel');
const { v4: uuidv4 } = require('uuid');

// Book Rent List View 
// Rent List View

async function create(req, res) {
    try {
        let { rent_date, id_membership } = req.body;
        let id_rent = uuidv4();
        const checkIsActivated = await rentManagementModel.findByIdMembershipIsActivated(id_membership);
        if (checkIsActivated.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Can\'t input new rent for member that haven\'t return the book yet!',
            });
        } else {
            const result = await rentManagementModel.insert(id_rent, rent_date, id_membership);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Rent Book successfully created!"
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
        const { code } = req.body;
        const checkRentManagement = await rentManagementModel.findById(code);
        if (checkRentManagement.rowCount > 0) {
            const result = await rentManagementModel.remove(code);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Rent Book successfully deleted!"
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
        const response = await rentManagementModel.findAllOrderBy(bookCode, title, publisher, orderBy, asc);
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

async function rentListView(req, res) {
    try {
        let { bookCode, title, publisher, orderBy, asc } = req.body;
        asc = asc ? "ASC" : "DESC";
        const response = await rentManagementModel.findAllOrderBy(bookCode, title, publisher, orderBy, asc);
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

async function bookRentListView(req, res) {
    try {
        let { bookCode, title, publisher, orderBy, asc } = req.body;
        asc = asc ? "ASC" : "DESC";
        const response = await rentManagementModel.findAllOrderBy(bookCode, title, publisher, orderBy, asc);
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
    remove,
    readAll,
    bookRentListView,
    rentListView
}