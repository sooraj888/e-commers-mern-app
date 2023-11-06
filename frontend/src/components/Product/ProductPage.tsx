import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/product/productSlice";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import {
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";

export default function ProductPage() {
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

  const navigate = useNavigate();
  const handlePageClick = (event: any) => {
    window.scrollTo(0, 0);
    setSearchParams((prevParams) => {
      prevParams.set("page", `${Number(event?.selected) + 1}`);
      return prevParams;
    });
  };
  useEffect((): any => {
    if (error) {
      return bottomAlert.error(errorMessage);
    }
    dispatch(getAllProducts({ page: Number(page) || 1, search: search || "" }));
  }, [dispatch, error, bottomAlert, page, search]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={"container"} id={"container"}>
          {products?.map((item: any) => {
            return <ProductCard product={item} key={item._id} />;
          })}
        </div>
      )}

      {pageCount > 1 && (
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
}
