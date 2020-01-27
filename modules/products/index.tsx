import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { Alert, Card, Col, Modal, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';

import {
  useGetProductsQuery,
  useUploadFileMutation,
  useCreateProductMutation,
  GetProductsDocument,
} from '../../generated/graphql';
import ProductForm from './ProductForm';
import { Error, Loading } from '../shared';
import withAuth from '../../utils/withAuth';

const imageFormatter = (cell: any) => (
  <img src={`${process.env.BACKEND_URL}/uploads/images/${cell}`} alt="" style={{ width: 50 }} />
);
const priceFormatter = (cell: any) => <span>${cell}</span>;
const isActiveFormatter = (cell: any) => (
  <span>
    {cell ? (
      <i className="fas fa-check-circle text-primary" style={{ fontSize: '1.2rem' }} />
    ) : (
      <i className="fas fa-times-circle text-danger" style={{ fontSize: '1.2rem' }} />
    )}
  </span>
);

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    hidden: true,
    sortFunc: (a: any) => {
      if (typeof a === 'string') return parseInt(a);
      return a;
    },
  },
  {
    dataField: 'imagePath',
    text: 'Image',
    sort: false,
    headerAlign: 'center',
    align: 'center',
    formatter: imageFormatter,
  },
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
  },
  {
    dataField: 'category',
    text: 'Category',
    sort: true,
  },
  {
    dataField: 'price',
    text: 'Price',
    sort: true,
    headerAlign: 'right',
    align: 'right',
    formatter: priceFormatter,
  },
  {
    dataField: 'quantity',
    text: 'Quantity',
    sort: true,
    headerAlign: 'right',
    align: 'right',
  },
  {
    dataField: 'isActive',
    text: 'Active',
    sort: true,
    headerAlign: 'center',
    align: 'center',
    formatter: isActiveFormatter,
  },
];

const defaultSorted = [
  {
    dataField: 'id',
    order: 'asc',
  },
];

interface Props {
  loading: boolean;
  error: string;
  data: Array<any>;
}

const Products: NextPage<Props> = () => {
  const [modalShow, setModalShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const { loading, error, data } = useGetProductsQuery();
  const [uploadFile] = useUploadFileMutation();
  const [createProduct] = useCreateProductMutation();

  const showModal = () => setModalShow(true);
  const closeModal = () => setModalShow(false);
  const showAlert = () => setAlertShow(true);
  const closeAlert = () => setAlertShow(false);

  const handleSubmit = async (value: any) => {
    try {
      await uploadFile({
        variables: {
          file: value.file,
        },
      });

      delete value['file'];

      await createProduct({
        variables: {
          data: value,
        },
        refetchQueries: [
          {
            query: GetProductsDocument,
          },
        ],
      });

      closeModal();
      showAlert();
      setTimeout(() => closeAlert(), 5000);
    } catch (err) {
      alert(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error title="Error" content={error.message} />;

  return (
    <>
      <NextSeo title="Products" description="List of Products" />
      <Alert show={alertShow} variant="success" onClose={() => closeAlert()} dismissible>
        <i className="fas fa-check-circle mr-2" />
        The product was added successfully.
      </Alert>
      <div className="animated fadeIn">
        <PaginationProvider
          pagination={paginationFactory({
            custom: true,
            page: 1,
            sizePerPage: 10,
            totalSize: data && data.getProducts.length,
          })}
        >
          {({ paginationProps, paginationTableProps }: any) => (
            <>
              <Row>
                <Col xs="12">
                  <Card>
                    <Card.Header>
                      <div className="d-flex d-column justify-content-between align-items-center">
                        <div>
                          <i className="fas fa-align-justify mr-2" />
                          <strong>PRODUCTS</strong>
                        </div>
                        <div>
                          <button className="btn bg-primary btn-circle" onClick={showModal}>
                            <i className="fas fa-plus text-white" />
                          </button>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex d-column justify-content-between">
                        <div className="d-none d-sm-block">
                          Show <SizePerPageDropdownStandalone className="mx-2 bg-light" {...paginationProps} /> entries
                        </div>
                        <div className="form-group form-group-sm react-bs-table-search-form input-group input-group-sm col-md-6">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Search"
                            value=""
                            onChange={() => null}
                            style={{ height: '35px' }}
                          />
                          <button
                            className="btn btn-outline-primary react-bs-table-search-clear-btn ml-2"
                            type="button"
                            style={{ width: '75px' }}
                          >
                            Search
                          </button>
                        </div>
                        <div className="d-none d-sm-block">
                          <PaginationListStandalone {...paginationProps} />
                        </div>
                      </div>
                      <div className="table-responsive">
                        <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={data && data.getProducts}
                          columns={columns}
                          rowStyle={{ verticalAlign: 'middle' }}
                          defaultSorted={defaultSorted}
                          bordered={false}
                          // striped
                          hover
                          // condensed
                          {...paginationTableProps}
                        />
                        <hr />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </PaginationProvider>

        <Modal show={modalShow} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductForm onSubmit={handleSubmit} onCancel={closeModal} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default withAuth(Products);
