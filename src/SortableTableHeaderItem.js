import React, { PropTypes } from 'react';
import SortDirection from './SortDirection';
import { SortIconBoth, SortIconDesc, SortIconAsc } from './SortIcons';

const SortableTableHeaderItem = (props = {}) => {
  const { header, iconAsc, iconBoth, iconDesc,
            iconStyle, index, onClick, sortable, sorting, style } = props;

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
      onClick={() => { if (sortable) { onClick(index); } }}
      {...props.headerProps}
    >
      {header}
      {sortIcon}
    </th>
  );
};

SortableTableHeaderItem.defaultProps = {
  headerProps: {},
  sortable: true,
};

SortableTableHeaderItem.propTypes = {
  header: PropTypes.node,
  headerProps: PropTypes.object,
  onClick: PropTypes.func,
  sortable: PropTypes.bool,
  sorting: PropTypes.oneOf([SortDirection.DESC, SortDirection.ASC, undefined]),
  iconStyle: PropTypes.object,
  iconDesc: PropTypes.node,
  iconAsc: PropTypes.node,
  iconBoth: PropTypes.node,
  index: PropTypes.number,
  style: PropTypes.object,
};

export default SortableTableHeaderItem;
