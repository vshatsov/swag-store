/** @format */

import { ImageIcon } from "lucide-react";
import Image, { type ImageProps } from "next/image";

type ProductImageProps = Omit<ImageProps, "src"> & {
  src: string | undefined | null;
};

export function ProductImage({ src, alt, ...props }: ProductImageProps) {
  if (!src) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-muted rounded">
        <ImageIcon className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return <Image src={src} alt={alt} {...props} />;
}
