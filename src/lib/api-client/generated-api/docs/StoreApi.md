# StoreApi

All URIs are relative to *https://vercel-swag-store-api.vercel.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getStoreConfig**](StoreApi.md#getstoreconfig) | **GET** /store/config | Get store configuration |



## getStoreConfig

> GetStoreConfig200Response getStoreConfig()

Get store configuration

Returns store configuration including enabled features, social links, and SEO defaults.

### Example

```ts
import {
  Configuration,
  StoreApi,
} from '';
import type { GetStoreConfigRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new StoreApi(config);

  try {
    const data = await api.getStoreConfig();
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

[**GetStoreConfig200Response**](GetStoreConfig200Response.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Store configuration |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

