import { useEffect, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Filter from './Filter';

const Table = (props) => {
  const { data, amountRows, showPagination: showPaginationProp, onDataChange } = props;
  const showPagination = showPaginationProp !== false;
  const n = Number(amountRows) || 1;
  const [dataTable, setDataTable] = useState(data);
  const [activePage, setActivePage] = useState('1');

  const updateDataTable = (value) => {
    setDataTable(value);
    onDataChange?.(value);
    setActivePage(String(Math.max(1, Math.ceil(value.length / n))));
  };

  useEffect(() => {
    onDataChange?.(dataTable);
  }, [dataTable, onDataChange]);

  const pageCount = Math.max(1, Math.ceil(dataTable.length / n));
  const changeActive = (e) => setActivePage(e.target.innerHTML);

  const pages = Array.from({ length: pageCount }, (_, i) => String(i + 1));

  return (
    <>
      <h4>Фильтры</h4>
      <Filter filtering={updateDataTable} fullData={data} />
      <table className="buildings-table">
        <TableHead head={Object.keys(data[0])} />
        <TableBody
          body={dataTable}
          amountRows={amountRows}
          numPage={activePage}
          paginate={showPagination}
        />
      </table>
      {showPagination && (
        <div className="table-pagination">
          {pages.map((item, i) => (
            <span
              key={i}
              className={item === activePage ? 'page-num page-num-active' : 'page-num'}
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
