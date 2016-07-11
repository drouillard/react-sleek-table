import React, { Component, PropTypes } from 'react';
import SortableTableRow from './SortableTableRow';

export default class SortableTableBody extends Component {
  static get defaultProps() {
    return {
      data: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      sortings: PropTypes.array.isRequired,
    };
  }

  render() {
    const { columns, data } = this.props;

    const bodies = data.map((item, index) => (
      <SortableTableRow
        key={index}
        data={item}
        columns={columns}
      />
    ));

    return (
      <tbody>
        {bodies}
      </tbody>
    );
  }
}

SortableTableBody.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};
