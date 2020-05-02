import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

const Template = ({ data, pathContext }) => {
  let post = data.markdownRemark
  const title = data.markdownRemark.frontmatter.title
  const date = data.markdownRemark.frontmatter.date
  const html = data.markdownRemark.html
  let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid

  const { next, prev } = pathContext

  return (
    <div>
      <Img fluid={featuredImgFluid} />
      <h1>{title}</h1>
      <div>
        <em>{date}</em>
      </div>
      <br />
      <div className="blogpost" dangerouslySetInnerHTML={{ __html: html }} />
      <p>
        {prev && (
          <Link to={prev.frontmatter.path}>
            {prev.frontmatter.title}{" "}
            <span role="img" aria-label="point-left">
              👈{" "}
            </span>
            Previous
          </Link>
        )}
      </p>
      <p>
        {next && (
          <Link to={next.frontmatter.path}>
            Next{" "}
            <span role="img" aria-label="point-right">
              👉
            </span>
            {next.frontmatter.title}
          </Link>
        )}
      </p>
    </div>
  )
}

export const postQuery = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
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
        excerpt
      }
    }
  }
`

export default Template
