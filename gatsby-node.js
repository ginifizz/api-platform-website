const path = require('path');
const URL = require('url');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const docTemplate = path.resolve('src/templates/doc.js');

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [fields___path] }, limit: 1000) {
        edges {
          node {
            fields {
              path
            }
            excerpt(pruneLength: 250)
            html
            id
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach((edge) => {
      createPage({
        path: edge.node.fields.path,
        component: docTemplate,
        context: {
          path: edge.node.fields.path,
        }, // additional data can be passed via context
      });
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if ('MarkdownRemark' === node.internal.type) {
    const fileNode = getNode(node.parent);
    const nodePath = fileNode.relativePath.replace('.md', '');
    let html = node.internal.content;
    const re = /(\]\((?!http)(?!#)(.*?)\))/gi;
    const localUrls = [];
    let matches;

    while ((matches = re.exec(html))) {
      localUrls.push(matches[2]);
    }

    localUrls.map((url) => {
      let newUrl = url.replace('.md', '');
      newUrl = `/${URL.resolve(nodePath, newUrl)}`;
      html = html.replace(url, newUrl);
      return true;
    });

    node.internal.content = html;

    createNodeField({
      node,
      name: 'path',
      value: nodePath,
    });
  }
};

exports.modifyWebpackConfig = ({ config, env }) => {
  config.merge({
    resolve: {
      root: path.resolve(__dirname, './src'),
      alias: {
        styles: 'styles',
        images: 'images',
        data: 'data',
        components: 'components',
      },
    },
  });
  return config;
};
