import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { DiscussionEmbed } from "disqus-react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Header from "../components/header"
import Footer from "../components/Footer"
import Card from "@material-ui/core/Card"
import "../layout.css"
import PubComponent from "../components/PubComponent"
import SEO from '../components/seo';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
]

const Template = ({ data, pathContext }) => {
  const classes = useStyles()

  let post = data.markdownRemark

  const path = post.frontmatter.path
  const title = post.frontmatter.title
  const date = post.frontmatter.date
  const author = post.frontmatter.author
  const pubs = post.frontmatter.pubs
  const html = post.html
  const featuredImage = post.frontmatter.featuredImage

  const disqusConfig = {
    shortname: "beerfactory",
    config: { identifier: path, title },
  }

  let featuredImgFluid = ""
  if (featuredImage) {
    featuredImgFluid = featuredImage.childImageSharp.fluid
  }

  const { next, prev } = pathContext
  console.log(next)

  return (
    <React.Fragment>
      <SEO title="title" />
      <CssBaseline />
      <Header title="Blog" sections={sections} />
      <main style={{ paddingTop: 64 }}>
        <div>
          {featuredImgFluid ? (
            <div style={{ height: 200 }}>
              <Img fluid={featuredImgFluid} style={{ height: 200 }} />
            </div>
          ) : (
            ""
          )}
          <Card
            style={{
              margin: "20px auto 20px auto",
              padding: 20,
              maxWidth: 800,
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {author} - <em>{date}</em>
            </Typography>

            <Typography
              variant="subtitle1"
              paragraph
              className="blogpost"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {/*<div>
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
                </div>*/}
            <PubComponent tags={pubs} numberItem={4} />
            <DiscussionEmbed {...disqusConfig} />
          </Card>
        </div>
      </main>

      <Footer
        title="Beer Factory"
        description="Blog & application pour les brasseurs par un brasseur."
      />
    </React.Fragment>
  )
}

export const postQuery = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
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
`

export default Template
