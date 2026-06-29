import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import researchRoutes from './routes/researchRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

// Connect DB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/research', researchRoutes)
app.use('/api/auth', authRoutes)
app.get('/api/diagnostic', async (req, res) => {
  try {
    const symbol = req.query.symbol || 'AAPL';
    const yahooFinance = (await import('yahoo-finance2')).default;
    const test = await yahooFinance.quote(symbol);
    res.json({ success: true, symbol, data: test });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, stack: err.stack });
  }
})
app.get('/api', (req, res) => res.json({ message: 'API is running' }))

// Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))