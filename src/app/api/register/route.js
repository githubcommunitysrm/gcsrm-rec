import connectDB from '../../utils/db.js';
import ParticipantUser from '../../models/recruitment.model.js';

export async function POST(req) {
	await connectDB();
	const body = await req.json();

	try {
		// Server-side registration period validation
		const now = new Date();
		const startDate = new Date(2025, 7, 25, 0, 0, 0); // August 25, 2025 at 00:00:00
		const endDate = new Date(2025, 7, 29, 23, 59, 59); // August 29, 2025 at 23:59:59

		// Check if registration period is active
		if (now.getTime() < startDate.getTime()) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Registration has not started yet. Please wait until August 25, 2025.'
				}),
				{ status: 403 }
			);
		}

		if (now.getTime() > endDate.getTime()) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Registration period has ended. No new registrations are being accepted.'
				}),
				{ status: 403 }
			);
		}

		// Additional validation: Check if submissionTime was provided and is within valid range
		if (body.submissionTime) {
			const submissionTime = new Date(body.submissionTime);
			if (submissionTime.getTime() > endDate.getTime()) {
				return new Response(
					JSON.stringify({
						success: false,
						error: 'Registration period has ended. Submission timestamp is invalid.'
					}),
					{ status: 403 }
				);
			}
		}

		// Remove submissionTime from body before saving to database
		const { submissionTime, ...userData } = body;

		const user = await ParticipantUser.create(userData);
		return new Response(JSON.stringify({ success: true, user }), {
			status: 201,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{ status: 400 }
		);
	}
}
