import { NextRequest, NextResponse } from 'next/server';

let todos: { [key: string]: string[] } = { 'fitness': [], 'academics': [] };

export async function GET(req: NextRequest) {
  return NextResponse.json({ todos: todos });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  todos[data.goal] = data.newList;
  return NextResponse.json({ todos: todos });
}