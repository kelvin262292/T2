import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: '3D E-Commerce Backend API is running!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Products API endpoints (placeholder)
app.get('/api/products', (req, res) => {
  // TODO: Implement product fetching from database
  res.json({
    message: 'Products endpoint',
    products: [
      {
        id: '1',
        name: 'Sample 3D Product',
        description: 'A sample product for 3D visualization',
        price: 99.99,
        modelUrl: '/models/sample.glb',
        imageUrl: '/images/sample.jpg'
      }
    ]
  });
});

// Users API endpoints (placeholder)
app.get('/api/users', (req, res) => {
  // TODO: Implement user management
  res.json({ message: 'Users endpoint' });
});

// Orders API endpoints (placeholder)
app.get('/api/orders', (req, res) => {
  // TODO: Implement order management
  res.json({ message: 'Orders endpoint' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on port ${PORT}`);
  console.log(`📍 API available at: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;