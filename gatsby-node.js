const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/templates/blog-post.js")
  // Query for markdown nodes to use in creating pages.

  const result = await graphql(
    `
      query {
        allMdx(sort: { order: ASC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
				title
				author
				draft
				featuredImage {
				  childImageSharp {
					fluid(maxWidth: 800) {
					  ...GatsbyImageSharpFluid
					}
				  }
				}
				date(formatString: "DD/MM/YYYYs")
				path
				tags
				pubs
				excerpt
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    const path = node.frontmatter.path

    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.frontmatter.path,
      // This component will wrap our MDX content
      component: blogPostTemplate,
      // You can use the values in this context in
      // our page layout component
      context: {
        ...node.frontmatter,
        id: node.id,
        pathSlug: path,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    })
  })
}
