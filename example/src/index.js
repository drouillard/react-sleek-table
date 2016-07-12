window.React = require('react');
import { render } from 'react-dom';
import React, { Component } from 'react';
import SortableTable from 'react-sortable-table';

function getFamilyName(name) {
  return name.split(' ').slice(-1)[0];
}

const FamilyNameSorter = {
  desc: (data, key) => {
    const result = data.sort((_a, _b) => {
      const a = getFamilyName(_a[key]);
      const b = getFamilyName(_b[key]);
      return a <= b ? 1 : -1;
    });

    return result;
  },

  asc: (data, key) => (
    data.sort((_a, _b) => {
      const a = getFamilyName(_a[key]);
      const b = getFamilyName(_b[key]);
      return a >= b ? 1 : -1;
    })
  ),
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { id: 3, name: 'Satoshi Yamamoto', class: 'B' },
        { id: 1, name: 'Taro Tanak', class: 'A' },
        { id: 2, name: 'Ken Asada', class: 'A' },
        { id: 5, name: 'Nobuo Yamamoto', class: 'D' },
        { id: 4, name: 'Masaru Tokunaga', class: 'C' },
      ],
    };
  }

  render() {
    const columns = [
      {
        header: 'ID',
        key: 'id',
        defaultSorting: 'ASC',
        headerStyle: { fontSize: '15px', backgroundColor: '#FFDAB9', width: '100px' },
        dataStyle: { fontSize: '15px', backgroundColor: '#FFDAB9' },
        dataProps: { className: 'align-right' },
        render: (id) => (<a href={`user/${id}`}>{id}</a>),

      },
      {
        header: 'NAME',
        key: 'name',
        headerStyle: { fontSize: '15px' },
        headerProps: { className: 'align-left' },
        descSortFunction: FamilyNameSorter.desc,
        ascSortFunction: FamilyNameSorter.asc,
      },
      {
        header: 'CLASS',
        key: 'class',
        headerStyle: { fontSize: '15px' },
        sortable: false,
      },
    ];

    const style = {
      backgroundColor: '#eee',
    };

    const iconStyle = {
      color: '#aaa',
      paddingLeft: '5px',
      paddingRight: '5px',
    };

    return (
      <SortableTable
        data={this.state.data}
        columns={columns}
        style={style}
        iconStyle={iconStyle}
      />
    );
  }
}

render(<App />, document.getElementById('app'));
