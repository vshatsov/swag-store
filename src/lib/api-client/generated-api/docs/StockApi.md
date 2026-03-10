# StockApi

All URIs are relative to *https://vercel-swag-store-api.vercel.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getProductStock**](StockApi.md#getproductstock) | **GET** /products/{id}/stock | Get real-time stock availability |



## getProductStock

> StockResponse getProductStock(id)

Get real-time stock availability

Returns the current stock level for a product. Stock levels are dynamic and may change on every request.

### Example

```ts
import {
  Configuration,
  StockApi,
} from '';
import type { GetProductStockRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new StockApi(config);

  const body = {
    // string | Product ID (e.g. tshirt_001) or slug (e.g. black-crewneck-t-shirt)
    id: id_example,
  } satisfies GetProductStockRequest;

  try {
    const data = await api.getProductStock(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Product ID (e.g. tshirt_001) or slug (e.g. black-crewneck-t-shirt) | [Defaults to `undefined`] |

### Return type

[**StockResponse**](StockResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stock availability |  -  |
| **404** | Product not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

