import React, { Component, PropTypes } from 'react';
import SortableTableHeader from './SortableTableHeader';
import SortableTableBody from './SortableTableBody';
import SortDirection from './SortDirection';

export default class SortableTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortings: this.getDefaultSortings(props),
    };

    this.sortData = this.sortData.bind(this);
    this.ascSortData = this.ascSortData.bind(this);
    this.descSortData = this.descSortData.bind(this);
    this.handleHeaderItemClick = this.handleHeaderItemClick.bind(this);
  }

  getDefaultSortings(props) {
    return props.columns.map(column => (column.defaultSorting ? column.defaultSorting : undefined));
  }

  handleHeaderItemClick(index) {
    const sortings = this.state.sortings.map(((sorting, i) => (
      i === index ? this.nextSortingState(sorting) : undefined
    )));

    this.setState({
      sortings,
    });
  }

  sortData(data, columns, sortings) {
    let sortedData = data.slice(0);

    sortings.forEach((sorting, i) => {
      const column = columns[i];
      const key = columns[i].key;

      switch (sorting) {
        case SortDirection.DESC:
          if (column.descSortFunction &&
          typeof(column.descSortFunction) === 'function') {
            sortedData = column.descSortFunction(sortedData, key);
          } else {
            sortedData = this.descSortData(sortedData, key);
          }
          break;

        case SortDirection.ASC:
          if (column.ascSortFunction &&
            typeof(column.ascSortFunction) === 'function') {
            sortedData = column.ascSortFunction(sortedData, key);
          } else {
            sortedData = this.ascSortData(sortedData, key);
          }
          break;

        default:
          break;
      }
    });

    return sortedData;
  }

  ascSortData(data, key) {
    return this.sortDataByKey(data, key, (_a, _b) => {
      let a = _a;
      let b = _b;

      if (this.parseFloatable(a) && this.parseFloatable(b)) {
        a = this.parseIfFloat(a);
        b = this.parseIfFloat(b);
      }

      if (a >= b) {
        return 1;
      }

      return -1;
    });
  }

  descSortData(data, key) {
    return this.ascSortData(data, key).reverse();
  }

  parseFloatable(value) {
    return typeof(value) === 'string' &&
    (/^\d+$/.test(value) || /^\d+$/.test(value.replace(/[,.%$]/g, '')));
  }

  parseIfFloat(value) {
    return parseFloat(value.replace(/,/g, ''));
  }

  sortDataByKey(data, key, fn) {
    const clone = Array.apply(null, data);
    return clone.sort((a, b) => (fn(a[key], b[key])));
  }

  nextSortingState(state) {
    if (!state) {
      return SortDirection.ASC;
    } else if (state === SortDirection.ASC) {
      return SortDirection.DESC;
    }

    return undefined;
  }

  render() {
    const { data, columns, iconAsc, iconBoth, iconDesc, iconStyle, id, style } = this.props;
    const { sortings } = this.state;
    const sortedData = this.sortData(data, columns, sortings);

    return (
      <div className="sleek-table table-wrapper">
        <table
          className="table"
          style={style}
          id={id}
        >
          <SortableTableHeader
            columns={columns}
            sortings={sortings}
            onHeaderItemClick={this.handleHeaderItemClick}
            iconStyle={iconStyle}
            iconDesc={iconDesc}
            iconAsc={iconAsc}
            iconBoth={iconBoth}
          />
          <SortableTableBody
            columns={columns}
            data={sortedData}
            sortings={sortings}
          />
        </table>
      </div>
    );
  }
}

SortableTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
  iconDesc: PropTypes.node,
  iconAsc: PropTypes.node,
  iconBoth: PropTypes.node,
  id: PropTypes.string,
};
