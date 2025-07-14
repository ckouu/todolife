import { NextRequest, NextResponse } from 'next/server';

let list: string[] = []

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "PLEASE WORK", list: list });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  let newString: string = data.test;
  list.push(newString);
  return NextResponse.json({ message: 'SUCCESS', list: list });
}