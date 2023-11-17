import fetchJson from "./fetch-json.js";

let iteration = 0;
let json = null;

export default async function resourceCreate(shopify, params, limit) {
  if (!json) {
    json = await fetchJson(params.type);
    if (json.error) {
      return console.log(`${json.error}\n${json.message}`);
    }
    resourceCreate(shopify, params, limit);
    return;
  }

  iteration++;
  try {
    const resource =
      params.type === "article"
        ? await shopify.article.create(params.blogId, json)
        : await shopify.product.create(json);
    console.log(`${resource.handle} added to ${process.env.SHOP} store.`);
  } catch (error) {
    if (error.message.includes("422")) {
      return console.log("Error: Check your json file for missing properties!");
    }
    if (error.message.includes("403")) {
      return console.log(
        `${error.message}: Please check your access token scopes. Must include 'write_products' and/or 'write_content' scopes.`
      );
    }
    return console.log(error.message);
  }

  if (iteration >= limit) {
    console.log(`${limit} ${params.type}(s) added!`);
    return;
  }

  resourceCreate(shopify, params, limit);
}
