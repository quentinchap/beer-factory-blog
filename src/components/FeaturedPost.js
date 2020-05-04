import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Hidden from "@material-ui/core/Hidden"
import Img from "gatsby-image"
import { Link } from "gatsby"

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
})

export default function FeaturedPost(props) {
  const classes = useStyles()
  const { post } = props
  const featuredImage = post.featuredImage

  let featuredImgFluid = ""
  if (featuredImage) {
    featuredImgFluid = featuredImage.childImageSharp.fluid
  }

  return (
    <Grid item xs={12} md={6}>
      <Link to={post.path} style={{ textDecoration: "none" }}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.excerpt}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Lire la suite
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <Img className={classes.cardMedia} fluid={featuredImgFluid} />
          </Hidden>
        </Card>
      </Link>
    </Grid>
  )
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
}
