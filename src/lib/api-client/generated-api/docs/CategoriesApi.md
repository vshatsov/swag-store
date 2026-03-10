# CategoriesApi

All URIs are relative to *https://vercel-swag-store-api.vercel.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listCategories**](CategoriesApi.md#listcategories) | **GET** /categories | List all categories |



## listCategories

> CategoryListResponse listCategories()

List all categories

Returns all product categories with their product counts.

### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ListCategoriesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new CategoriesApi(config);

  try {
    const data = await api.listCategories();
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

[**CategoryListResponse**](CategoryListResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of categories |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

