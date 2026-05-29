export type tTasks = { question: string; answer: string }[];
export type tQuizzes = { id: number; type: 'M' | 'S' | 'C' | 'MC'; title: string; tasks: tTasks }[];

export const quiz: tQuizzes = [
  {
    id: 1,
    type: 'M',
    title: 'Сопоставьте сооружение и город, в котором оно расположено.',
    tasks: [
      { question: 'Башня Аль-Хамра', answer: 'Кувейт' },
      { question: 'Башня CITIC', answer: 'Гуанчжоу' },
      { question: 'Телебашня «Коктобе»', answer: 'Алматы' },
      { question: 'Си-Эн Тауэр', answer: 'Торонто' },
    ],
  },
  {
    id: 2,
    type: 'S',
    title: 'Отсортировать задания по убыванию их высоты.',
    tasks: [
      { question: 'Бурдж-Халифа', answer: '1' },
      { question: 'Tokyo Skytree', answer: '2' },
      { question: 'Lotte World Tower', answer: '3' },
      { question: 'Останкинская башня', answer: '4' },
      { question: 'Эмпайр-стейт-билдинг', answer: '5' },
    ],
  },
  {
    id: 3,
    type: 'C',
    title: 'Выберите один правильный ответ: Где находится Си-Эн Тауэр?',
    tasks: [
      { question: 'Торонто', answer: 'true' },
      { question: 'Алматы', answer: 'false' },
      { question: 'Кувейт', answer: 'false' },
    ],
  },
  {
    id: 4,
    type: 'MC',
    title: 'Выберите все подходящие варианты: Какие здания выше 500 м?',
    tasks: [
      { question: 'Бурдж-Халифа', answer: 'true' },
      { question: 'Tokyo Skytree', answer: 'true' },
      { question: 'Останкинская башня', answer: 'false' },
      { question: 'Эмпайр-стейт-билдинг', answer: 'false' },
    ],
  },
  {
    id: 5,
    type: 'M',
    title: 'Сопоставьте сооружение и его высоту.',
    tasks: [
      { question: 'Tokyo Skytree', answer: '634' },
      { question: 'Бурдж-Халифа', answer: '838' },
      { question: 'Эмпайр-стейт-билдинг', answer: '448.7' },
      { question: 'Останкинская башня', answer: '540.1' },
      { question: 'Lotte World Tower', answer: '555' },
    ],
  },
  {
    id: 6,
    type: 'C',
    title: 'Где находится Башня Аль-Хамра?',
    tasks: [
      { question: 'Кувейт', answer: 'true' },
      { question: 'Гуанчжоу', answer: 'false' },
      { question: 'Торонто', answer: 'false' },
    ],
  },
];
