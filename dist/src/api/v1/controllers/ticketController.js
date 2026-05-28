"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetTicketUrgency = exports.handleDeleteTicket = exports.handleUpdateTicket = exports.handleCreateTicket = exports.handleGetTicketById = exports.handleGetAllTickets = exports.getHealth = void 0;
const httpStatus_1 = require("../../../constants/httpStatus");
const ticketService_1 = require("../services/ticketService");
const sendNotFound = (res) => {
    res
        .status(httpStatus_1.HTTP_STATUS.NOT_FOUND)
        .json({ message: 'Ticket not found' });
};
const sendBadRequest = (res, error) => {
    res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
        message: error.message
    });
};
const getNumericId = (value) => {
    if (Array.isArray(value)) {
        return null;
    }
    const id = Number(value);
    return Number.isNaN(id)
        ? null
        : id;
};
const getHealth = (_req, res) => {
    res.status(httpStatus_1.HTTP_STATUS.OK).json({
        status: 'ok',
        uptime: process.uptime(),
        message: 'Support Ticket API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
};
exports.getHealth = getHealth;
const handleGetAllTickets = (_req, res) => {
    res
        .status(httpStatus_1.HTTP_STATUS.OK)
        .json((0, ticketService_1.getAllTickets)());
};
exports.handleGetAllTickets = handleGetAllTickets;
const handleGetTicketById = (req, res) => {
    const id = getNumericId(req.params.id);
    if (id === null) {
        sendNotFound(res);
        return;
    }
    const ticket = (0, ticketService_1.getTicketById)(id);
    if (!ticket) {
        sendNotFound(res);
        return;
    }
    res.status(httpStatus_1.HTTP_STATUS.OK).json(ticket);
};
exports.handleGetTicketById = handleGetTicketById;
const handleCreateTicket = (req, res) => {
    try {
        const ticket = (0, ticketService_1.createTicket)(req.body);
        res
            .status(httpStatus_1.HTTP_STATUS.CREATED)
            .json(ticket);
    }
    catch (error) {
        sendBadRequest(res, error);
    }
};
exports.handleCreateTicket = handleCreateTicket;
const handleUpdateTicket = (req, res) => {
    const id = getNumericId(req.params.id);
    if (id === null) {
        sendNotFound(res);
        return;
    }
    try {
        const ticket = (0, ticketService_1.updateTicket)(id, req.body);
        if (!ticket) {
            sendNotFound(res);
            return;
        }
        res.status(httpStatus_1.HTTP_STATUS.OK).json(ticket);
    }
    catch (error) {
        sendBadRequest(res, error);
    }
};
exports.handleUpdateTicket = handleUpdateTicket;
const handleDeleteTicket = (req, res) => {
    const id = getNumericId(req.params.id);
    if (id === null) {
        sendNotFound(res);
        return;
    }
    const deletedTicket = (0, ticketService_1.deleteTicket)(id);
    if (!deletedTicket) {
        sendNotFound(res);
        return;
    }
    res
        .status(httpStatus_1.HTTP_STATUS.OK)
        .json(deletedTicket);
};
exports.handleDeleteTicket = handleDeleteTicket;
const handleGetTicketUrgency = (req, res) => {
    const id = getNumericId(req.params.id);
    if (id === null) {
        sendNotFound(res);
        return;
    }
    const ticketWithUrgency = (0, ticketService_1.getTicketUrgencyById)(id);
    if (!ticketWithUrgency) {
        sendNotFound(res);
        return;
    }
    res
        .status(httpStatus_1.HTTP_STATUS.OK)
        .json(ticketWithUrgency);
};
exports.handleGetTicketUrgency = handleGetTicketUrgency;
