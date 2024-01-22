"use client";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { repositoryName, createClient } from "@/prismicio";

export type ProductsProps = SliceComponentProps<Content.ProductsSlice>;

const Products = async ({ slice }: ProductsProps): Promise<JSX.Element> => {
  const client = createClient();
  const doc: any = await client.getFirst();
  const url = `https://migration.prismic.io/documents/${doc.id}`;
  console.log("==>doc", doc);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.title} />
      <div>
        {slice.items.map(
          (
            { product_name, product_description, product_link, product_signed },
            index
          ) => (
            <div key={index}>
              ------------------------------------
              <h3>{product_name}</h3>
              <span>{product_description}</span>
              <br />
              <PrismicNextLink field={product_link}>
                {slice.primary.product_link_label}
              </PrismicNextLink>
              <button
                onClick={async () => {
                  function updateProductSigned() {
                    slice.items[index].product_signed =
                      !slice.items[index].product_signed;
                  }
                  updateProductSigned();

                  doc.data.slices[1] = slice;

                  console.log("==>JSON.stringify(doc)", JSON.stringify(doc));
                  // Send the update
                  const response = await fetch(url, {
                    headers: {
                      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6InByaXNtaWMtZ2lmdC1saXN0LWU3NWEzZDk2LTQ3OWUtNDdjYS05YWU5LWQwNWVjNWJhMDgyNF80IiwiZGF0ZSI6MTcwNTY5Njg4MCwiZG9tYWluIjoicHJpc21pYy1naWZ0LWxpc3QiLCJhcHBOYW1lIjoiVGVzdGUiLCJpYXQiOjE3MDU2OTY4ODB9.TUV-DUA9paHdC0A_yMs8wxbuFEqoD7ZBhV_SqbKcfn0`,
                      "x-api-key": "CCNIlI0Vz41J66oFwsHUXaZa6NYFIY6z7aDF62Bc",
                      repository: repositoryName,
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      mode: "no-cors",
                    },
                    method: "PUT",
                    body: JSON.stringify(doc),
                  });

                  console.log(await response.json());
                }}
              >
                Clique aqui
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Products;
