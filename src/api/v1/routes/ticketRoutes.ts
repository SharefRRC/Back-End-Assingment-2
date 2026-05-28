import { Router } from 'express';
import {
  getHealth,
  handleCreateTicket,
  handleDeleteTicket,
  handleGetAllTickets,
  handleGetTicketById,
  handleGetTicketUrgency,
  handleUpdateTicket
} from '../controllers/ticketController';

const router = Router();

router.get('/health', getHealth);
router.get('/tickets', handleGetAllTickets);
router.get('/tickets/:id', handleGetTicketById);
router.post('/tickets', handleCreateTicket);
router.put('/tickets/:id', handleUpdateTicket);
router.delete('/tickets/:id', handleDeleteTicket);
router.get('/tickets/:id/urgency', handleGetTicketUrgency);

export default router;