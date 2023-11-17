import "dotenv/config";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output, exit } from "node:process";
import setShopify from "./config/shopify.js";
import resourceCreate from "./helpers/resource-create.js";

const shopify = setShopify(process.env.SHOP, process.env.ACCESS_TOKEN);
const readlineInterface = readline.createInterface({ input, output });
let blogId = null;
const resourceType = await readlineInterface.question(
  "What resource do you want to create? Accepts: product or article\n"
);

if (resourceType !== "product" && resourceType !== "article") {
  console.log("Please enter a valid resource type: product or article!");
  exit(1);
}

if (resourceType === "article") {
  blogId = await readlineInterface.question("Enter blog ID:\n");
}

const limit = await readlineInterface.question(
  `How many ${resourceType}(s) should be generated?\n`
);

if (!Number.isInteger(Number(limit))) {
  console.log("Please enter a valid value!");
  exit(1);
}

resourceCreate(
  shopify,
  {
    type: resourceType,
    blogId,
  },
  Number(limit)
);

readlineInterface.close();
