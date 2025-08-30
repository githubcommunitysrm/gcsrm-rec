import { NextResponse } from 'next/server';
import connectDB from '@/app/utils/db.js';
import ParticipantUser from '@/app/models/recruitment.model.js';

export async function POST(request) {
  try {
    const body = await request.json();

    await connectDB();

    const { registrationNumber, email } = body || {};

    if (!registrationNumber && !email) {
      return NextResponse.json({ error: 'registrationNumber or email required' }, { status: 400 });
    }

    const participant = await ParticipantUser.findOne({
      $or: [
        { registrationNumber: registrationNumber },
        { email: email }
      ]
    });

    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
    }

    if (participant.status === 'taskSubmitted') {
      return NextResponse.json({ error: 'Task already submitted' }, { status: 409 });
    }

    const sheetUrl = process.env.NEXT_PUBLIC_SHEET_DB;
    if (!sheetUrl) {
      return NextResponse.json({ error: 'Sheet endpoint not configured on server' }, { status: 500 });
    }

    // Prefer selectedTaskTitle (human readable) when forwarding to sheet
    const forwardBody = Object.assign({}, body);
    if (body.selectedTaskTitle) {
      forwardBody.selectedTask = body.selectedTaskTitle;
    }

    // Forward payload to Google Apps Script
    const resp = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forwardBody),
    });

    const text = await resp.text();

    // If upstream succeeded, update participant status
    if (resp.ok) {
      participant.status = 'taskSubmitted';
      await participant.save();
    }

    return new NextResponse(text, {
      status: resp.status,
      headers: {
        'Content-Type': resp.headers.get('content-type') || 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
