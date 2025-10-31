import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await client.connect();
    const db = client.db('fun-utils');
    const collection = db.collection('expenses');
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });
    return NextResponse.json({
      message: 'Expense saved',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error saving expense:', error);
    return NextResponse.json(
      { error: 'Failed to save expense' },
      { status: 500 }
    );
  }
}
