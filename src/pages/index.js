import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import { ThemeProvider, createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#ffbd6a",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
  },
  status: {
    danger: "orange",
  },
})

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <ThemeProvider theme={theme}>
      <Layout edges={edges} />
    </ThemeProvider>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      filter: { fields: { draft: { eq: false } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            author
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 2048) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "DD/MM/YYYYs")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`

export default IndexPage
