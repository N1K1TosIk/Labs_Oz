import { useRef } from 'react';

const Filter = (props) => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const t = event.target;

    const text = {
      Название: t.structure.value.trim().toLowerCase(),
      Тип: t.type.value.trim().toLowerCase(),
      Страна: t.country.value.trim().toLowerCase(),
      Город: t.city.value.trim().toLowerCase(),
    };

    const num = (name) => {
      const s = t[name].value.trim();
      if (s === '') return null;
      const n = Number(s);
      return Number.isNaN(n) ? null : n;
    };

    const yMin = num('yearFrom');
    const yMax = num('yearTo');
    const hMin = num('heightFrom');
    const hMax = num('heightTo');

    let arr = [...props.fullData];

    for (const key of ['Название', 'Тип', 'Страна', 'Город']) {
      const q = text[key];
      if (q) {
        arr = arr.filter((item) =>
          String(item[key]).toLowerCase().includes(q)
        );
      }
    }

    if (yMin !== null || yMax !== null) {
      arr = arr.filter((item) => {
        const y = item['Год'];
        if (yMin !== null && y < yMin) return false;
        if (yMax !== null && y > yMax) return false;
        return true;
      });
    }

    if (hMin !== null || hMax !== null) {
      arr = arr.filter((item) => {
        const h = item['Высота'];
        if (hMin !== null && h < hMin) return false;
        if (hMax !== null && h > hMax) return false;
        return true;
      });
    }

    props.filtering(arr);
  };

  const handleClear = () => {
    formRef.current?.reset();
    props.filtering([...props.fullData]);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <p>
        <label>Название: </label>
        <input name="structure" type="text" />
      </p>
      <p>
        <label>Тип: </label>
        <input name="type" type="text" />
      </p>
      <p>
        <label>Страна: </label>
        <input name="country" type="text" />
      </p>
      <p>
        <label>Город: </label>
        <input name="city" type="text" />
      </p>
      <p>
        <label>Год от: </label>
        <input name="yearFrom" type="number" />
        <label> Год до: </label>
        <input name="yearTo" type="number" />
      </p>
      <p>
        <label>Высота от: </label>
        <input name="heightFrom" type="number" step="any" />
        <label> Высота до: </label>
        <input name="heightTo" type="number" step="any" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="button" onClick={handleClear}>
          Очистить фильтр
        </button>
      </p>
    </form>
  );
};

export default Filter;
