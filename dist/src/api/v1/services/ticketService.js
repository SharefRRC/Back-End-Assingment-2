"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketUrgencyById = exports.calculateUrgency = exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getAllTickets = void 0;
const tickets_1 = require("../../../data/tickets");
const validPriorities = [
    'critical',
    'high',
    'medium',
    'low'
];
const validStatuses = [
    'open',
    'in-progress',
    'resolved'
];
const requireField = (value, field) => {
    if (!value) {
        throw new Error(`Missing required field: ${field}`);
    }
};
const isValidPriority = (priority) => validPriorities.includes(priority);
const isValidStatus = (status) => validStatuses.includes(status);
const getAllTickets = () => tickets_1.tickets;
exports.getAllTickets = getAllTickets;
const getTicketById = (id) => tickets_1.tickets.find((ticket) => ticket.id === id);
exports.getTicketById = getTicketById;
const createTicket = (input) => {
    requireField(input.title, 'title');
    requireField(input.description, 'description');
    if (!input.priority ||
        !isValidPriority(input.priority)) {
        throw new Error('Invalid priority. Must be one of critical, high, medium, low');
    }
    const newTicket = {
        id: tickets_1.tickets.length
            ? Math.max(...tickets_1.tickets.map((ticket) => ticket.id)) + 1
            : 1,
        title: input.title,
        description: input.description,
        priority: input.priority,
        status: 'open',
        createdAt: new Date().toISOString()
    };
    tickets_1.tickets.push(newTicket);
    return newTicket;
};
exports.createTicket = createTicket;
const updateTicket = (id, input) => {
    const ticket = (0, exports.getTicketById)(id);
    if (!ticket) {
        return undefined;
    }
    if (input.priority &&
        !isValidPriority(input.priority)) {
        throw new Error('Invalid priority. Must be one of critical, high, medium, low');
    }
    if (input.status &&
        !isValidStatus(input.status)) {
        throw new Error('Invalid status. Must be one of open, in-progress, resolved');
    }
    Object.assign(ticket, input);
    return ticket;
};
exports.updateTicket = updateTicket;
const deleteTicket = (id) => {
    const index = tickets_1.tickets.findIndex((ticket) => ticket.id === id);
    if (index === -1) {
        return undefined;
    }
    return tickets_1.tickets.splice(index, 1)[0];
};
exports.deleteTicket = deleteTicket;
const calculateUrgency = (ticket) => {
    const baseScores = {
        critical: 50,
        high: 30,
        medium: 20,
        low: 10
    };
    const ageInDays = Math.floor((Date.now() -
        new Date(ticket.createdAt).getTime()) /
        (1000 * 60 * 60 * 24));
    const urgencyScore = baseScores[ticket.priority] +
        ageInDays * 5;
    let urgencyLevel = 'LOW';
    if (ticket.status === 'resolved') {
        urgencyLevel = 'RESOLVED';
    }
    else if (urgencyScore >= 80) {
        urgencyLevel = 'CRITICAL';
    }
    else if (urgencyScore >= 50) {
        urgencyLevel = 'HIGH';
    }
    else if (urgencyScore >= 30) {
        urgencyLevel = 'MEDIUM';
    }
    return {
        ...ticket,
        urgencyScore,
        urgencyLevel
    };
};
exports.calculateUrgency = calculateUrgency;
const getTicketUrgencyById = (id) => {
    const ticket = (0, exports.getTicketById)(id);
    if (!ticket) {
        return undefined;
    }
    return (0, exports.calculateUrgency)(ticket);
};
exports.getTicketUrgencyById = getTicketUrgencyById;
