module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog-posts",
        path: "posts",
      },
    },
    "gatsby-plugin-mdx",
  ],
};
