const config = {
  // pathPrefix: "",
  layoutWidth: {
    page: "lg",
    post: "lg",
    archive: "lg",
  },
  createCategories: false,
  createTags: false,
  createPosts: false,
  createUsers: false,
  withApollo: false,
  developLimit: 50,
  gatsbySourceWordPressOptions: {
    schema: {
      perPage: 1, // currently set to 100
      requestConcurrency: 1, // currently set to 15
      previewRequestConcurrency: 1, // currently set to 5
      timeout: 90000,
      queryDepth: 1,
      circularQueryLimit: 1,
    },
    type: {
      MediaItem: {
        localFile: {
          requestConcurrency: 1,
        },
      },
    },
    develop: {
      hardCacheData: true,
      nodeUpdateInterval: 20000,
    },
    production: {
      hardCacheMediaFiles: true,
    },
  },

  // webfontsOptions: {
  //   fonts: {
  //     google: [
  //       { family: "Roboto", variants: ["400", "400i", "500"] },
  //       {
  //         family: "Roboto Mono",
  //         variants: ["500"],
  //       },
  //     ],
  //   },
  // },
};

module.exports = config;
