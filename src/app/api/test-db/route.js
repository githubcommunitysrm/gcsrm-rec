import connectDB from '../../utils/db.js';
import ParticipantUser from '../../models/recruitment.model.js';

export async function GET(req) {
	try {
		await connectDB();

		// Get count of registered users
		const userCount = await ParticipantUser.countDocuments();

		// Get recent registrations (last 5)
		const recentUsers = await ParticipantUser.find({})
			.sort({ _id: -1 })
			.limit(5)
			.select('name email registrationNumber domain status createdAt');

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Database connected successfully',
				data: {
					totalUsers: userCount,
					recentRegistrations: recentUsers,
				},
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				error: error.message,
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
