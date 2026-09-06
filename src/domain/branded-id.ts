export type BrandedId<Brand extends string> = string & { readonly __brand: Brand };
