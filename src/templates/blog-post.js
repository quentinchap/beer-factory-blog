import React from "react"
import { graphql } from "gatsby"
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
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  blogPost: {
    textAlign: "justify",
  },
}))

const Template = ({ children,data, ...props }) => {
  const classes = useStyles()

  const post = props.pageContext
  console.log(data)

  const path = post.frontmatter.path
  const title = post.frontmatter.title
  const excerpt = post.frontmatter.excerpt
  const date = post.frontmatter.date
  const author = post.frontmatter.author
  const pubs = post.frontmatter.pubs
  const featuredImage = post.frontmatter.featuredImage

  const disqusConfig = {
    shortname: "beerfactory",
    config: { identifier: path, title },
  }

  let featuredImgFluid = ""
  if (featuredImage && featuredImage.childImageSharp) {
    featuredImgFluid = featuredImage.childImageSharp.fluid
  }
  console.log(featuredImgFluid, featuredImage)

  //console.log(featuredImgFluid, props)

  //const { next, prev } = pathContext
  //console.log(next)

  return (
    <MDXProvider
      components={{
        h1: props => (
          <Typography
            variant="h1"
            component="h2"
            {...props}
            style={{
              marginTop: 60,
              marginBottom: 40,
              fontWeight: 100,
              color: "#4a4a4a",
              fontSize: "4rem",
              borderBottom: "solid #ffbe58",
            }}
          />
        ),
        h2: props => (
          <Typography
            variant="h2"
            component="h2"
            {...props}
            style={{
              marginBottom: 20,
              fontSize: "3rem",
              color: "#ffbe58",
              fontWeight: 500,
            }}
          />
        ),
        h3: props => (
          <Typography
            variant="h3"
            component="h3"
            {...props}
            style={{ marginBottom: 20 }}
          />
        ),
        p: props => (
          <Typography
            variant="body1"
            component="p"
            {...props}
            style={{ marginBottom: 20 }}
          />
        ),
        li: props => (
          <Typography
            variant="body1"
            component="li"
            {...props}
            style={{ marginBottom: 5 }}
          />
        ),
        a: props => (
          <a {...props} style={{ color: "#ca7b00", textDecoration: "none" }} />
        ),
      }}
    >
      <SEO title={title} description={excerpt} author={author} />
      <CssBaseline />
      <Header title="Blog" />
      <main style={{ paddingTop: 64 }}>
        <div>
          {featuredImgFluid ? (
            <div style={{ height: 400 }}>
              <Img fluid={featuredImgFluid} style={{ height: 400 }} />
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
            {children}

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
          </Card>
          <div>
            <PubComponent tags={pubs} numberItem={4} />
          </div>
          <Card
            style={{
              margin: "20px auto 20px auto",
              padding: 20,
              maxWidth: 800,
            }}
          >
            <DiscussionEmbed {...disqusConfig} />
          </Card>
        </div>
      </main>

      <Footer
        title="Beer Factory"
        description="Blog & application pour les brasseurs par un brasseur."
      />
    </MDXProvider>
  )
}

export const postQuery = graphql`
  query MDXQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
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
