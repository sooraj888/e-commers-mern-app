import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/product/productSlice";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default function ProductPage() {
  const { products, productCount, loading, error, errorMessage } = useSelector(
    (state: any) => state.products
  );
  const dispatch = useDispatch<any>();
  const bottomAlert = useAlert();
  const [pagination, setPagination] = useState(1);

  useEffect((): any => {
    if (error) {
      return bottomAlert.error(errorMessage);
    }
    dispatch(getAllProducts({ page: pagination }));
  }, [dispatch, error, bottomAlert, pagination]);

  const handlePageClick = (event: any) => {
    setPagination(Number(event?.selected) + 1);
  };

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

      <ReactPaginate
        breakLabel="---"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={Math.floor(productCount / 4) + 1}
        renderOnZeroPageCount={null}
        nextLabel={"Next"}
        previousLabel={"Previous"}
        className="pagination"
        nextLinkClassName="button"
        previousLinkClassName="button"
        disabledLinkClassName="d"
        activeLinkClassName="activeButton"
        pageLinkClassName="numberButton"
      />
    </Fragment>
  );
}
