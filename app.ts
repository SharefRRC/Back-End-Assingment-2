import express from 'express';
import morgan from 'morgan';
import ticketRoutes from './src/api/v1/routes/ticketRoutes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', ticketRoutes);

export default app;