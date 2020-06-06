export const imageFragment = graphql`
fragment imageFragment on File {
      childImageSharp {
        sizes(maxWidth: 1000) {
          ...GatsbyImageSharpSizes
        }
      }
}
`;

export const imageFragmentSmall = graphql`
fragment imageFragmentSmall on File {
      childImageSharp {
        resolutions(width: 250) {
          ...GatsbyImageSharpResolutions
        }
      }
}
`;


export const portfolioFragment = graphql`
fragment portfolioFragment on File {
      childImageSharp {
        sizes(maxWidth: 100) {
          ...GatsbyImageSharpSizes
        }
      }
}
`;