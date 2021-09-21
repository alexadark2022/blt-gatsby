const fetch = require("node-fetch");

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const response = await fetch(
    "https://api.viator.com/partner/products/modified-since?count=500",
    {
      headers: {
        "exp-api-key": "15f04fef-e879-4b45-86c0-84589e8a160d",
        "Accept-language": "en-US",
        Accept: "application/json;version=2.0",
      },
    }
  );
  const data = await response.json();

  //   Creating nodes
  for (const result of data.products) {
    const nodeId = createNodeId(`${result.productCode}`);
    const nodeContent = JSON.stringify(result);
    const node = Object.assign({}, result, {
      id: nodeId,
      originalId: result.productCode,
      parent: null,
      children: [],
      internal: {
        type: "ViatorProducts",
        content: nodeContent,
        contentDigest: createContentDigest(result),
        description: "Products from viator",
      },
    });
    createNode(node);
  }
};
