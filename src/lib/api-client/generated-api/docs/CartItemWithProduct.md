
# CartItemWithProduct


## Properties

Name | Type
------------ | -------------
`productId` | string
`quantity` | number
`addedAt` | Date
`product` | [Product](Product.md)
`lineTotal` | number

## Example

```typescript
import type { CartItemWithProduct } from ''

// TODO: Update the object below with actual values
const example = {
  "productId": tshirt_001,
  "quantity": 2,
  "addedAt": null,
  "product": null,
  "lineTotal": 5600,
} satisfies CartItemWithProduct

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CartItemWithProduct
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


