# Generate dummy shopify data

This repository is a helper, to auto-populate dummy Shopify data:

- Products
- Articles

## Usage

1. Obtain credentials
   Use `.example.env` to enter your shop name and access token. Access token can be created from `Admin -> Apps and sales channels -> Develop Aps -> Create an app`. In `Configuration` tab, select the desired access scopes:

- write_products - For populating products
- write_content - For populating articles
  In `API credentials` tab choose to install the app, then use the generated access token in `.env` file. Token will be revealed only once, so if you lose it, before saving it in `.env`, you must uninstall the app and then just install it again.

2. Run `npm install` to install dependencies.
3. Populate the desired resource json(s) with data in `/resources` folder. More info:
   https://shopify.dev/docs/api/admin-rest/2023-10/resources/product#resource-object
   https://shopify.dev/docs/api/admin-rest/2023-10/resources/article#resource-object
   For images, you can use `src` or base64 strings, as attachment, for example:

```json
"image": {
  "attachment": "R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\n"
}
```

4. Run `npm run start`.
5. Follow the terminal instructions.
