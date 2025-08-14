import { NextRequest, NextResponse } from 'next/server';

let todos: { [key: string]: string[] } = { 'fitness': [], 'academics': [] };
let completed: { [key: string]: number } = { 'fitness': 0, 'academics': 0 };

export async function GET(req: NextRequest) {
  return NextResponse.json({ todos: todos, completed: completed });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  todos[data.goal] = data.newList;
  completed[data.goal] = completed[data.goal] + data.completed;
  return NextResponse.json({ todos: todos, completed: completed});
}