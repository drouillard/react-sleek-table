import React, { Component, PropTypes } from 'react';

class SortableTableRow extends Component {

  render() {
    const { columns, data } = this.props;

    const tds = columns.map((item, index) => {
      let value = data[item.key];
      if (item.render) {
        value = item.render(value);
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
        {tds}
      </tr>
    );
  }
}

SortableTableRow.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
