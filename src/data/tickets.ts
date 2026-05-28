import { Ticket } from '../api/v1/services/ticket.types';

export const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Update footer copyright year',
    description: 'Footer still shows 2024',
    priority: 'low',
    status: 'open',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: 'Profile picture upload slow',
    description: 'Upload takes 30 seconds',
    priority: 'medium',
    status: 'open',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: 'Dashboard loading slowly',
    description: 'Dashboard takes 10 seconds to load',
    priority: 'medium',
    status: 'open',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    title: 'Password reset email delayed',
    description: 'Reset emails taking over 30 minutes',
    priority: 'high',
    status: 'open',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    title: 'Export to PDF not working',
    description: 'PDF export fails silently',
    priority: 'high',
    status: 'open',
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 6,
    title: 'Login page not loading',
    description: 'Users report blank screen on login',
    priority: 'critical',
    status: 'open',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 7,
    title: 'Dark mode toggle broken',
    description: "Dark mode doesn't persist after refresh",
    priority: 'medium',
    status: 'resolved',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];