const rentManagementModel = require('../models/rentManagementModel');
import { v1 as uuidv1 } from 'uuid';

// Book Rent List View 
// Rent List View

async function create(req, res) {
    try {
        let { id_rent, rent_date, service_name, price } = req.body;
        const checkDetailOrder = await rentManagementModel.findById(order_id, service_id);
        if (checkDetailOrder.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Detail order id already exists!',
            });
        } else {
            const result = await rentManagementModel.insert(order_id, service_id, service_name, price);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Detail Order successfully created!"
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
        const checkBookManagement = await bookManagementModel.findById(code);
        if (checkBookManagement.rowCount > 0) {
            const result = await bookManagementModel.remove(code);
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
    remove,
    readAll
}