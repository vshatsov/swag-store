# CartApi

All URIs are relative to *https://vercel-swag-store-api.vercel.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addItemToCart**](CartApi.md#additemtocart) | **POST** /cart | Add an item to a cart |
| [**createCart**](CartApi.md#createcart) | **POST** /cart/create | Create a new cart |
| [**getCart**](CartApi.md#getcart) | **GET** /cart | Get cart contents |
| [**removeCartItem**](CartApi.md#removecartitem) | **DELETE** /cart/{itemId} | Remove item from cart |
| [**updateCartItem**](CartApi.md#updatecartitemoperation) | **PATCH** /cart/{itemId} | Update item quantity |



## addItemToCart

> CartResponse addItemToCart(xCartToken, addToCartRequest)

Add an item to a cart

Adds a product to an existing cart. Requires the &#x60;x-cart-token&#x60; header and a JSON body with &#x60;productId&#x60; and &#x60;quantity&#x60;.

### Example

```ts
import {
  Configuration,
  CartApi,
} from '';
import type { AddItemToCartRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new CartApi(config);

  const body = {
    // string | The cart token received when creating a cart via POST /cart/create
    xCartToken: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // AddToCartRequest | The product and quantity to add to the cart.
    addToCartRequest: {"productId":"tshirt_001","quantity":2},
  } satisfies AddItemToCartRequest;

  try {
    const data = await api.addItemToCart(body);
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
| **xCartToken** | `string` | The cart token received when creating a cart via POST /cart/create | [Defaults to `undefined`] |
| **addToCartRequest** | [AddToCartRequest](AddToCartRequest.md) | The product and quantity to add to the cart. | |

### Return type

[**CartResponse**](CartResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Item added to cart |  -  |
| **400** | Bad request (missing header or invalid JSON) |  -  |
| **404** | Cart or product not found |  -  |
| **422** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCart

> CartResponse createCart()

Create a new cart

Creates a new empty cart. The response includes the cart token in the &#x60;x-cart-token&#x60; response header. Store this token and include it in all subsequent cart requests.

### Example

```ts
import {
  Configuration,
  CartApi,
} from '';
import type { CreateCartRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new CartApi(config);

  try {
    const data = await api.createCart();
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

[**CartResponse**](CartResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | New empty cart created |  * x-cart-token - The cart token to use for subsequent cart operations <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCart

> CartResponse getCart(xCartToken)

Get cart contents

Retrieves the full cart with product details and calculated totals. Requires the &#x60;x-cart-token&#x60; header.

### Example

```ts
import {
  Configuration,
  CartApi,
} from '';
import type { GetCartRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new CartApi(config);

  const body = {
    // string | The cart token received when creating a cart
    xCartToken: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetCartRequest;

  try {
    const data = await api.getCart(body);
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
| **xCartToken** | `string` | The cart token received when creating a cart | [Defaults to `undefined`] |

### Return type

[**CartResponse**](CartResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Cart with product details and totals |  -  |
| **400** | Missing x-cart-token header |  -  |
| **404** | Cart not found or expired |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeCartItem

> CartResponse removeCartItem(itemId, xCartToken)

Remove item from cart

Remove a specific item from the cart entirely.

### Example

```ts
import {
  Configuration,
  CartApi,
} from '';
import type { RemoveCartItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new CartApi(config);

  const body = {
    // string | The product ID of the item to remove (e.g. tshirt_001)
    itemId: itemId_example,
    // string | The cart token
    xCartToken: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies RemoveCartItemRequest;

  try {
    const data = await api.removeCartItem(body);
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
| **itemId** | `string` | The product ID of the item to remove (e.g. tshirt_001) | [Defaults to `undefined`] |
| **xCartToken** | `string` | The cart token | [Defaults to `undefined`] |

### Return type

[**CartResponse**](CartResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated cart without the removed item |  -  |
| **400** | Bad request |  -  |
| **404** | Cart or item not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateCartItem

> CartResponse updateCartItem(itemId, xCartToken, updateCartItemRequest)

Update item quantity

Update the quantity of a specific item in the cart. Set quantity to 0 to remove the item.

### Example

```ts
import {
  Configuration,
  CartApi,
} from '';
import type { UpdateCartItemOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: deploymentProtection
    apiKey: "YOUR API KEY",
  });
  const api = new CartApi(config);

  const body = {
    // string | The product ID of the item to update (e.g. tshirt_001)
    itemId: itemId_example,
    // string | The cart token
    xCartToken: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // UpdateCartItemRequest
    updateCartItemRequest: {"quantity":3},
  } satisfies UpdateCartItemOperationRequest;

  try {
    const data = await api.updateCartItem(body);
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
| **itemId** | `string` | The product ID of the item to update (e.g. tshirt_001) | [Defaults to `undefined`] |
| **xCartToken** | `string` | The cart token | [Defaults to `undefined`] |
| **updateCartItemRequest** | [UpdateCartItemRequest](UpdateCartItemRequest.md) |  | |

### Return type

[**CartResponse**](CartResponse.md)

### Authorization

[deploymentProtection](../README.md#deploymentProtection)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated cart |  -  |
| **400** | Bad request |  -  |
| **404** | Cart or item not found |  -  |
| **422** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

