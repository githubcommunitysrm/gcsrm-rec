// Simple script to test database connectivity
// Run this with: node test-db-connection.js

import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // Load .env variables

async function testConnection() {
	try {
		console.log('Testing MongoDB connection...');

		await mongoose.connect(process.env.MONGO_URI, {
			dbName: process.env.DB_NAME || 'Recruitment',
		});

		console.log('✅ MongoDB connected successfully!');
		console.log('Database Name:', process.env.DB_NAME);

		// Test collection access
		const collections = await mongoose.connection.db
			.listCollections()
			.toArray();
		console.log(
			'Available collections:',
			collections.map((c) => c.name)
		);

		// Check if recruitment25 collection exists or create it
		const ParticipantSchema = new mongoose.Schema({
			name: String,
			email: String,
			registrationNumber: String,
			phone: String,
			year: String,
			domain: String,
			status: { type: String, default: 'registered' },
		});

		const Participant = mongoose.model(
			'ParticipantTest',
			ParticipantSchema,
			'recruitment25'
		);

		// Insert a test record
		const testUser = {
			name: 'Test User',
			email: 'test@example.com',
			registrationNumber: 'TEST001',
			phone: '1234567890',
			year: '3',
			domain: 'Technical',
		};

		const result = await Participant.create(testUser);
		console.log('✅ Test record created:', result._id);

		// Count documents
		const count = await Participant.countDocuments();
		console.log('Total documents in recruitment25:', count);

		// Clean up test record
		await Participant.deleteOne({ _id: result._id });
		console.log('✅ Test record cleaned up');

		console.log('🎉 All tests passed! Database is ready for registration.');
	} catch (error) {
		console.error('❌ Database connection error:', error.message);
	} finally {
		await mongoose.connection.close();
		console.log('Connection closed');
	}
}

testConnection();
