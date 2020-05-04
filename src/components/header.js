import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
import Logo from "../images/logo.png"
import LogoApp from "../images/newAppLogo.png"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
  toolbar: {
    position: "fixed",
    display: "flex",
    textAlign: "center",
    zIndex: 5,
    height: 64,
    width: "100%",
    background: "#7d7d7d",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}))

export default function Header(props) {
  const classes = useStyles()
  const { sections, title } = props

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <div style={{ pading: "10px 0 10px 0", flex: 1 }}>
          <Link to="/">
            <img src={Logo} alt="logo" style={{ height: 40 }} />
          </Link>
        </div>
        <div
          style={{
            pading: "10px 0 10px 0",
            borderLeft: "solid 1px #f1d5a8",
            flex: 1,
          }}
        >
          <a href="https://mybeerfactory.fr/brewery/">
            <img src={LogoApp} alt="logo" style={{ height: 40 }} />
          </a>
        </div>
      </Toolbar>
      {/*<Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
        </Toolbar>*/}
    </React.Fragment>
  )
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
}
