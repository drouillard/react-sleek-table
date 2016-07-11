import React, { Component, PropTypes } from 'react';
import SortDirection from './SortDirection';
import { SortIconBoth, SortIconDesc, SortIconAsc } from './icons';

class SortableTableHeaderItem extends Component {

  static get defaultProps() {
    return {
      headerProps: {},
      sortable: true,
    };
  }

  onClick() {
    const { index } = this.props;
    if (this.props.sortable) {
      this.props.onClick(index);
    }
  }

  render() {
    const { header, iconAsc, iconBoth, iconDesc, iconStyle, sortable, sorting, style } = this.props;

    let sortIcon;
    if (sortable) {
      if (iconBoth) {
        sortIcon = iconBoth;
      } else {
        sortIcon = <SortIconBoth style={iconStyle} />;
      }
      if (sorting === SortDirection.DESC) {
        if (iconDesc) {
          sortIcon = iconDesc;
        } else {
          sortIcon = <SortIconDesc style={iconStyle} />;
        }
      } else if (sorting === SortDirection.ASC) {
        if (iconAsc) {
          sortIcon = iconAsc;
        } else {
          sortIcon = <SortIconAsc style={iconStyle} />;
        }
      }
    }

    return (
      <th
        style={style}
        onClick={this.onClick}
        {...this.props.headerProps}
      >
        {header}
        {sortIcon}
      </th>
    );
  }
}

SortableTableHeaderItem.propTypes = {
  header: PropTypes.node,
  headerProps: PropTypes.object,
  onClick: PropTypes.function,
  sortable: PropTypes.bool,
  sorting: PropTypes.oneOf([SortDirection.DESC, SortDirection.ASC, undefined]),
  iconStyle: PropTypes.object,
  iconDesc: PropTypes.node,
  iconAsc: PropTypes.node,
  iconBoth: PropTypes.node,
  index: PropTypes.number,
  style: PropTypes.string,
};
