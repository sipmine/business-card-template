import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs'; // Используем промисы для асинхронной работы с файлами
import path from 'path';

// Путь к файлу для сохранения данных
const filePath = path.join(process.cwd(), 'data.json');



export async function POST(req: NextRequest) {
  try {
    const { name, telegramLink } = await req.json();

    if (!name || !telegramLink) {
      return NextResponse.json({ error: 'Name and Telegram link are required' }, { status: 400 });
    }
    fs.appendFile('message.txt', `${name} | ${telegramLink} \n`);
    // Добавляем данные в файл
    console.log(telegramLink, name)
    return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
  }
}



