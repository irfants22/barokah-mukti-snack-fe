import ProductClient from "@/components/product/ProductClient";
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <Suspense
      fallback={<div className="text-center py-10">Memuat halaman...</div>}
    >
      <ProductClient />
    </Suspense>
  );
}
