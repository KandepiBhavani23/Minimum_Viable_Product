import React from "react";

const ProductTable = ({ prodData }) => {
	const productMap = prodData.reduce((map, product) => {
		const existingProduct = map[product.name];
		if (existingProduct) {
			existingProduct.totalPrice += product.unitPrice;
			existingProduct.totalRevenue += product.unitPrice * product.sold;
			existingProduct.totalSold += product.sold;
		} else {
			map[product.name] = {
				...product,
				totalPrice: product.unitPrice,
				totalRevenue: product.unitPrice * product.sold,
				totalSold: product.sold,
			};
		}
		return map;
	}, {});

	// const sortedProducts = [...prodData].sort((a, b) =>
	// 	a.name.localeCompare(b.name)
	// );

	const sortedProducts = Object.values(productMap).sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	const totalRevenue = sortedProducts.reduce(
		(total, product) => total + product.totalRevenue,
		0
	);

	return (
		<React.Fragment>
			{sortedProducts.map((product) => (
				<React.Fragment key={product.id}>
					<tr className="border-2 border-solid border-white text-orange-500 p-2 text-center">
						<td className="border-2 border-solid p-2 text-center">
							{product.id}
						</td>
						<td className="border-2 border-solid p-2 text-center">
							{product.name}
						</td>
						<td>{product.unitPrice}</td>
						<td className="border-2 border-solid p-2 text-center">
							{product.totalPrice.toFixed(2)}
						</td>
						<td className="border-2 border-solid p-2 text-center">
							{product.totalSold}
						</td>
						<td className="border-2 border-solid p-2">
							{product.totalRevenue.toFixed(2)}
						</td>
					</tr>
				</React.Fragment>
			))}
			<tr className="border-2 border-solid border-white text-white p-2 font-bold">
				<td className="border-2 border-solid p-2 text-center" colSpan="5">
					Total Revenue
				</td>
				<td className="border-2 text-center border-solid p-2">
					{totalRevenue.toFixed(2)}
				</td>
			</tr>
		</React.Fragment>
	);
};

export default ProductTable;
