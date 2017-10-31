import React from 'react';
import PropTypes from 'prop-types';
import { convertNodeToElement } from 'react-html-parser';
import Collapsible from 'react-collapsible';

const MenuItem = ({ node, index, next, transform, onClick, current }) => {
  const { id } = node.attribs;
  const open = id === current;
  return (
    <Collapsible
      className="menu__item"
      openedClassName="menu__item open"
      triggerDisabled
      transitionTime={500}
      open={open}
      easing="ease"
      trigger={
        <div className="item__title" role="presentation" onClick={() => onClick(id)}>
          <h2 key={id}>{node.children.map(el => convertNodeToElement(el, index, transform))}</h2>
          <i className={`icon-chevron-${open ? 'top' : 'down'}`} />
        </div>
      }
    >
      {convertNodeToElement(next, next.index, transform)}
    </Collapsible>
  );
};

MenuItem.defaultProps = {
  next: null,
  onClick: () => {},
  transform: () => {},
  current: null,
};

MenuItem.propTypes = {
  node: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  next: PropTypes.object,
  onClick: PropTypes.func,
  transform: PropTypes.func,
  current: PropTypes.string,
};

export default MenuItem;
