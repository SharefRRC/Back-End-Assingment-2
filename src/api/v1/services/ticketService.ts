import { tickets } from '../../../data/tickets';
import {
  CreateTicketInput,
  Ticket,
  TicketPriority,
  TicketStatus,
  TicketWithUrgency,
  UpdateTicketInput
} from './ticket.types';

const validPriorities: TicketPriority[] = [
  'critical',
  'high',
  'medium',
  'low'
];

const validStatuses: TicketStatus[] = [
  'open',
  'in-progress',
  'resolved'
];

const requireField = (
  value: unknown,
  field: string
): void => {
  if (!value) {
    throw new Error(`Missing required field: ${field}`);
  }
};

const isValidPriority = (
  priority: TicketPriority
): boolean => validPriorities.includes(priority);

const isValidStatus = (
  status: TicketStatus
): boolean => validStatuses.includes(status);

export const getAllTickets = (): Ticket[] => tickets;

export const getTicketById = (
  id: number
): Ticket | undefined =>
  tickets.find((ticket) => ticket.id === id);

export const createTicket = (
  input: CreateTicketInput
): Ticket => {
  requireField(input.title, 'title');
  requireField(input.description, 'description');

  if (
    !input.priority ||
    !isValidPriority(input.priority)
  ) {
    throw new Error(
      'Invalid priority. Must be one of critical, high, medium, low'
    );
  }

  const newTicket: Ticket = {
    id: tickets.length
      ? Math.max(
          ...tickets.map((ticket) => ticket.id)
        ) + 1
      : 1,

    title: input.title!,
    description: input.description!,
    priority: input.priority,

    status: 'open',
    createdAt: new Date().toISOString()
  };

  tickets.push(newTicket);

  return newTicket;
};

export const updateTicket = (
  id: number,
  input: UpdateTicketInput
): Ticket | undefined => {
  const ticket = getTicketById(id);

  if (!ticket) {
    return undefined;
  }

  if (
    input.priority &&
    !isValidPriority(input.priority)
  ) {
    throw new Error(
      'Invalid priority. Must be one of critical, high, medium, low'
    );
  }

  if (
    input.status &&
    !isValidStatus(input.status)
  ) {
    throw new Error(
      'Invalid status. Must be one of open, in-progress, resolved'
    );
  }

  Object.assign(ticket, input);

  return ticket;
};

export const deleteTicket = (
  id: number
): Ticket | undefined => {
  const index = tickets.findIndex(
    (ticket) => ticket.id === id
  );

  if (index === -1) {
    return undefined;
  }

  return tickets.splice(index, 1)[0];
};

export const calculateUrgency = (
  ticket: Ticket
): TicketWithUrgency => {
  const baseScores: Record<
    TicketPriority,
    number
  > = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10
  };

  const ageInDays = Math.floor(
    (
      Date.now() -
      new Date(ticket.createdAt).getTime()
    ) /
      (1000 * 60 * 60 * 24)
  );

  const urgencyScore =
    baseScores[ticket.priority] +
    ageInDays * 5;

  let urgencyLevel:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'CRITICAL'
    | 'RESOLVED' = 'LOW';

  if (ticket.status === 'resolved') {
    urgencyLevel = 'RESOLVED';
  } else if (urgencyScore >= 80) {
    urgencyLevel = 'CRITICAL';
  } else if (urgencyScore >= 50) {
    urgencyLevel = 'HIGH';
  } else if (urgencyScore >= 30) {
    urgencyLevel = 'MEDIUM';
  }

  return {
    ...ticket,
    urgencyScore,
    urgencyLevel
  };
};

export const getTicketUrgencyById = (
  id: number
): TicketWithUrgency | undefined => {
  const ticket = getTicketById(id);

  if (!ticket) {
    return undefined;
  }

  return calculateUrgency(ticket);
};