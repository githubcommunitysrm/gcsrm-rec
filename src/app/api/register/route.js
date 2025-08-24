import connectDB from '../../utils/db.js';
import ParticipantUser from '../../models/recruitment.model.js';

export async function POST(req) {
	await connectDB();
	const body = await req.json();

	try {
		const user = await ParticipantUser.create(body);
		return new Response(JSON.stringify({ success: true, user }), {
			status: 201,
		});
	} catch (error) {
		console.error('Registration error:', error);

		// Handle specific MongoDB errors
		if (error.code === 11000) {
			// Duplicate key error
			if (error.message.includes('regNo_1')) {
				return new Response(
					JSON.stringify({
						success: false,
						error: 'Database configuration error. Please contact support.',
					}),
					{ status: 500 }
				);
			} else if (error.message.includes('registrationNumber')) {
				return new Response(
					JSON.stringify({
						success: false,
						error: 'This registration number is already registered.',
					}),
					{ status: 400 }
				);
			} else if (error.message.includes('email')) {
				return new Response(
					JSON.stringify({
						success: false,
						error: 'This email address is already registered.',
					}),
					{ status: 400 }
				);
			}
		}

		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{ status: 400 }
		);
	}
}
