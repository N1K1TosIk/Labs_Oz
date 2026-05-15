import { useCallback, useEffect, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Filter from './Filter';
import SortLevels from './SortLevels';
import { applySorting } from '../bridgesUtils';

const Table = (props) => {
  const showPagination = props.showPagination !== false;
  const n = Number(props.amountRows) || 1;
  const fullData = props.data;

  const [filteredData, setFilteredData] = useState(() => [...fullData]);
  const [sortLevels, setSortLevels] = useState([]);
  const [sortMountKey, setSortMountKey] = useState(0);
  const [activePage, setActivePage] = useState('1');

  const displayData = applySorting(filteredData, sortLevels);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(displayData.length / n));
    setActivePage((p) => {
      const num = Math.min(
        Math.max(1, parseInt(p, 10) || 1),
        maxPage,
      );
      return String(num);
    });
  }, [displayData.length, n]);

  const updateFiltered = useCallback((value) => {
    setFilteredData(value);
    setActivePage('1');
  }, []);

  const updateSort = useCallback((levels) => {
    setSortLevels(levels);
    setActivePage('1');
  }, []);

  const handleFiltersCleared = useCallback(() => {
    setFilteredData([...fullData]);
    setSortLevels([]);
    setActivePage('1');
    setSortMountKey((k) => k + 1);
  }, [fullData]);

  const pageCount = Math.max(1, Math.ceil(displayData.length / n));
  const changeActive = (e) => setActivePage(e.target.innerHTML);

  const pages = Array.from({ length: pageCount }, (_, i) => String(i + 1));

  const columnKeys = Object.keys(fullData[0] || {});

  return (
    <>
      <h4>Фильтры</h4>
      <Filter
        filtering={updateFiltered}
        fullData={fullData}
        onFiltersCleared={handleFiltersCleared}
      />
      <h4>Сортировка</h4>
      <SortLevels
        key={sortMountKey}
        columns={columnKeys}
        onApply={updateSort}
      />
      <table className="bridges-table">
        <TableHead head={columnKeys} />
        <TableBody
          body={displayData}
          amountRows={props.amountRows}
          numPage={activePage}
          paginate={showPagination}
        />
      </table>
      {showPagination && (
        <div className="table-pagination">
          {pages.map((item, i) => (
            <span
              key={i}
              className={
                item === activePage ? 'page-num page-num-active' : 'page-num'
              }
              onClick={changeActive}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Table;
