import bridgeRows from '../list/table';

export type tGroup = {
  id: number;
  Группа: string | number;
  'Минимальная длина': number;
  'Максимальная длина': number;
  'Минимальная пропускная способность': number;
  'Максимальная пропускная способность': number;
}[];

type GroupKey = 'Регион' | 'Год открытия';

const makeGroup = (key: GroupKey): tGroup => {
  const groups = new Map<string | number, number[]>();

  bridgeRows.forEach((bridge) => {
    const group = bridge[key];
    const values = groups.get(group) ?? [];
    values.push(bridge['Длина, км']);
    groups.set(group, values);
  });

  return Array.from(groups.entries()).map(([group, values], index) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const capacityValues = bridgeRows
      .filter((bridge) => bridge[key] === group)
      .map((bridge) => bridge['Пропускная способность (тыс. авто/сутки)'])
      .filter((value): value is number => typeof value === 'number');

    return {
      id: index + 1,
      Группа: group,
      'Минимальная длина': min,
      'Максимальная длина': max,
      'Минимальная пропускная способность': capacityValues.length ? Math.min(...capacityValues) : 0,
      'Максимальная пропускная способность': capacityValues.length ? Math.max(...capacityValues) : 0,
    };
  });
};

export const regions = makeGroup('Регион');
export const years = makeGroup('Год открытия');
