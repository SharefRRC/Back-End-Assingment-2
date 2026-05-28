import request from 'supertest';
import app from '../app';

describe('Ticket Routes', () => {
  it('should return health check status', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('should return all tickets', async () => {
    const response = await request(app).get('/api/v1/tickets');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return a ticket by id', async () => {
    const response = await request(app).get('/api/v1/tickets/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should return 404 for missing ticket', async () => {
    const response = await request(app).get('/api/v1/tickets/9999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Ticket not found');
  });

  it('should create a new ticket', async () => {
    const response = await request(app).post('/api/v1/tickets').send({
      title: 'New issue',
      description: 'A new support issue',
      priority: 'low'
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New issue');
    expect(response.body.status).toBe('open');
  });

  it('should reject invalid create ticket requests', async () => {
    const response = await request(app).post('/api/v1/tickets').send({
      title: 'Broken create'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Missing required field: description');
  });

  it('should update a ticket', async () => {
    const response = await request(app).put('/api/v1/tickets/1').send({
      status: 'in-progress'
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('in-progress');
  });

  it('should delete a ticket', async () => {
    const createResponse = await request(app).post('/api/v1/tickets').send({
      title: 'Delete me',
      description: 'Temporary ticket',
      priority: 'medium'
    });

    const deleteResponse = await request(app).delete(`/api/v1/tickets/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.id).toBe(createResponse.body.id);
  });
});