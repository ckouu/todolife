import { NextRequest, NextResponse } from 'next/server';

let list: string[] = []

export async function GET(req: NextRequest) {
  return NextResponse.json({ list: list });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  list = data.newList;
  return NextResponse.json({ list: list });
}