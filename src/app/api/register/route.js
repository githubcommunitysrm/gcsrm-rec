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
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{ status: 400 }
		);
	}
}
