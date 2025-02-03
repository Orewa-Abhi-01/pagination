import { useEffect, useState } from "react";
import "./styles.css";

export function ProductCard({ image, title }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <h3 className="product-title">{title}</h3>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const page_size = 6;
  const totalProducts = products.length;
  const no_of_pages = Math.ceil(totalProducts / page_size);

  const startVal = currPage * page_size;
  const endVal = startVal + page_size;

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetch("https://dummyjson.com/products");
      const json = await data.json();
      // console.log(json.products);
      setProducts(json.products);
    };
    fetchProducts();
  }, []);

  function handleChange(n) {
    setCurrPage(n);
  }

  function gotoPrevPage() {
    setCurrPage((prev) => prev - 1);
  }

  function gotoNextPage() {
    setCurrPage((prev) => prev + 1);
    console.log(currPage);
  }

  return (
    <div className="App">
      <h1>Products</h1>
      <div className="pagination-container">
        <button
          disabled={currPage === 0}
          className="page-number"
          onClick={gotoPrevPage}
        >
          ◀️
        </button>
        {[...Array(no_of_pages).keys()].map((n) => (
          <button
            onClick={() => handleChange(n)}
            className={"page-number " + (n === currPage ? "active" : "")}
          >
            {n + 1}
          </button>
        ))}
        <button
          disabled={currPage === no_of_pages - 1}
          className="page-number"
          onClick={gotoNextPage}
        >
          ▶️
        </button>
      </div>

      <div className="product-container">
        {products.slice(startVal, endVal).map((elem, i) => (
          <ProductCard image={elem.thumbnail} title={elem.title} />
        ))}
      </div>
    </div>
  );
}
