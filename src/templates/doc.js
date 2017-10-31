import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const Template = ({ data }) => (
  <div className="page__docs">
    <Helmet title="Documentation" />
    <div className="container docs__content">
      <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
    </div>
  </div>
);

export default Template;

Template.propTypes = {
  data: PropTypes.object.isRequired,
};

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query DocByPath($path: String!) {
    post: markdownRemark(fields: { path: { eq: $path } }) {
      html
    }
  }
`;
