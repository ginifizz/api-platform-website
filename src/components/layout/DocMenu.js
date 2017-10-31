import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import Link from 'gatsby-link';
import MenuItem from 'components/docs/MenuItem';

class DocMenu extends Component {
  state = {
    currentItem: null,
  };

  toggleMenu = itemId =>
    this.setState(prevState => ({
      ...prevState,
      currentItem: prevState.currentItem === itemId ? null : itemId,
    }));

  transform = (node, index) => {
    const { next, prev, name: nodeName, children: nodeChildren, attribs } = node;
    switch (nodeName) {
      case 'h2':
        return (
          <MenuItem
            key={index}
            node={node}
            index={index}
            next={next}
            current={this.state.currentItem}
            transform={this.transform}
            onClick={this.toggleMenu}
          />
        );
      case 'ol':
        return 'h2' === prev.name ? null : convertNodeToElement(node, index, this.transform);
      case 'li':
        return (
          <li key={`li${index}`}>{nodeChildren.map((el, i) => this.transform(el, index + i))}</li>
        );
      case 'p':
        return nodeChildren.map((el, i) => this.transform(el, index + i));
      case 'a':
        if (-1 !== attribs.href.search('http')) {
          return convertNodeToElement(node, index);
        }

        return (
          <Link
            key={attribs.href}
            to={attribs.href.replace('.md', '')}
            activeClassName="active"
          >
            {nodeChildren.map((el, i) => convertNodeToElement(el, index + i))}
          </Link>
        );
      default:
        return null;
    }
  };

  parseMenuContent = (content, transform) => {
    const re = /<h1(.*?)<\/h1>/gi;
    const newContent = content.replace(re, '').replace(/(\r\n|\n|\r)/gm, '');
    return ReactHtmlParser(newContent, { transform });
  };

  render() {
    return (
      <div className="docs__menu openable">
        {this.parseMenuContent(this.props.index.html, this.transform)}
      </div>
    );
  }
}

DocMenu.propTypes = {
  index: PropTypes.object,
};

DocMenu.defaultProps = {
  index: null,
};

export default DocMenu;
