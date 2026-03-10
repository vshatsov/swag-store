
# Product


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`slug` | string
`description` | string
`price` | number
`currency` | string
`category` | string
`images` | Array&lt;string&gt;
`featured` | boolean
`tags` | Array&lt;string&gt;
`createdAt` | Date

## Example

```typescript
import type { Product } from ''

// TODO: Update the object below with actual values
const example = {
  "id": tshirt_001,
  "name": Black Crewneck T-Shirt,
  "slug": black-crewneck-t-shirt,
  "description": Plain black crewneck tee with a small solid white equilateral triangle facing upward on the left chest...,
  "price": 3000,
  "currency": USD,
  "category": t-shirts,
  "images": null,
  "featured": true,
  "tags": [black, tee, crewneck, triangle],
  "createdAt": 2025-01-10T10:00:00.000+00:00,
} satisfies Product

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Product
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


