// app/products/[id]/opengraph-image.tsx
import { getProductDetails } from "@/app/_api/get-product-details";
import { centsToDollarsString } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const alt = "Product preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productDetails = await getProductDetails(id);
  const product = productDetails.success ? productDetails.data : undefined;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#ffffff",
        padding: 48,
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 620,
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.6 }}>Vercel Swag Store</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 18 }}>
          {product?.name || ""}
        </div>
        <div style={{ fontSize: 36, marginTop: 24 }}>
          {centsToDollarsString(product?.price || 0)}
        </div>
        {product?.category ? (
          <div style={{ fontSize: 24, marginTop: 20, opacity: 0.7 }}>
            {product.category}
          </div>
        ) : null}
      </div>

      {product?.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={`${product?.name} Product Image`}
          width="420"
          height="420"
          style={{ objectFit: "contain" }}
        />
      ) : (
        <div
          style={{
            width: 420,
            height: 420,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f4f4f5",
            borderRadius: 12,
            fontSize: 48,
            color: "#a1a1aa",
          }}
        >
          No Image
        </div>
      )}
    </div>,
    size,
  );
}
