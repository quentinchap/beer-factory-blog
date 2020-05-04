import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Header from "./Header"
import MainFeaturedPost from "./MainFeaturedPost"
import FeaturedPost from "./FeaturedPost"
import Footer from "./Footer"

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

export default function Blog({ edges }) {
  const classes = useStyles()
  let mainPost = {}
  let posts = []

  if (edges && edges.length > 0) {
    mainPost = edges[0].node.frontmatter
    posts = edges.slice(1, edges.length)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header title="Blog" sections={sections} />
      <Container maxWidth="lg">
        <main style={{ paddingTop: 80 }}>
          <MainFeaturedPost post={mainPost} />
          <Grid container spacing={4}>
            {posts.map(p => (
              <FeaturedPost
                key={p.node.frontmatter.title}
                post={p.node.frontmatter}
              />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}></Grid>
        </main>
      </Container>
      <Footer
        title="Beer Factory"
        description="Blog & application pour les brasseurs par un brasseur."
      />
    </React.Fragment>
  )
}
