import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { convertNodeToElement } from 'react-html-parser';
import Collapsible from 'react-collapsible';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

const MenuItemLink = ({ path, children, title }) => {
  if (!path) {
    return <div className="menu-item__link">{title}</div>;
  }

  if ('/' === path.substr(0, 1)) {
    return (
      <Link className="menu-item__link" to={path}>
        {title}
      </Link>
    );
  }

  return (
    <a className="menu-item__link" href={path} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  );
};

class NavItem extends Component {
  render() {
    const { item, location, current, onClick } = this.props;
    const { items, path, title } = item.node;
    const open = path === current;
    return items ? (
      <Collapsible
        className="menu__item"
        openedClassName="menu__item open"
        triggerDisabled
        transitionTime={500}
        open={open}
        easing="ease"
        trigger={
          <div className="item__title" role="presentation" onClick={() => onClick(path)}>
            <h2 key={path}>{title}</h2>
            <i className={`icon-chevron-${open ? 'top' : 'down'}`} />
          </div>
        }
      >
        {items.map(item => (
          <MenuItemLink
            path={`/docs/${path}/${item.id}`}
            children={item.anchors}
            title={item.title}
          />
        ))}
      </Collapsible>
    ) : (
      <div className="menu__item">
        <Link className="item__title" to={`/docs/${path}`}>
          <h2 key={path}>{title}</h2>
        </Link>
      </div>
    );
  }
}

export default withRouter(NavItem);
