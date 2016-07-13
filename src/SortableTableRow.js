import React, { PropTypes } from 'react';

const SortableTableRow = (props = {}) => {
  const { columns, data } = props;

  const rows = columns.map((item, index) => {
    let value = data[item.key];
    if (item.render) {
      value = item.render(value, data);
    }

    return (
      <td
        key={index}
        style={item.dataStyle}
        {...(item.dataProps || {})}
      >
        {value}
      </td>
    );
  });

  return (
    <tr>
      {rows}
    </tr>
  );
};

SortableTableRow.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export default SortableTableRow;
