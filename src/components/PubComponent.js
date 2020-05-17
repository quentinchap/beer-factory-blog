import React, { useState, useEffect, memo } from "react"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import map from "lodash/map"
import axios from "axios"

const _ = { map }

const useStyles = makeStyles(() => ({
  defaultTabs: {
    color: "#ffd99e",
    background: "#484848",
  },
  tabSelected: {
    background: "none",
  },
  title: {
    margin: "auto",
    marginTop: 10,
  },
  linkContainer: {
    display: "flex",
    padding: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pubLabel: {
    fontWeight: 400,
    padding: 10,
    background: "#484848",
    minHeight: 68,
    maxWidth: 110,
    width: 110,
    color: "#ffbd69",
  },
  pubDisclamer: {
    color: "#ffbd69",
    fontWeight: 400,
  },
  pubContainer: {
    margin: 7,
    minWidth: 110,
    width: 110,
  },
  pubLink: {
    display: "flex",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    border: "1px solid #484848",
    flexDirection: "column",
    textDecoration: "none",
    alignItems: "center",
  },
  pubPic: {
    padding: 10,
    maxWidth: 90,
  },
}))

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const PubComponent = memo(({ title, tags, numberItem = 5 }) => {
  const [state, setState] = useState({
    title: title || "Les stars",
    items: [
      {
        label: "Moulin à malt",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Concasser-son-malt/OR1100338-Moulin-malt-rouleaux-reglables-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Concasser-son-malt-Moulin-a-Malt-ajustable-mbf",
      },
      {
        label: "Refroidisseur de moût",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Embouteiller-sa-biere-maison/LIW50671-refroidisseur-mout-biere-echangeur-10-plaques-1-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Embouteiller-sa-biere-maison-Refroidisseur-de-mout-mbf",
      },
      {
        label: "Seau de fermentation",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Seaux-de-brassage-et-fermentation-biere/Seau-de-fermentation-ok-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Seaux-de-brassage-et-fermentation-biere-Seau-de-fermentation-mbf",
      },
      {
        label: "Capsuleuse sur pied",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Embouteiller-sa-biere-maison/REF41709-capsuleuse-colt-professionnelle-26-29-mm-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Embouteiller-sa-biere-maison-Capsuleuse-sur-pied-Pro-mbf",
      },
      {
        label: "Egouttoir 80 bt",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Seaux-de-brassage-et-fermentation-biere/REF15261-egouttoir-egoutoir-80-bouteilles-eco-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Seaux-de-brassage-et-fermentation-biere-Egouttoir-Eco-80-bt-mbf",
      },
      {
        label: "Cuve brassage",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Brasser-tout-grain/REB10223-24-Cuve-brassage-inox-33-70-litres-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Brasser-tout-grain-Cuve-brassage-inox-mbf",
      },
      {
        label: "Brew Bag",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Brasser-tout-grain/ORB05700935-brew-bag-fabrication-biere-maison-BIAB-2-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Brasser-tout-grain-Brew-Bag-mbf",
      },
      {
        label: "Grainfather Connect",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Grainfather/AMI10194-grainfather-connect-brassage-tout-grain-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Grainfather-Grainfather-Connect-mbf",
      },
      {
        label: "Densimètre",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Seaux-de-brassage-et-fermentation-biere/REF11523-Densim%C3%A8tre-bi%C3%A8re-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Seaux-de-brassage-et-fermentation-biere-Densimetre-mbf",
      },
      {
        label: "Balance Digitale",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Seaux-de-brassage-et-fermentation-biere/ORB0131045-Balance%20digitale-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Seaux-de-brassage-et-fermentation-biere-Balance-Digitale-mbf",
      },
      {
        label: "Thermomètre",
        picture:
          "https://www.microbrasseur.com/v2_img/produits/Materiel/Seaux-de-brassage-et-fermentation-biere/ORB-01308810-thermometre-brassage-biere-maison-3-2.png",
        link:
          "https://www.microbrasseur.com/Materiel-Seaux-de-brassage-et-fermentation-biere-Thermometre-special-brassage-mbf",
      },
    ],
  })

  useEffect(() => {
    async function fetchData() {
      let res = await axios.post("https://api.mybeerfactory.fr/api/v1.1/pubs", {
        numberOfItems: numberItem,
        tags: [...(tags || [])],
      })
      setState({ items: res.data })
    }

    fetchData()
  }, [])

  const classes = useStyles()

  useEffect(() => setState({ ...state, items: shuffle(state.items) }), [])

  return (
    <div
      style={{
        display: "flex",
        padding: 10,
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography component="h5" variant="h5" className={classes.title}>
        {state.title}
      </Typography>
      <div className={classes.linkContainer}>
        {_.map(state.items, (item, i) => {
          if (i < numberItem) {
            return <ItemComponent item={item} key={i} />
          }
          return
        })}
      </div>
      <Typography component="p" className={classes.pubDisclamer}>
        Publicités
      </Typography>
    </div>
  )
})

const ItemComponent = ({ item }) => {
  const classes = useStyles()

  return (
    <div className={classes.pubContainer}>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.pubLink}
      >
        <img src={item.picture} alt={item.label} className={classes.pubPic} />
        <Typography component="p" className={classes.pubLabel}>
          {item.label}
        </Typography>
      </a>
    </div>
  )
}

export default PubComponent
