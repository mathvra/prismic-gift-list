import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type ProductsProps = SliceComponentProps<Content.ProductsSlice>;

const Products = ({ slice }: ProductsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.title} />
      <div>
        {slice.items.map(
          ({ product_name, product_description, product_link }, index) => (
            <div key={index}>
              ------------------------------------
              <h3>{product_name}</h3>
              <span>{product_description}</span>
              <br />
              <PrismicNextLink field={product_link}>
                {slice.primary.product_link_label}
              </PrismicNextLink>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Products;
