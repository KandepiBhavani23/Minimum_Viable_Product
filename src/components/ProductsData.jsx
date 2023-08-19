import { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import searchicon from "../assets/search-icon.png";

const ProductsData = () => {
	const [products, setProducts] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("/api/productData.json"); // Adjust the path if needed
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	useEffect(() => {
		const combinedProducts = products.map((branch) => branch.products).flat();
		const filteredNames = combinedProducts.filter((eachName) => {
			return eachName.name.toLowerCase().includes(searchName.toLowerCase());
		});
		setFilteredProducts(filteredNames);
	}, [products, searchName]);

	return (
		<div className="background min-h-[100vh]">
			<div className="flex flex-col justify-center items-center py-10">
				<div className="flex justify-between border-2 border-orange-500  text-white items-center w-[500px] rounded-full px-5 py-2 mb-8 shadow-lg cursor-pointer">
					<input
						type="text"
						placeholder="Search Products...🍎🥑🍒🍓"
						value={searchName}
						onChange={(e) => setSearchName(e.target.value)}
						className="outline-none w-full bg-transparent"
					/>
					<img src={searchicon} alt="search" className="w-8 h-8" />
				</div>

				<table>
					<thead className="border-white text-white">
						<tr className="border-2 border-solid p-4 text-left">
							<th className="border-2 border-solid text-center p-4">
								Product ID
							</th>
							<th className="border-2 border-solid p-4 text-left">
								Product Name
							</th>
							<th className="border-2 border-solid p-4 text-left">
								Unit Price
							</th>
							<th className="border-2 border-solid p-4 text-left">
								Total Unit Price
							</th>
							<th className="border-2 border-solid p-4 text-left">
								Total Sold
							</th>
							<th className="p-4">Total Revenue</th>
						</tr>
					</thead>

					<tbody>
						<ProductTable prodData={filteredProducts} />
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductsData;
