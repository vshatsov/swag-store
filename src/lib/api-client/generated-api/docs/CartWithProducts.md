
# CartWithProducts


## Properties

Name | Type
------------ | -------------
`token` | string
`items` | [Array&lt;CartItemWithProduct&gt;](CartItemWithProduct.md)
`totalItems` | number
`subtotal` | number
`currency` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { CartWithProducts } from ''

// TODO: Update the object below with actual values
const example = {
  "token": null,
  "items": null,
  "totalItems": 2,
  "subtotal": 5600,
  "currency": USD,
  "createdAt": null,
  "updatedAt": null,
} satisfies CartWithProducts

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CartWithProducts
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


