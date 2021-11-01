import {useStaticQuery, graphql} from 'gatsby'

export const useDdestinationsArray = () => {
    const data = useStaticQuery(graphql`
    query  {
        allWpDestination(limit: 100000) {
          nodes {
            title
          }
        }
      }
    `)

    return data.allWpDestination.nodes?.map(item => item.title.toLowerCase())
}