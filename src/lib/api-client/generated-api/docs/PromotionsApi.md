# PromotionsApi

All URIs are relative to *https://vercel-swag-store-api.vercel.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getActivePromotion**](PromotionsApi.md#getactivepromotion) | **GET** /promotions | Get active promotion |



## getActivePromotion

> PromotionResponse getActivePromotion()

Get active promotion

Returns a randomly selected active promotional banner. May return a different promotion on each request.

### Example

```ts
import {
  Configuration,
  PromotionsApi,
} from '';
import type { GetActivePromotionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new PromotionsApi(config);

  try {
    const data = await api.getActivePromotion();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**PromotionResponse**](PromotionResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Active promotion |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

