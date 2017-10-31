import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Link from 'gatsby-link';
import NavItem from 'components/docs/NavItem';

class DocNav extends Component {
  componentWillMount() {
    const reg = /^\/docs\/(.*?)\/.*$/;
    const matches = this.props.location.pathname.match(reg);

    this.setState(prevState => ({
      ...prevState,
      currentItem: matches ? matches[1] : null,
    }));
  }

  state = {
    currentItem: null,
  };

  toggleMenu = itemPath =>
    this.setState(prevState => ({
      ...prevState,
      currentItem: prevState.currentItem === itemPath ? null : itemPath,
    }));

  render() {
    return (
      <div className="docs__menu openable">
        {this.props.nav.map(item => (
          <NavItem
            item={item}
            key={item.node.path}
            onClick={this.toggleMenu}
            current={this.state.currentItem}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(DocNav);
