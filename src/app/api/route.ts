import { NextRequest, NextResponse } from 'next/server';

let todos: { [key: string]: string[] } = { 'fitness': [], 'academics': [] , 'self-care': []};
let totalCompleted: { [key: string]: number } = { 'fitness': 0, 'academics': 0, 'self-care': 0};
let muted: boolean = false;

export async function GET(req: NextRequest) {
  return NextResponse.json({ todos: todos, totalCompleted: totalCompleted, muted});
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  todos[data.goal] = data.newList;
  totalCompleted[data.goal] = totalCompleted[data.goal] + data.completed;
  muted = data.muted;
  return NextResponse.json({ todos: todos, totalCompleted: totalCompleted, muted});
}