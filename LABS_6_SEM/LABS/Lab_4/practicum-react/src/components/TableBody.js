import TableRow from './TableRow';

const TableBody = (props) => {
  const paginate = props.paginate !== false;
  const n = Number(props.amountRows) || 1;
  const maxPage = Math.max(1, Math.ceil(props.body.length / n));
  const page = Math.min(Math.max(1, parseInt(props.numPage, 10) || 1), maxPage);
  const start = (page - 1) * n;

  const rows = paginate
    ? props.body.slice(start, start + n)
    : props.body;

  return (
    <tbody>
      {rows.map((item, i) => (
        <TableRow
          key={paginate ? start + i : i}
          row={Object.values(item)}
          isHead="0"
        />
      ))}
    </tbody>
  );
};

export default TableBody;
