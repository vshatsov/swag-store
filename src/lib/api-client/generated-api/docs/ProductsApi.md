# ProductsApi

All URIs are relative to *https://vercel-swag-store-api.vercel.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getProduct**](ProductsApi.md#getproduct) | **GET** /products/{id} | Get product details |
| [**listProducts**](ProductsApi.md#listproducts) | **GET** /products | List products |



## getProduct

> ProductResponse getProduct(id)

Get product details

Returns a single product by its ID or slug.

### Example

```ts
import {
  Configuration,
  ProductsApi,
} from '';
import type { GetProductRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new ProductsApi(config);

  const body = {
    // string | Product ID (e.g. tshirt_001) or slug (e.g. black-crewneck-t-shirt)
    id: id_example,
  } satisfies GetProductRequest;

  try {
    const data = await api.getProduct(body);
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

[**ProductResponse**](ProductResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Product details |  -  |
| **404** | Product not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listProducts

> ProductListResponse listProducts(page, limit, category, search, featured)

List products

Returns a paginated list of products. Supports filtering by category, search term, and featured status.

### Example

```ts
import {
  Configuration,
  ProductsApi,
} from '';
import type { ListProductsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new ProductsApi(config);

  const body = {
    // number | Page number (starts at 1) (optional)
    page: 56,
    // number | Items per page (max 100) (optional)
    limit: 56,
    // 'bottles' | 'cups' | 'mugs' | 'desk' | 'stationery' | 'accessories' | 'bags' | 'hats' | 't-shirts' | 'hoodies' | 'socks' | 'tech' | 'books' | Filter by category slug (optional)
    category: category_example,
    // string | Search products by name, description, or tags (optional)
    search: search_example,
    // 'true' | 'false' | Filter by featured status (optional)
    featured: featured_example,
  } satisfies ListProductsRequest;

  try {
    const data = await api.listProducts(body);
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
| **page** | `number` | Page number (starts at 1) | [Optional] [Defaults to `1`] |
| **limit** | `number` | Items per page (max 100) | [Optional] [Defaults to `20`] |
| **category** | `bottles`, `cups`, `mugs`, `desk`, `stationery`, `accessories`, `bags`, `hats`, `t-shirts`, `hoodies`, `socks`, `tech`, `books` | Filter by category slug | [Optional] [Defaults to `undefined`] [Enum: bottles, cups, mugs, desk, stationery, accessories, bags, hats, t-shirts, hoodies, socks, tech, books] |
| **search** | `string` | Search products by name, description, or tags | [Optional] [Defaults to `undefined`] |
| **featured** | `true`, `false` | Filter by featured status | [Optional] [Defaults to `undefined`] [Enum: true, false] |

### Return type

[**ProductListResponse**](ProductListResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Paginated product list |  -  |
| **422** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

