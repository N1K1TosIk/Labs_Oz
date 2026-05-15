import TableRow from './TableRow';

const TableHead = (props) => (
  <thead>
    <TableRow row={props.head} isHead="1" />
  </thead>
);

export default TableHead;
