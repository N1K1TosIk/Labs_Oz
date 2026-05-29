import bridges from '../data';

const bridgeRows = bridges.map((bridge) => ({
  id: bridge.id,
  Название: bridge.title,
  Тип: bridge.type,
  Регион: bridge.region,
  'Год открытия': bridge.year,
  'Длина, км': bridge.length,
  'Пропускная способность (тыс. авто/сутки)': bridge.capacity ?? '-',
}));

export default bridgeRows;
