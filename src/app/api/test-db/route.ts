import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

export async function GET() {
  try {
    await client.connect();
    const db = client.db('fun-utils'); // Replace with your database name
    const collection = db.collection('test');
    const result = await collection.findOne({});
    return NextResponse.json({ message: 'Connected to MongoDB', data: result });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to MongoDB' },
      { status: 500 }
    );
  }
}
