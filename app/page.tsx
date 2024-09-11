'use client';
import { FormEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Handjet, Ubuntu_Mono } from 'next/font/google';

const handjet = Handjet({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});

const ubuntu = Ubuntu_Mono({
  weight: '400',
  subsets: ['cyrillic'],
});

// Тип данных для отправки на сервер
interface SubmissionData {
  name: string;
  telegramLink: string;
}

// Функция для отправки данных на сервер
const submitData = async (data: SubmissionData) => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }
    alert('Данные успешно отправлены!');
  } catch (error) {
    alert('Ошибка при отправке данных');
  }
};

export default function BusinessCard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [telegramLink, setTelegramLink] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitData({ name, telegramLink });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-2xl rounded-xl border border-gray-200">
        <CardHeader className="bg-white p-6 border-b border-gray-100">
          <CardTitle className="text-5xl font-bold text-center text-black-800">
            <h1 className={handjet.className}>Робототехника</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className={`p-6 space-y-4 text-gray-700 ${ubuntu.className}`}>
          <p className="text-lg text-left">
            <span className="font-bold">Если вы хотите </span>научиться программировать и стремитесь экспериментировать с роботами, это ваш шанс. Напишите свою программу,
            чтобы робот выполнял действия, которые вы задумали. А также мы вас обучим всем необходимым навыкам и знаниям для достижения успеха. Если это вызывает у вас интерес,
            мы ждем вас в нашей команде.
          </p>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Направления:</h3>
            <ul className="list-none space-y-2">
              <li className="pl-4">
                <strong className="text-gray-900">Эксплуатация сервисных роботов</strong>
              </li>
              <li className="pl-4">
                <strong className="text-gray-900">Мобильная робототехника</strong> 
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Наш стек технологий:</h3>
            <ul className="list-none space-y-1">
              <li><strong className="text-gray-900">Эксплуатация сервисных роботов:</strong> Linux, Git, Python, ROS</li>
              <li><strong className="text-gray-900">Мобильная робототехника:</strong> Git, Java, Python</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Мы находимся в кабинете 228</h3>
          </div>
        </CardContent>

        <CardFooter className="bg-white p-6 flex justify-center border-t border-gray-100">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Записаться к нам
          </Button>
        </CardFooter>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h3 className="text-2xl font-semibold mb-4 text-center">Оставить нам свои контакты</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Ссылка на Telegram"
                  value={telegramLink}
                  onChange={(e) => setTelegramLink(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
                <Button type="submit" className="w-full bg-blue-600 text-white rounded-lg shadow">
                  Отправить
                </Button>
                <Button onClick={() => setIsModalOpen(false)} className="w-full bg-gray-300 text-black rounded-lg shadow">
                  Отмена
                </Button>
              </form>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}


