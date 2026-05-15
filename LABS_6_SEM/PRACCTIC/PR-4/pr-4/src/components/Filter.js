import { useRef } from 'react';
import { applyFilters } from '../bridgesUtils';

const Filter = (props) => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const t = event.target;

    const name = t.bridgeName.value.trim().toLowerCase();
    const region = t.region.value.trim().toLowerCase();
    const type = t.bridgeType.value.trim().toLowerCase();

    const yearRaw = t.year.value.trim();
    const year = yearRaw === '' ? null : Number(yearRaw);

    const lengthMinRaw = t.lengthFrom.value.trim();
    const lengthMaxRaw = t.lengthTo.value.trim();
    const lengthMin = lengthMinRaw === '' ? -Infinity : Number(lengthMinRaw);
    const lengthMax = lengthMaxRaw === '' ? Infinity : Number(lengthMaxRaw);

    const capacityMinRaw = t.capacityFrom.value.trim();
    const capacityMaxRaw = t.capacityTo.value.trim();
    const capacityMin = capacityMinRaw === '' ? -Infinity : Number(capacityMinRaw);
    const capacityMax = capacityMaxRaw === '' ? Infinity : Number(capacityMaxRaw);

    const filters = {
      name,
      region,
      year: Number.isFinite(year) ? year : null,
      lengthMin,
      lengthMax,
      capacityMin,
      capacityMax,
      type,
    };

    const arr = applyFilters([...props.fullData], filters);
    props.filtering(arr);
  };

  const handleClear = () => {
    formRef.current?.reset();
    if (props.onFiltersCleared) {
      props.onFiltersCleared();
    } else {
      props.filtering([...props.fullData]);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <p>
        <label>Название моста: </label>
        <input name="bridgeName" type="text" />
      </p>
      <p>
        <label>Регион: </label>
        <input name="region" type="text" />
      </p>
      <p>
        <label>Год открытия: </label>
        <input name="year" type="number" />
      </p>
      <p>
        <label>Длина моста (км): от </label>
        <input name="lengthFrom" type="number" step="any" />
        <label> до </label>
        <input name="lengthTo" type="number" step="any" />
      </p>
      <p>
        <label>Пропускная способность (тыс. авто/сутки): от </label>
        <input name="capacityFrom" type="number" step="any" />
        <label> до </label>
        <input name="capacityTo" type="number" step="any" />
      </p>
      <p>
        <label>Тип моста: </label>
        <input name="bridgeType" type="text" />
      </p>
      <p>
        <button type="submit">Найти</button>
        <button type="button" onClick={handleClear}>
          Очистить фильтры
        </button>
      </p>
    </form>
  );
};

export default Filter;
