import { calculateUrgency } from '../src/api/v1/services/ticketService';
import { Ticket } from '../src/api/v1/services/ticket.types';

describe('Ticket Service - calculateUrgency', () => {
  it('should return LOW urgency for a new low priority ticket', () => {
    const ticket: Ticket = {
      id: 100,
      title: 'Low ticket',
      description: 'Test',
      priority: 'low',
      status: 'open',
      createdAt: new Date().toISOString()
    };

    const result = calculateUrgency(ticket);

    expect(result.urgencyLevel).toBe('LOW');
    expect(result.urgencyScore).toBe(10);
  });

  it('should return MEDIUM or higher for older medium ticket', () => {
    const ticket: Ticket = {
      id: 101,
      title: 'Medium ticket',
      description: 'Test',
      priority: 'medium',
      status: 'open',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    };

    const result = calculateUrgency(ticket);

    expect(result.urgencyScore).toBeGreaterThanOrEqual(35);
    expect(['MEDIUM', 'HIGH', 'CRITICAL']).toContain(result.urgencyLevel);
  });

  it('should return CRITICAL for old critical ticket', () => {
    const ticket: Ticket = {
      id: 102,
      title: 'Critical ticket',
      description: 'Test',
      priority: 'critical',
      status: 'open',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    const result = calculateUrgency(ticket);

    expect(result.urgencyLevel).toBe('CRITICAL');
    expect(result.urgencyScore).toBe(85);
  });

  it('should return RESOLVED when ticket status is resolved', () => {
    const ticket: Ticket = {
      id: 103,
      title: 'Resolved ticket',
      description: 'Test',
      priority: 'critical',
      status: 'resolved',
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    };

    const result = calculateUrgency(ticket);

    expect(result.urgencyLevel).toBe('RESOLVED');
  });
});