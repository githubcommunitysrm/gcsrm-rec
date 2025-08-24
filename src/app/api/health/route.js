import connectDB from '../../utils/db.js';
import mongoose from 'mongoose';

export async function GET(req) {
	try {
		// Check database connection
		await connectDB();

		// Check if MongoDB is responsive
		const dbState = mongoose.connection.readyState;
		const dbStates = {
			0: 'disconnected',
			1: 'connected',
			2: 'connecting',
			3: 'disconnecting',
		};

		const healthStatus = {
			status: 'ok',
			timestamp: new Date().toISOString(),
			database: {
				status: dbStates[dbState] || 'unknown',
				name: process.env.DB_NAME || 'Recruitment',
				connected: dbState === 1,
			},
			environment: process.env.NODE_ENV || 'development',
		};

		// If database is not connected, return error status
		if (dbState !== 1) {
			healthStatus.status = 'error';
			return new Response(JSON.stringify(healthStatus), {
				status: 503,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(JSON.stringify(healthStatus), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		const errorStatus = {
			status: 'error',
			timestamp: new Date().toISOString(),
			error: error.message,
			database: {
				status: 'error',
				connected: false,
			},
		};

		return new Response(JSON.stringify(errorStatus), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
