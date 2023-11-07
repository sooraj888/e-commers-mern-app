import React, { Fragment, useEffect, useState, useMemo, memo } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/product/productSlice";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import Styles from "./ProductPage.module.css";
import {
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SliderMarkCompt from "../miscellaneous/SliderMarkCompt";
import RangeSliderComp from "../miscellaneous/RangeSliderComp";

const categoryArray = [
  "Laptop",
  "Footwears",
  "Bottom",
  "Tops",
  "SmartPhone",
  "Camera",
  "mobile",
  "wearable dress",
];
const ProductPage = memo(() => {
  const {
    products,
    productCount,
    sortedProductCount,
    loading,
    error,
    errorMessage,
  } = useSelector((state: any) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const dispatch = useDispatch<any>();
  const bottomAlert = useAlert();

  const contentPerPage = 8;
  const pageCount = Math.ceil(sortedProductCount / contentPerPage);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  let previousPriceRange = [0, 100000];

  let timeOut: NodeJS.Timeout;
  let filterTimeout: NodeJS.Timeout;
  const [category, setCategory] = useState("");

  const handlePageClick = (event: any) => {
    // window.scrollTo(0,
    setSearchParams((prevParams) => {
      prevParams.set("page", `${Number(event?.selected) + 1}`);
      prevParams.delete("search");
      return prevParams;
    });
  };

  const handleOnRemoveAllFilter = () => {
    setSearchParams((prevParams) => {
      prevParams.set("page", `1`);
      prevParams.delete("search");
      return prevParams;
    });
    setPriceRange([0, 100000]);
  };

  const handleCategory = (item: string) => {
    setCategory(item);
  };

  useEffect((): any => {
    if (error) {
      return bottomAlert.error(errorMessage);
    }
    timeOut = setTimeout(() => {
      dispatch(
        getAllProducts({
          page: Number(page) || 1,
          search: search || "",
          priceRange,
          category,
        })
      );
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch, error, bottomAlert, page, search, priceRange, category]);

  useEffect(() => {
    if (
      previousPriceRange[0] != priceRange[0] ||
      previousPriceRange[1] != priceRange[1]
    ) {
      filterTimeout = setTimeout(() => {
        if (Number(page) != 1) {
          setSearchParams((prevParams) => {
            prevParams.set("page", `1`);
            return prevParams;
          });
        }
      }, 500);
      return () => {
        clearTimeout(filterTimeout);
      };
    }
    if (priceRange) {
    }
  }, [priceRange]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={Styles.productContainer}>
          {products?.map((item: any) => {
            return <ProductCard product={item} key={item._id} />;
          })}
        </div>
      )}

      <div className={Styles.filters}>
        <button
          className={Styles.filterRemove}
          onClick={handleOnRemoveAllFilter}
        >
          Remove filters
        </button>
        <RangeSliderComp
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          min={0}
          max={100000}
        />
        <div className={Styles.category}>
          <p>Category</p>
          <ul className={Styles.categoryList}>
            {categoryArray?.map((item: string) => (
              <li key={item} onClick={() => handleCategory(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!loading && pageCount > 1 && (
        <ReactPaginate
          breakLabel="---"
          initialPage={Number(page) ? Number(page) - 1 || 0 : 0}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          nextLabel={"Next"}
          previousLabel={"Previous"}
          className="pagination"
          nextLinkClassName="button"
          previousLinkClassName="button"
          disabledLinkClassName="disabled"
          activeLinkClassName="activeButton"
          pageLinkClassName="numberButton"
        />
      )}
    </Fragment>
  );
});

export default ProductPage;
