import App from "./App.js";
import ProductsData from "./components/ProductsData.jsx";
import { render } from "@testing-library/react";

test("renders products data", () => {
	render(<ProductsData />);
});

test("renders app", () => {
	render(<App />);
});
