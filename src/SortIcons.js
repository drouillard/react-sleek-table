import React, { PropTypes } from 'react';

export const FaIcon = (props = {}) => {
  const { icon, style } = props;
  const className = `fa fa-lg ${icon}`;

  return (
    <i
      className={className}
      style={style}
      align="right"
    />
  );
};

FaIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export const SortIconAsc = (props = {}) => (
  <FaIcon icon="fa-sort-asc" style={props.style} />
);

SortIconAsc.propTypes = {
  style: PropTypes.object,
};

export const SortIconDesc = (props = {}) => (
  <FaIcon icon="fa-sort-desc" style={props.style} />
);

SortIconDesc.propTypes = {
  style: PropTypes.object,
};

export const SortIconBoth = (props = {}) => (
  <FaIcon icon="fa-sort" style={props.style} />
);

SortIconBoth.propTypes = {
  style: PropTypes.object,
};
