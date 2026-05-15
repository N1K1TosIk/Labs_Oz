import raw from './bridgesRaw';

const MAP = {
  name: 'Название моста',
  region: 'Регион',
  year: 'Год открытия',
  length: 'Длина, км',
  type: 'Тип моста',
  capacity: 'Пропускная способность (тыс. авто/сутки)',
};

const bridges = raw.map((item) => {
  const out = {};
  for (const [en, ru] of Object.entries(MAP)) {
    let v = item[en];
    if (en === 'year') {
      const n = Number(String(v).replace(',', '.'));
      out[ru] = Number.isFinite(n) ? n : v;
    } else if (en === 'length' || en === 'capacity') {
      const n = Number(String(v).replace(',', '.'));
      out[ru] = Number.isFinite(n) ? n : v;
    } else {
      out[ru] = v;
    }
  }
  return out;
});

export default bridges;
