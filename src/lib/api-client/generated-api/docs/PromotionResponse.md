
# PromotionResponse


## Properties

Name | Type
------------ | -------------
`success` | boolean
`data` | [Promotion](Promotion.md)

## Example

```typescript
import type { PromotionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "success": true,
  "data": null,
} satisfies PromotionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PromotionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


