
# StockInfo


## Properties

Name | Type
------------ | -------------
`productId` | string
`stock` | number
`inStock` | boolean
`lowStock` | boolean

## Example

```typescript
import type { StockInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "productId": tshirt_001,
  "stock": 12,
  "inStock": true,
  "lowStock": false,
} satisfies StockInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StockInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


