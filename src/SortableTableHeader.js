import React, { Component, PropTypes } from 'react';
import SortableTableHeaderItem from './SortableTableHeaderItem';

export default class SortableTableHeader extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(index) {
    const { onStateChange } = this.props;
    onStateChange(index);
  }

  render() {
    const { iconBoth, iconAsc, iconDesc, iconStyle } = this.props;

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
  onStateChange: PropTypes.func,
  iconStyle: PropTypes.object,
  iconDesc: PropTypes.node,
  iconAsc: PropTypes.node,
  iconBoth: PropTypes.node,
};
