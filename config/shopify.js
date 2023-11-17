import Shopify from "shopify-api-node";

export default function setShopify(shopName, accessToken) {
  return new Shopify({ shopName, accessToken });
}
