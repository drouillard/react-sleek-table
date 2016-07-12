import React, { Component, PropTypes } from 'react';
import SortableTableHeaderItem from './SortableTableHeaderItem';

export default class SortableTableHeader extends Component {

  render() {
    const { columns, iconBoth, iconAsc, iconDesc,
            iconStyle, onHeaderItemClick, sortings } = this.props;

    const headers = columns.map(((column, index) => {
      const sorting = sortings[index];
      return (
        <SortableTableHeaderItem
          sortable={column.sortable}
          key={index}
          index={index}
          header={column.header}
          sorting={sorting}
          onClick={onHeaderItemClick}
          style={column.headerStyle}
          headerProps={column.headerProps}
          iconStyle={iconStyle}
          iconDesc={iconDesc}
          iconAsc={iconAsc}
          iconBoth={iconBoth}
        />
      );
    }));

    return (
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
    );
  }
}

SortableTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortings: PropTypes.array.isRequired,
  onHeaderItemClick: PropTypes.func,
  iconStyle: PropTypes.object,
  iconDesc: PropTypes.node,
  iconAsc: PropTypes.node,
  iconBoth: PropTypes.node,
};
