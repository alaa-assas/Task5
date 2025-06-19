import axios from "axios";
import { useEffect, useState } from "react";
import type { Item } from "../../../types/Item";
import PaginationCustom from "../../../components/PaginationCustom/PaginationCustom";
import SearchInput from "../../../components/InputSearchCustom/InputSearchCustom";
import ItemCard from "../../../components/ItemCard/ItemCard";
import { useNavigate } from "react-router-dom";
import BtnCustom from "../../../components/BtnCustom/BtnCustom";
import "./ItemsIndex.css";
import Loader from "../../../components/Loader/Loader";
import ErrorReload from "../../../components/ErrorReload/ErrorReload";
import { Row } from "react-bootstrap";


const ItemsIndex = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Item[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsToShow, setItemsToShow] = useState(6);

  const totalPages = Math.ceil(products.length / itemsToShow);
  const indexOfLastItem = currentPage * itemsToShow;
  const indexOfFirstItem = indexOfLastItem - itemsToShow;

  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const updateItemsToShow = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setItemsToShow(8); 
    } else if (width >= 992) {
      setItemsToShow(6); 
    } else if(width >= 576){
      setItemsToShow(4);
    } else {
      setItemsToShow(2);
    }         
  };

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchProducts = async () => {
    // function to fetch Item from backend
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://web-production-3ca4c.up.railway.app/api/items",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts(res.data);
      setFilteredProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load products. Please try again.");
      setLoading(false);
    }
  };



  // Search for products by name
  const Search = (query: string) => {
    setCurrentPage(1);

    if (!query.trim()) {
      //if search box empty return all items
      setFilteredProducts(products);
    } else {
      //check for all items if contain word found in search box to return item match with it
      const results = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  };

  return (
    <div className="items-page-content d-flex flex-column align-items-center container-lg pt-4">
      {/* search box */}
      <SearchInput
        placeholder="Search product by name"
        classExtra="pb-3 pb-xl-4"
        onSearch={Search}
      />

      <BtnCustom
        name={"ADD NEW PRODUCT"}
        classExtra="p-3 align-self-lg-end align-self-center mb-32 fs-14"
        onClick={() => navigate("add")}
      />

      {loading && <Loader />}

      {error && (
        <ErrorReload
          error={error}
          classExtra="items-container"
          onClick={() => {
            fetchProducts();
            setLoading(true);
            setError(null);
          }}
        />
      )}
      {!loading && !error && (
        <div className="items-container mb-80">
        <Row className="g-xxl-4 g-xl-3 g-2 d-grid grid-cols-4">
          {currentProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            currentProducts.map((item) => (
              // <Col key={item.id} xs={3} className="d-flex justify-content-center">
                <ItemCard
                  id={item.id}
                  productName={item.name}
                  src={item.image_url}
                  onEdit={() => navigate(`edit/${item.id}`)}
                  onDeleteSuccess={fetchProducts}
                />
              // </Col>
            ))
          )}
        </Row>
      </div>
      )}
      {/* pagination component */}
      {totalPages > 0 && (
        <PaginationCustom
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ItemsIndex;
