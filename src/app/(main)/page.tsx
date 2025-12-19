import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "CYCLE LINE Store",
	description: "A store for CYCLE LINE LIMITED",
};

export default async function Page() {
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
		},
		revalidate: 60,
	});

	// Gracefully handle empty data
	if (!data.collection?.products?.edges?.length) {
		return (
			<div>
				<section className="mx-auto max-w-7xl p-8 pb-16">
					<h2 className="sr-only">Product list</h2>
					<div className="py-16 text-center">
						<p className="text-lg text-gray-500">No products found</p>
						<p className="mt-2 text-sm text-gray-400">Please check back later</p>
					</div>
				</section>
			</div>
		);
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<div>
			<section className="mx-auto max-w-7xl p-8 pb-16">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products} />
			</section>
		</div>
	);
}
