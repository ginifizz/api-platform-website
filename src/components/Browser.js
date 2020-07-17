import React from 'react';
import PropTypes from 'prop-types';

const BrowserWindow = ({ url, children, terminal, ...attrs }) => (
  <div className="browser__window" {...attrs}>
    <div className="window__header">
      <div className="browser__spacer">
        <span className="window__icon window__close" />
        <span className="window__icon window__minimize" />
        <span className="window__icon window__fullscreen" />
      </div>
      {url && <div className="browser__url">{url}</div>}
      {terminal && <span className="terminal__header">bash</span>}
      <div className="browser__spacer" />
    </div>
    <div className="browser__content">{children}</div>
  </div>
);

BrowserWindow.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node.isRequired,
  terminal: PropTypes.bool,
};

BrowserWindow.defaultProps = {
  url: null,
  terminal: false,
};

export default BrowserWindow;
