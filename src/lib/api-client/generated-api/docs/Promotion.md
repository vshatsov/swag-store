
# Promotion


## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`description` | string
`discountPercent` | number
`code` | string
`validFrom` | Date
`validUntil` | Date
`active` | boolean

## Example

```typescript
import type { Promotion } from ''

// TODO: Update the object below with actual values
const example = {
  "id": promo_001,
  "title": Summer Ship-a-thon,
  "description": Get 20% off all t-shirts and hoodies. Use code at checkout.,
  "discountPercent": 20,
  "code": SHIPIT20,
  "validFrom": 2025-06-01T00:00:00.000+00:00,
  "validUntil": 2025-09-01T00:00:00.000+00:00,
  "active": true,
} satisfies Promotion

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Promotion
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


