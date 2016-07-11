import React, { Component, PropTypes } from 'react';
import SortableTableHeaderItem from './SortableTableHeaderItem';

export default class SortableTableHeader extends Component {

  onClick(index) {
    this.props.onStateChange.bind(this)(index);
  }

  render() {
    const headers = this.props.columns.map(((column, index) => {
      const sorting = this.props.sortings[index];
      return (
        <SortableTableHeaderItem
          sortable={column.sortable}
          key={index}
          index={index}
          header={column.header}
          sorting={sorting}
          onClick={this.onClick}
          style={column.headerStyle}
          headerProps={column.headerProps}
          iconStyle={this.props.iconStyle}
          iconDesc={this.props.iconDesc}
          iconAsc={this.props.iconAsc}
          iconBoth={this.props.iconBoth}
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
  onStateChange: PropTypes.func,
  iconStyle: PropTypes.object,
  iconDesc: PropTypes.node,
  iconAsc: PropTypes.node,
  iconBoth: PropTypes.node,
};
