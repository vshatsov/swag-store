
# GetStoreConfig200ResponseDataFeatures

Feature flags indicating which store features are enabled.

## Properties

Name | Type
------------ | -------------
`wishlist` | boolean
`productComparison` | boolean
`reviews` | boolean
`liveChat` | boolean
`recentlyViewed` | boolean

## Example

```typescript
import type { GetStoreConfig200ResponseDataFeatures } from ''

// TODO: Update the object below with actual values
const example = {
  "wishlist": true,
  "productComparison": true,
  "reviews": true,
  "liveChat": true,
  "recentlyViewed": true,
} satisfies GetStoreConfig200ResponseDataFeatures

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetStoreConfig200ResponseDataFeatures
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


