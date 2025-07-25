import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || 'http://localhost:3001/api';

export async function GET(
    request: Request,
    { params }: { params: { assessmentId: string } }
) {
    try {
        const assessmentId = params.assessmentId;

        if (!assessmentId) {
            return NextResponse.json({ error: 'Missing Assessment ID.' }, { status: 400 });
        }

        const backendRes = await fetch(`${BACKEND_API_BASE_URL}/reports/${assessmentId}`);

        if (!backendRes.ok) {
            const errorBody = await backendRes.json();
            return NextResponse.json({ error: errorBody.message || 'Failed to fetch report' }, { status: backendRes.status });
        }

        const data = await backendRes.json();
        return NextResponse.json(data);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
    }
} 