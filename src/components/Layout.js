import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from './layout/Header';
import BurgerButton from './layout/BurgerButton';
import Footer from './layout/Footer';
import SideMenu from './layout/SideMenu';
import '../styles/main.scss';
import helmetConfig from '../helmetConfig';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { showResponsiveMenu: false };
  }

  showMenu = (open) => {
    this.setState((prevState) => ({ ...prevState, showResponsiveMenu: open }));
  };

  render() {
    const { children, location } = this.props;
    const { showResponsiveMenu: open } = this.state;
    const withSecondMenuDisplayed = -1 !== location.pathname.search('/docs');

    return (
      <div className={classNames('main full', { open, 'with-second-menu-displayed': withSecondMenuDisplayed })}>
        <div className="full">
          <Helmet {...helmetConfig.head}>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/docsearch.js/2.5/docsearch.min.css" />
          </Helmet>
          <Header />
          <div className="page openable">{children}</div>
          <Footer />
        </div>
        <BurgerButton onClick={this.showMenu.bind(null, !open)} status={open ? 'close' : 'burger'} />
        <div role="presentation" className="overlay" onClick={this.showMenu.bind(null, false)} />
        <SideMenu open={open} />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
