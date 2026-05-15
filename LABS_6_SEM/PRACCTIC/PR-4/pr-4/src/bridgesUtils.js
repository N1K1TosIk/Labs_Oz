const toLower = (v) => (v == null ? '' : String(v)).toLowerCase();

export const parseNumberOrNaN = (v) => {
  if (v == null) return Number.NaN;
  const s = String(v).replace(',', '.').trim();
  if (s === '' || s === '-') return Number.NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : Number.NaN;
};

const KEY_YEAR = 'Год открытия';
const KEY_LEN = 'Длина, км';
const KEY_CAP = 'Пропускная способность (тыс. авто/сутки)';
const KEY_NAME = 'Название моста';
const KEY_REGION = 'Регион';
const KEY_TYPE = 'Тип моста';

const NUMERIC_KEYS = new Set([KEY_YEAR, KEY_LEN, KEY_CAP]);

export const applyFilters = (items, filters) => {
  const {
    name,
    region,
    year,
    lengthMin,
    lengthMax,
    capacityMin,
    capacityMax,
    type,
  } = filters;

  return items.filter((it) => {
    if (name && !toLower(it[KEY_NAME]).includes(name)) return false;
    if (region && !toLower(it[KEY_REGION]).includes(region)) return false;
    if (type && !toLower(it[KEY_TYPE]).includes(type)) return false;

    if (year != null && Number.isFinite(year)) {
      const y = parseNumberOrNaN(it[KEY_YEAR]);
      if (!Number.isFinite(y) || y !== year) return false;
    }

    const len = parseNumberOrNaN(it[KEY_LEN]);
    if (Number.isFinite(len)) {
      if (len < lengthMin || len > lengthMax) return false;
    } else if (lengthMin !== -Infinity || lengthMax !== Infinity) {
      return false;
    }

    const cap = parseNumberOrNaN(it[KEY_CAP]);
    if (Number.isFinite(cap)) {
      if (cap < capacityMin || cap > capacityMax) return false;
    } else if (capacityMin !== -Infinity || capacityMax !== Infinity) {
      return false;
    }

    return true;
  });
};

export const compareValues = (a, b, key) => {
  if (NUMERIC_KEYS.has(key)) {
    const na = parseNumberOrNaN(a[key]);
    const nb = parseNumberOrNaN(b[key]);
    const aHas = Number.isFinite(na);
    const bHas = Number.isFinite(nb);
    if (aHas && bHas) return na - nb;
    if (aHas && !bHas) return -1;
    if (!aHas && bHas) return 1;
    return toLower(a[key]).localeCompare(toLower(b[key]), 'ru');
  }
  return toLower(a[key]).localeCompare(toLower(b[key]), 'ru');
};

export const applySorting = (items, sortLevels) => {
  if (!sortLevels.length) return items.slice();
  const arr = items.slice();
  arr.sort((a, b) => {
    for (const lvl of sortLevels) {
      const c = compareValues(a, b, lvl.key);
      if (c !== 0) return lvl.desc ? -c : c;
    }
    return 0;
  });
  return arr;
};
