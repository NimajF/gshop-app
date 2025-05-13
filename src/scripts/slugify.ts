export function slugify(productName: string): string {
  return productName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function slugifySlugWithId(
  productName: string,
  productId: string | { toString: () => string }
): string {
  const idString =
    typeof productId === "string" ? productId : productId.toString();
  return `${slugify(productName)}-${idString.slice(-4)}`;
}
