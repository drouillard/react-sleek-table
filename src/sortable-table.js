import React, { Component, PropTypes } from 'react';
import SortableTableHeader from './sortable-table-header';
import SortableTableBody from './sortable-table-body';
import SortDirection from './SortDirection';

export default class SortableTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortings: this.getDefaultSortings(props),
    };
  }

  getDefaultSortings(props) {
    return props.columns.map(column => (column.defaultSorting ? column.defaultSorting : undefined));
  }

  sortData(data, sortings) {
    let sortedData = this.props.data;
    for (var i in sortings) {
      const sorting = sortings[i];
      const column = this.props.columns[i];
      const key = this.props.columns[i].key;
      switch (sorting) {
        case SortingDirection.DESC:
          if (column.descSortFunction &&
              typeof(column.descSortFunction) == "function") {
          sortedData = column.descSortFunction(sortedData, key);
        } else {
          sortedData = this.descSortData(sortedData, key);
        }
        break;
        case SortingDirection.ASC:
          if (column.ascSortFunction &&
              typeof(column.ascSortFunction) == "function") {
          sortedData = column.ascSortFunction(sortedData, key);
        } else {
          sortedData = this.ascSortData(sortedData, key);
        }
        break;
      }
    }
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
    return this.sortDataByKey(data, key, ((a, b) => {
      if ( this.parseFloatable(a) && this.parseFloatable(b) ) {
        a = this.parseIfFloat(a);
        b = this.parseIfFloat(b);
      }
      if ( a <= b ) {
        return 1;
      } else if ( a > b) {
        return -1;
      }
    }).bind(this));
  }

  parseFloatable(value) {
    return typeof(value) === 'string' && (/^\d+$/.test(value) || /^\d+$/.test(value.replace(/[,.%$]/g, '')));
  }

  parseIfFloat(value) {
    return parseFloat(value.replace(/,/g, ''));
  }

  sortDataByKey(data, key, fn) {
    const clone = Array.apply(null, data);

    return clone.sort((a, b) => {
      return fn(a[key], b[key]);
    });
  }

  onStateChange(index) {
    const sortings = this.state.sortings.map(((sorting, i) => {
      if (i == index) {
        sorting = this.nextSortingState(sorting);
      } else {
        // reset sorting
        sorting = undefined;
      }
      return sorting;
    }).bind(this));

    this.setState({
      sortings
    });
  }

  nextSortingState(state) {
    if(!state) {
      return SortDirection.DESC;
    } else if (state === SortDirection.DESC) {
      return SortDirection.ASC;
    }

    return undefined;
  }

  render() {
    const sortedData = this.sortData(this.props.data, this.state.sortings);

    return (
      <table
        className="table"
        style={this.props.style} >
        <SortableTableHeader
          columns={this.props.columns}
          sortings={this.state.sortings}
          onStateChange={this.onStateChange.bind(this)}
          iconStyle={this.props.iconStyle}
          iconDesc={this.props.iconDesc}
          iconAsc={this.props.iconAsc}
          iconBoth={this.props.iconBoth} />
        <SortableTableBody
          columns={this.props.columns}
          data={sortedData}
          sortings={this.state.sortings} />
      </table>
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
  iconBoth: PropTypes.node
}
