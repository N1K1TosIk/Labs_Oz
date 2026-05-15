(() => {
  const TABLE_SELECTOR = 'table';
  const SORT_LEVELS = [1, 2, 3];

  const toLower = (v) => (v == null ? '' : String(v)).toLowerCase();

  const parseNumberOrNaN = (v) => {
    if (v == null) return Number.NaN;
    const s = String(v).replace(',', '.').trim();
    if (s === '' || s === '-') return Number.NaN;
    const n = Number(s);
    return Number.isFinite(n) ? n : Number.NaN;
  };

  const getTable = () => document.querySelector(TABLE_SELECTOR);

  const getHeaderCells = (table) => {
    const headerRow = table.querySelector('tr');
    if (!headerRow) return [];
    return Array.from(headerRow.querySelectorAll('th'));
  };

  const getDataRows = (table) => {
    const rows = Array.from(table.querySelectorAll('tr'));
    // First row is header
    return rows.slice(1);
  };

  const normalizeKey = (key) => key.trim().toLowerCase();

  const KEY_BY_SELECT_VALUE = {
    name: 'name',
    region: 'region',
    year: 'year',
    length: 'length',
    type: 'type',
    capacity: 'capacity',
  };

  const buildColumnIndexMap = (headerCells) => {
    // PR-1 table has fixed columns; we map by header text to be resilient.
    const map = new Map();
    headerCells.forEach((th, idx) => {
      const txt = normalizeKey(th.textContent || '');
      if (txt.includes('название')) map.set('name', idx);
      else if (txt.includes('регион')) map.set('region', idx);
      else if (txt.includes('год')) map.set('year', idx);
      else if (txt.includes('длина')) map.set('length', idx);
      else if (txt.includes('тип')) map.set('type', idx);
      else if (txt.includes('пропуск')) map.set('capacity', idx);
    });
    return map;
  };

  const extractRowObject = (tr, colIndex) => {
    const cells = Array.from(tr.querySelectorAll('td'));
    const get = (k) => cells[colIndex.get(k)]?.textContent?.trim() ?? '';
    return {
      name: get('name'),
      region: get('region'),
      year: get('year'),
      length: get('length'),
      type: get('type'),
      capacity: get('capacity'),
    };
  };

  const readFilters = () => {
    const name = document.getElementById('name')?.value ?? '';
    const region = document.getElementById('region')?.value ?? '';
    const yearRaw = document.getElementById('year')?.value ?? '';
    const lengthMinRaw = document.getElementById('length_min')?.value ?? '';
    const lengthMaxRaw = document.getElementById('length_max')?.value ?? '';
    const capacityMinRaw = document.getElementById('capacity_min')?.value ?? '';
    const capacityMaxRaw = document.getElementById('capacity_max')?.value ?? '';
    const bridgeType = document.getElementById('bridge_type')?.value ?? '';

    const year = yearRaw === '' ? null : Number(yearRaw);
    const lengthMin = lengthMinRaw === '' ? -Infinity : Number(lengthMinRaw);
    const lengthMax = lengthMaxRaw === '' ? Infinity : Number(lengthMaxRaw);
    const capacityMin = capacityMinRaw === '' ? -Infinity : Number(capacityMinRaw);
    const capacityMax = capacityMaxRaw === '' ? Infinity : Number(capacityMaxRaw);

    return {
      name: toLower(name),
      region: toLower(region),
      year,
      lengthMin,
      lengthMax,
      capacityMin,
      capacityMax,
      type: toLower(bridgeType),
    };
  };

  const applyFilters = (items, filters) =>
    items.filter((it) => {
      if (filters.name && !toLower(it.name).includes(filters.name)) return false;
      if (filters.region && !toLower(it.region).includes(filters.region)) return false;
      if (filters.type && !toLower(it.type).includes(filters.type)) return false;

      if (filters.year != null && Number.isFinite(filters.year)) {
        const y = parseNumberOrNaN(it.year);
        if (!Number.isFinite(y) || y !== filters.year) return false;
      }

      const len = parseNumberOrNaN(it.length);
      if (Number.isFinite(len)) {
        if (len < filters.lengthMin || len > filters.lengthMax) return false;
      } else {
        if (filters.lengthMin !== -Infinity || filters.lengthMax !== Infinity) return false;
      }

      const cap = parseNumberOrNaN(it.capacity);
      if (Number.isFinite(cap)) {
        if (cap < filters.capacityMin || cap > filters.capacityMax) return false;
      } else {
        if (filters.capacityMin !== -Infinity || filters.capacityMax !== Infinity) return false;
      }

      return true;
    });

  const readSortSpec = () => {
    const getLevel = (n) => {
      const select = document.querySelector(`select[name="sort${n}"]`);
      const desc = document.querySelector(`input[name="sorting${n}"]`)?.checked ?? false;
      const raw = select?.value ?? '0';
      if (raw === '0') return null;
      const key = KEY_BY_SELECT_VALUE[raw];
      if (!key) return null;
      return { key, desc };
    };


    const levelsRaw = [getLevel(1), getLevel(2), getLevel(3)].filter(Boolean);
    const seen = new Set();
    const levels = [];
    for (const lvl of levelsRaw) {
      if (seen.has(lvl.key)) continue;
      seen.add(lvl.key);
      levels.push(lvl);
    }
    return levels;
  };

  const getSortSelect = (n) => document.querySelector(`select[name="sort${n}"]`);
  const getSortDesc = (n) => document.querySelector(`input[name="sorting${n}"]`);

  const captureOptionsHTML = (select) => (select ? select.innerHTML : '');

  const setSelectOptionsExcludingValue = (select, baseOptionsHTML, excludeValue) => {
    if (!select) return;
    select.innerHTML = baseOptionsHTML;
    if (excludeValue && excludeValue !== '0') {
      const opt = select.querySelector(`option[value="${CSS.escape(excludeValue)}"]`);
      opt?.remove();
    }
    select.value = '0';
  };

  const updateSortLevelAvailability = (baseOptionsHTML) => {
    const s1 = getSortSelect(1);
    const s2 = getSortSelect(2);
    const s3 = getSortSelect(3);
    const d1 = getSortDesc(1);
    const d2 = getSortDesc(2);
    const d3 = getSortDesc(3);

    if (!s1 || !s2 || !s3) return;

    const v1 = s1.value ?? '0';
    const v2 = s2.value ?? '0';

   
    if (v1 === '0') {
      s2.disabled = true;
      if (d2) d2.disabled = true;
      setSelectOptionsExcludingValue(s2, baseOptionsHTML, null);
      s3.disabled = true;
      if (d3) d3.disabled = true;
      setSelectOptionsExcludingValue(s3, baseOptionsHTML, null);
      return;
    }

    s2.disabled = false;
    if (d2) d2.disabled = false;
    const prev2 = s2.value ?? '0';
    s2.innerHTML = baseOptionsHTML;
    s2.querySelector(`option[value="${CSS.escape(v1)}"]`)?.remove();
    if (!s2.querySelector(`option[value="${CSS.escape(prev2)}"]`)) {
      s2.value = '0';
    } else {
      s2.value = prev2;
    }

    if (s2.value === '0') {
      s3.disabled = true;
      if (d3) d3.disabled = true;
      setSelectOptionsExcludingValue(s3, baseOptionsHTML, null);
      return;
    }

    s3.disabled = false;
    if (d3) d3.disabled = false;
    const prev3 = s3.value ?? '0';
    s3.innerHTML = baseOptionsHTML;
    s3.querySelector(`option[value="${CSS.escape(v1)}"]`)?.remove();
    s3.querySelector(`option[value="${CSS.escape(v2)}"]`)?.remove();
    if (!s3.querySelector(`option[value="${CSS.escape(prev3)}"]`)) {
      s3.value = '0';
    } else {
      s3.value = prev3;
    }

    if (d1) d1.disabled = false;
  };

  const compareValues = (a, b, key) => {
    if (key === 'year' || key === 'length' || key === 'capacity') {
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

  const applySorting = (items, sortLevels) => {
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

  const renderTableBody = (table, items) => {
    const existingRows = getDataRows(table);
    existingRows.forEach((tr) => tr.remove());

    const order = ['name', 'region', 'year', 'length', 'type', 'capacity'];
    const frag = document.createDocumentFragment();
    for (const it of items) {
      const tr = document.createElement('tr');
      for (const key of order) {
        const td = document.createElement('td');
        td.textContent = it[key] ?? '';
        tr.append(td);
      }
      frag.append(tr);
    }
    table.append(frag);
  };

  const main = () => {
    const table = getTable();
    if (!table) return;

    const headerCells = getHeaderCells(table);
    const colIndex = buildColumnIndexMap(headerCells);


    const originalItems = getDataRows(table).map((tr) => extractRowObject(tr, colIndex));
    let viewItems = originalItems.slice();

    const findBtn = Array.from(document.querySelectorAll('input[type="submit"]')).find(
      (el) => (el.value || '').trim() === 'Найти',
    );
    const sortBtn = Array.from(document.querySelectorAll('input[type="submit"]')).find(
      (el) => (el.value || '').trim() === 'Сортировать',
    );

    const sort1 = getSortSelect(1);
    const baseSortOptionsHTML = captureOptionsHTML(sort1);

    const update = () => {
      const filters = readFilters();
      const sortLevels = readSortSpec();
      viewItems = applySorting(applyFilters(originalItems, filters), sortLevels);
      renderTableBody(table, colIndex, viewItems);
    };

    const resetAll = () => {
      const ids = ['name', 'region', 'year', 'length_min', 'length_max', 'capacity_min', 'capacity_max', 'bridge_type'];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });

      SORT_LEVELS.forEach((n) => {
        const s = getSortSelect(n);
        if (s) s.value = '0';
        const d = getSortDesc(n);
        if (d) d.checked = false;
      });
      updateSortLevelAvailability(baseSortOptionsHTML);

      viewItems = originalItems.slice();
      renderTableBody(table, colIndex, viewItems);
    };

    const preventSubmit = (e) => {
      e.preventDefault();
    };

    document.querySelectorAll('form').forEach((f) => {
      f.addEventListener('submit', preventSubmit);
    });

    const clearFilterBtn = Array.from(document.querySelectorAll('input[type="button"]')).find(
      (el) => (el.value || '').trim() === 'Очистить фильтры',
    );
    const clearSortBtn = Array.from(document.querySelectorAll('input[type="button"]')).find(
      (el) => (el.value || '').trim() === 'Сбросить сортировку',
    );

    if (findBtn) {
      findBtn.addEventListener('click', (e) => {
        preventSubmit(e);
        update();
      });
    }
    if (sortBtn) {
      sortBtn.addEventListener('click', (e) => {
        preventSubmit(e);
        update();
      });
    }

    if (clearFilterBtn) {
      clearFilterBtn.addEventListener('click', (e) => {
        preventSubmit(e);
        resetAll();
      });
    }
    if (clearSortBtn) {
      clearSortBtn.addEventListener('click', (e) => {
        preventSubmit(e);
        resetAll();
      });
    }

    if (baseSortOptionsHTML) {
      updateSortLevelAvailability(baseSortOptionsHTML);
      SORT_LEVELS.forEach((n) => {
        const s = getSortSelect(n);
        s?.addEventListener('change', () => {
          updateSortLevelAvailability(baseSortOptionsHTML);
        });
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
