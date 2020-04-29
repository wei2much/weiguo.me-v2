/** @jsx jsx */
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx } from "theme-ui";
import { graphql } from "gatsby";

export const query = graphql`
  query($entryId: String!) {
    mdx(id: { eq: $entryId }) {
      body
      frontmatter {
        title
        tags
        author
      }
    }
  }
`;

const BlogEntry = ({ data }) => {
  const {
    frontmatter: { title },
    body,
  } = data.mdx;
  return (
    <div>
      <h1>{title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
    </div>
  );
};

export default BlogEntry;
