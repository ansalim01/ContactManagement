// api.ts
import { InterfaceContactItem } from '@/types';

// Фейковые данные контактов
const fakeContacts: InterfaceContactItem[] = [
  { key: '1', name: 'Иванов Иван', telefon: '+7 (123) 456-7890', email: 'ivanov@example.com' },
  { key: '2', name: 'Петров Петр', telefon: '+7 (987) 654-3210', email: 'petrov@example.com' },
  { key: '3', name: 'Сидорова Мария', telefon: '+7 (111) 222-3333', email: 'sidorova@example.com' },
];

// Метод для получения списка контактов
export function fetchContacts (): Promise<InterfaceContactItem[]> {
  return new Promise((resolve) => {
    // Имитация задержки ответа сервера
    setTimeout(() => {
      resolve(fakeContacts);
    }, 500);
  });
}
