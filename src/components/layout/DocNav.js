import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NavItem from 'components/docs/NavItem';

class DocNav extends Component {
  componentWillMount() {
    const { location, history } = this.props;
    const reg = /^\/docs\/(.*?)\/.*$/;
    const matches = location.pathname.match(reg);

    this.setState(prevState => ({
      ...prevState,
      currentItem: matches ? matches[1] : null,
    }));
    this.unlisten = history.listen(this.updateLocation);
  }

  updateLocation = (args) => {
    this.setState(prevState => ({
      ...prevState,
      locationWithHash: { ...args },
    }));
  }

  componentWillUnmount() {
    this.unlisten();
  }

  state = {
    currentItem: null,
    locationWithHash: this.props.location,
  };

  toggleMenu = itemPath =>
    this.setState(prevState => ({
      ...prevState,
      currentItem: prevState.currentItem === itemPath ? null : itemPath,
    }));

  render() {
    const { currentItem, locationWithHash } = this.state;

    return (
      <div className="docs__menu openable">
        {this.props.nav.map(item => (
          <NavItem
            item={item}
            key={item.node.path}
            onClick={this.toggleMenu}
            current={currentItem}
            location={locationWithHash}
          />
        ))}
      </div>
    );
  }
}

DocNav.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  nav: PropTypes.array,
};

DocNav.defaultProps = {
  nav: [],
};


export default withRouter(DocNav);
