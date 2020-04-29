const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");

exports.onPreBootstrap = ({ store }) => {
  const { program } = store.getState();
  const contentPath = "posts";
  const dir = path.join(program.directory, contentPath);
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            title
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("error loading the mdx files", result.errors);
  }
  const blogPosts = result.data.allMdx.nodes;
  blogPosts.forEach((post) => {
    actions.createPage({
      path: `blog/${post.frontmatter.slug}`,
      component: require.resolve("./src/components/Blog/BlogEntry.js"),
      context: {
        entryId: post.id,
      },
    });
  });
};
