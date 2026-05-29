export type tTasks = {
  question: string;
  answer: string;
}[];

export type tQuizzes = {
  id: number;
  type: 'M' | 'S' | 'C' | 'MC';
  title: string;
  tasks: tTasks;
}[];

export const quiz: tQuizzes = [
  {
    id: 1,
    type: 'M',
    title: 'Сопоставьте сооружение и город, в котором оно расположено.',
    tasks: [
      {
        question: 'Башня Аль-Хамра',
        answer: 'Кувейт',
      },
      {
        question: 'Башня CITIC',
        answer: 'Гуанчжоу',
      },
      {
        question: 'Телебашня «Коктобе»',
        answer: 'Алматы',
      },
      {
        question: 'Си-Эн Тауэр',
        answer: 'Торонто',
      },
    ],
  },
  {
    id: 2,
    type: 'M',
    title: 'Сопоставьте сооружение и его высоту.',
    tasks: [
      {
        question: 'Tokyo Skytree',
        answer: '634',
      },
      {
        question: 'Бурдж-Халифа',
        answer: '838',
      },
      {
        question: 'Эмпайр-стейт-билдинг',
        answer: '448.7',
      },
      {
        question: 'Останкинская башня',
        answer: '540.1',
      },
      {
        question: 'Lotte World Tower',
        answer: '555',
      },
    ],
  },
  {
    id: 3,
    type: 'S',
    title: 'Отсортировать сооружения по убыванию их высоты.',
    tasks: [
      {
        question: 'Бурдж-Халифа',
        answer: '1',
      },
      {
        question: 'Tokyo Skytree',
        answer: '2',
      },
      {
        question: 'Lotte World Tower',
        answer: '3',
      },
      {
        question: 'Останкинская башня',
        answer: '4',
      },
      {
        question: 'Эмпайр-стейт-билдинг',
        answer: '5',
      },
    ],
  },
  {
    id: 4,
    type: 'C',
    title: 'Какое из перечисленных зданий имеет наибольшую высоту?',
    tasks: [
      {
        question: 'Бурдж-Халифа',
        answer: '1',
      },
      {
        question: 'Tokyo Skytree',
        answer: '0',
      },
      {
        question: 'Останкинская башня',
        answer: '0',
      },
    ],
  },
  {
    id: 5,
    type: 'C',
    title: 'Бурдж-Халифа расположена в каком городе?',
    tasks: [
      {
        question: 'Дубае',
        answer: '1',
      },
      {
        question: 'Абу-Даби',
        answer: '0',
      },
      {
        question: 'Дохе',
        answer: '0',
      },
    ],
  },
  {
    id: 6,
    type: 'MC',
    title: 'Какие из перечисленных сооружений расположены в России? (выберите несколько)',
    tasks: [
      {
        question: 'Останкинская башня',
        answer: '1',
      },
      {
        question: 'Си-Эн Тауэр',
        answer: '0',
      },
      {
        question: 'Петропавловская крепость',
        answer: '1',
      },
      {
        question: 'Эмпайр-стейт-билдинг',
        answer: '0',
      },
    ],
  },
];
