import { NextResponse } from 'next/server';
import connectDB from '@/app/utils/db.js';
import ParticipantUser from '@/app/models/recruitment.model.js';

export async function POST(request) {
  try {
    const body = await request.json();

    // Submission window (India Standard Time)
    // Start: 31st Aug 2025 03:00:00 IST
    // End:   6th Sep 2025 23:59:59 IST
    const SUBMISSION_START = new Date('2025-08-31T03:00:00+05:30');
    const SUBMISSION_END = new Date('2025-09-05T23:59:59+05:30');
    const now = new Date();

    if (now < SUBMISSION_START) {
      return NextResponse.json(
        { error: 'Submission not open yet', opensAt: SUBMISSION_START.toISOString() },
        { status: 403 }
      );
    }

    if (now > SUBMISSION_END) {
      return NextResponse.json(
        { error: 'Submission window has closed', closedAt: SUBMISSION_END.toISOString() },
        { status: 403 }
      );
    }

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
