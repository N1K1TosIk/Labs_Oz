import { useEffect, useState } from 'react';

const SortLevels = (props) => {
  const columns = props.columns || [];
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [v3, setV3] = useState('');
  const [d1, setD1] = useState(false);
  const [d2, setD2] = useState(false);
  const [d3, setD3] = useState(false);

  useEffect(() => {
    if (!v1) {
      setV2('');
      setV3('');
    }
  }, [v1]);

  useEffect(() => {
    if (!v2) {
      setV3('');
    }
  }, [v2]);

  useEffect(() => {
    if (v2 && v2 === v1) setV2('');
  }, [v1, v2]);

  useEffect(() => {
    if (v3 && (v3 === v1 || v3 === v2)) setV3('');
  }, [v1, v2, v3]);

  const opts = (exclude) =>
    columns
      .filter((k) => !exclude.includes(k))
      .map((k) => (
        <option key={k} value={k}>
          {k}
        </option>
      ));

  const handleApply = (event) => {
    event.preventDefault();
    const levels = [];
    const push = (key, desc) => {
      if (!key) return;
      if (levels.some((l) => l.key === key)) return;
      levels.push({ key, desc });
    };
    push(v1, d1);
    push(v2, d2);
    push(v3, d3);
    props.onApply(levels);
  };

  const handleReset = () => {
    setV1('');
    setV2('');
    setV3('');
    setD1(false);
    setD2(false);
    setD3(false);
    props.onApply([]);
  };

  const l2Disabled = !v1;
  const l3Disabled = !v2;

  return (
    <form onSubmit={handleApply}>
      <p>
        <label>Первый уровень: </label>
        <select
          name="sort1"
          value={v1}
          onChange={(e) => setV1(e.target.value)}
        >
          <option value="">Нет</option>
          {opts([])}
        </select>
        <label> по убыванию? </label>
        <input
          type="checkbox"
          name="sorting1"
          checked={d1}
          disabled={!v1}
          onChange={(e) => setD1(e.target.checked)}
        />
      </p>
      <p>
        <label>Второй уровень: </label>
        <select
          name="sort2"
          value={v2}
          disabled={l2Disabled}
          onChange={(e) => setV2(e.target.value)}
        >
          <option value="">Нет</option>
          {opts(v1 ? [v1] : [])}
        </select>
        <label> по убыванию? </label>
        <input
          type="checkbox"
          name="sorting2"
          checked={d2}
          disabled={l2Disabled || !v2}
          onChange={(e) => setD2(e.target.checked)}
        />
      </p>
      <p>
        <label>Третий уровень: </label>
        <select
          name="sort3"
          value={v3}
          disabled={l3Disabled}
          onChange={(e) => setV3(e.target.value)}
        >
          <option value="">Нет</option>
          {opts(v1 && v2 ? [v1, v2] : v1 ? [v1] : [])}
        </select>
        <label> по убыванию? </label>
        <input
          type="checkbox"
          name="sorting3"
          checked={d3}
          disabled={l3Disabled || !v3}
          onChange={(e) => setD3(e.target.checked)}
        />
      </p>
      <p>
        <button type="submit">Сортировать</button>
        <button type="button" onClick={handleReset}>
          Сбросить сортировку
        </button>
      </p>
    </form>
  );
};

export default SortLevels;
