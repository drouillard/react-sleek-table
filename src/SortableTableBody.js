import React, { PropTypes } from 'react';
import SortableTableRow from './SortableTableRow';

const SortableTableBody = (props = {}) => {
  const { columns, data } = props;

  const rows = data.map((item, index) => (
    <SortableTableRow
      key={index}
      data={item}
      columns={columns}
    />
  ));

  return (
    <tbody>
      {rows}
    </tbody>
  );
};

SortableTableBody.defaultProps = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortings: PropTypes.array.isRequired,
};

SortableTableBody.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

export default SortableTableBody;
