const AllSearchQuery = `{
  allWpExperience {
    nodes {
      id
      title
      uri
      date
      nodeType
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      commonDataAttributes {
        textCountry
        textContinent
        standfirst
      }
    }
  }
  allWpDestination {
    nodes {
      id
      title
      uri
      date
      nodeType
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      commonDataAttributes {
        textCountry
        textContinent
        standfirst
      }
    }
  }
  allWpPlaceToStay {
    nodes {
      id
      title
      uri
      date
      nodeType
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      commonDataAttributes {
        textCountry
        textContinent
        standfirst
      }
    }
  }
  allWpRoundUp {
    nodes {
      id
      title
      uri
      date
      nodeType
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      commonDataAttributes {
        textCountry
        textContinent
        standfirst
      }
    }
  }
  allWpItinerary {
    nodes {
      id
      title
      uri
      date
      nodeType
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      commonDataAttributes {
        textCountry
        textContinent
        standfirst
      }
    }
  }
}

`;

const queries = [
  {
    query: AllSearchQuery,
    transformer: ({ data }) => {
      const array = Object.entries(data);
      let fullArray = array.map((item) => item[1].nodes).flat();
      return fullArray;
    },
    indexName: `Alldata`,
  },
];
// console.log(queries);
module.exports = queries;
