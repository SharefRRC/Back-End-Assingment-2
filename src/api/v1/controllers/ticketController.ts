import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../constants/httpStatus';

import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  getTicketUrgencyById,
  updateTicket
} from '../services/ticketService';

const sendNotFound = (res: Response): void => {
  res
    .status(HTTP_STATUS.NOT_FOUND)
    .json({ message: 'Ticket not found' });
};

const sendBadRequest = (
  res: Response,
  error: unknown
): void => {
  res.status(HTTP_STATUS.BAD_REQUEST).json({
    message: (error as Error).message
  });
};

const getNumericId = (
  value: string
): number | null => {
  const id = Number(value);

  return Number.isNaN(id) ? null : id;
};

export const getHealth = (
  _req: Request,
  res: Response
): void => {
  res.status(HTTP_STATUS.OK).json({
    status: 'ok',
    message: 'Support Ticket API is running'
  });
};

export const handleGetAllTickets = (
  _req: Request,
  res: Response
): void => {
  res
    .status(HTTP_STATUS.OK)
    .json(getAllTickets());
};

export const handleGetTicketById = (
  req: Request,
  res: Response
): void => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    sendNotFound(res);
    return;
  }

  const ticket = getTicketById(id);

  if (!ticket) {
    sendNotFound(res);
    return;
  }

  res.status(HTTP_STATUS.OK).json(ticket);
};

export const handleCreateTicket = (
  req: Request,
  res: Response
): void => {
  try {
    const ticket = createTicket(req.body);

    res
      .status(HTTP_STATUS.CREATED)
      .json(ticket);
  } catch (error) {
    sendBadRequest(res, error);
  }
};

export const handleUpdateTicket = (
  req: Request,
  res: Response
): void => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    sendNotFound(res);
    return;
  }

  try {
    const ticket = updateTicket(
      id,
      req.body
    );

    if (!ticket) {
      sendNotFound(res);
      return;
    }

    res.status(HTTP_STATUS.OK).json(ticket);
  } catch (error) {
    sendBadRequest(res, error);
  }
};

export const handleDeleteTicket = (
  req: Request,
  res: Response
): void => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    sendNotFound(res);
    return;
  }

  const deletedTicket = deleteTicket(id);

  if (!deletedTicket) {
    sendNotFound(res);
    return;
  }

  res
    .status(HTTP_STATUS.OK)
    .json(deletedTicket);
};

export const handleGetTicketUrgency = (
  req: Request,
  res: Response
): void => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    sendNotFound(res);
    return;
  }

  const ticketWithUrgency =
    getTicketUrgencyById(id);

  if (!ticketWithUrgency) {
    sendNotFound(res);
    return;
  }

  res
    .status(HTTP_STATUS.OK)
    .json(ticketWithUrgency);
};