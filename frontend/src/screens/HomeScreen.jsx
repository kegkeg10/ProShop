import React from "react";
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams()

  const { data, isLoading, error  } = useGetProductsQuery({keyword, pageNumber});
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
            <>
            <h1>Latest Products</h1>
            <Row>
                {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
                ))}
            </Row>
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
