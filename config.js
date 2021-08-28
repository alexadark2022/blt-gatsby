const config = {
  // pathPrefix: "",
  layoutWidth: {
    page: "lg",
    post: "lg",
    archive: "lg",
  },
  // developLimit: 100,
  gatsbySourceWordPressOptions: {
    schema: {
      perPage: 20, // currently set to 100
      requestConcurrency: 1, // currently set to 15
      previewRequestConcurrency: 1, // currently set to 5
      timeout: 90000,
    },
    develop: {
      hardCacheData: true,
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
}

module.exports = config
