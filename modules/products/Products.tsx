import _ from 'lodash';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  // SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';

import {
  useGetProductsQuery,
  useUploadFileMutation,
  useCreateProductMutation,
  GetProductsDocument,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../generated/graphql';
import ProductForm from './ProductForm';
import { Alert, Error, Loading } from '../shared';
import withAuth from '../../utils/withAuth';

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

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

const options = {
  pageStartIndex: 1,
  onPageChange: () => {
    window.scrollTo(0, 0);
  },
  sizePerPageList: [10, 20, 30, 40, 50, 99],
};

const defaultSorted = [
  {
    dataField: 'id',
    order: 'asc',
  },
];

interface Alert {
  show: boolean;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  message?: string | null;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imagePath: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface Props {
  loading: boolean;
  error: string;
  data: Array<any>;
}

const Products: NextPage<Props> = () => {
  const [modalShow, setModalShow] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    message: '',
  } as Alert);
  const [product, setProduct] = useState({} as Product | null);
  const { loading, error, data } = useGetProductsQuery();
  const [uploadFile] = useUploadFileMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const showModal = (selectedData: Product) => {
    setProduct(selectedData);
    setModalShow(true);
  };
  const closeModal = () => {
    setModalShow(false);
    setProduct(null);
  };

  const rowEvents = {
    // @ts-ignore
    onDoubleClick: (e: any, row: any) => {
      showModal(row);
    },
  };

  const handleSubmit = async (value: any) => {
    try {
      await uploadFile({
        variables: {
          file: value.file,
        },
      });

      delete value['file'];

      if (!_.isEmpty(product)) {
        if (value.imagePath === '') {
          value.imagePath = product && product.imagePath;
        }

        const newValue = { ...value, id: product && parseFloat(product.id.toString()) };

        await updateProduct({
          variables: {
            data: newValue,
          },
          refetchQueries: [
            {
              query: GetProductsDocument,
            },
          ],
        });

        closeModal();

        setAlert({
          show: true,
          type: 'success',
          message: 'The product was updated successfully.',
        });
      } else {
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

        setAlert({
          show: true,
          type: 'success',
          message: 'The product was added successfully.',
        });
      }
    } catch (err) {
      closeModal();

      setAlert({
        show: true,
        type: 'danger',
        message: err,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct({
        variables: {
          id: parseFloat(product!.id.toString()),
        },
        refetchQueries: [
          {
            query: GetProductsDocument,
          },
        ],
      });

      closeModal();

      setAlert({
        show: true,
        type: 'success',
        message: 'The product was deleted successfully.',
      });
    } catch (err) {
      closeModal();

      setAlert({
        show: true,
        type: 'danger',
        message: err,
      });
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error title="Error" content={error.message} />;

  return (
    <>
      <NextSeo title="Products" description="List of Products" />
      <Alert show={alert.show} type={alert.type} message={alert.message} onClose={() => setAlert({ show: false })} />
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card style={{ cursor: 'pointer' }}>
              <Card.Header>
                <div className="d-flex d-column justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-align-justify mr-2" />
                    <strong>PRODUCTS</strong>
                  </div>
                  <div>
                    <button className="btn bg-primary btn-circle" onClick={() => setModalShow(true)}>
                      <i className="fas fa-plus text-white" />
                    </button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <PaginationProvider
                    pagination={paginationFactory({
                      custom: true,
                      page: 1,
                      sizePerPage: 10,
                      ...options,
                      totalSize: data && data.getProducts.length,
                    })}
                  >
                    {({ paginationProps, paginationTableProps }: any) => (
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={data && data.getProducts}
                        columns={columns}
                        rowStyle={{ verticalAlign: 'middle' }}
                        defaultSorted={defaultSorted}
                        exportCSV={{
                          onlyExportFiltered: true,
                          exportAll: false,
                        }}
                        hover
                        search
                      >
                        {(props: any) => (
                          <div>
                            <div className="d-flex d-column justify-content-between">
                              <div className="form-group form-group-sm react-bs-table-search-form input-group input-group-sm col-md-11">
                                <SearchBar
                                  {...props.searchProps}
                                  className="text-center"
                                  style={{ height: '35px' }}
                                  placeholder="Enter your search terms..."
                                />
                              </div>
                              <div className="d-none d-sm-block">
                                <ExportCSVButton
                                  {...props.csvProps}
                                  className="btn btn-outline-primary"
                                  style={{ width: '100px' }}
                                >
                                  Export CSV
                                </ExportCSVButton>
                              </div>
                            </div>
                            <BootstrapTable
                              rowEvents={rowEvents}
                              bordered={false}
                              striped
                              {...props.baseProps}
                              {...paginationTableProps}
                            />
                            <hr />
                            <div className="d-flex d-column justify-content-end">
                              {/* <div className="d-none d-sm-block">
                                Show <SizePerPageDropdownStandalone className="mx-2 bg-primary" {...paginationProps} />{' '}
                                entries
                              </div> */}
                              <div className="d-none d-sm-block">
                                <PaginationListStandalone {...paginationProps} />
                              </div>
                            </div>
                          </div>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {modalShow && (
          <ProductForm onSubmit={handleSubmit} onCancel={closeModal} onDelete={handleDelete} product={product} />
        )}
      </div>
    </>
  );
};

export default withAuth(Products);
