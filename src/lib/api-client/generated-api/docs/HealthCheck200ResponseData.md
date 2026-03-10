
# HealthCheck200ResponseData


## Properties

Name | Type
------------ | -------------
`status` | string
`timestamp` | Date
`services` | [HealthCheck200ResponseDataServices](HealthCheck200ResponseDataServices.md)

## Example

```typescript
import type { HealthCheck200ResponseData } from ''

// TODO: Update the object below with actual values
const example = {
  "status": ok,
  "timestamp": 2025-06-01T12:00:00Z,
  "services": null,
} satisfies HealthCheck200ResponseData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HealthCheck200ResponseData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


