import React, { Component, PropTypes } from 'react';

class FaIcon extends Component {
  static get propTypes() {
    return {
      icon: PropTypes.string.isRequired,
      style: PropTypes.string,
    };
  }

  render() {
    const { icon, style } = this.props;
    const className = `fa fa-lg ${icon}`;

    return (
      <i
        className={className}
        style={style}
        align="right"
      />
    );
  }
}

export class SortIconBoth extends Component {
  render() {
    return (
      <FaIcon icon="fa-sort" style={this.props.style} />
    );
  }
}

export class SortIconAsc extends Component {
  render() {
    return (
      <FaIcon icon="fa-sort-asc" style={this.props.style} />
    );
  }
}

export class SortIconDesc extends Component {
  render() {
    return (
      <FaIcon icon="fa-sort-desc" style={this.props.style} />
    );
  }
}
