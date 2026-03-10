
# Category


## Properties

Name | Type
------------ | -------------
`slug` | string
`name` | string
`productCount` | number

## Example

```typescript
import type { Category } from ''

// TODO: Update the object below with actual values
const example = {
  "slug": t-shirts,
  "name": T Shirts,
  "productCount": 6,
} satisfies Category

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Category
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


