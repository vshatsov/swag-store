
# GetStoreConfig200ResponseDataSeo


## Properties

Name | Type
------------ | -------------
`defaultTitle` | string
`titleTemplate` | string
`defaultDescription` | string

## Example

```typescript
import type { GetStoreConfig200ResponseDataSeo } from ''

// TODO: Update the object below with actual values
const example = {
  "defaultTitle": Vercel Swag Store,
  "titleTemplate": %s | Vercel Swag Store,
  "defaultDescription": Official Vercel merchandise. Premium developer apparel, accessories, and gear.,
} satisfies GetStoreConfig200ResponseDataSeo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetStoreConfig200ResponseDataSeo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


