import React from 'react';
import { NextPage } from 'next';
import { Card, Col, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';

import { Layout, Loading } from '../../components';
import { useGetProductsQuery } from '../../generated/graphql';

const imageFormatter = (cell: any) => <img src={cell} alt="" style={{ width: 50 }} />;
const priceFormatter = (cell: any) => <span>${cell}</span>;
const isActiveFormatter = (cell: any) => (
  <span>
    {cell ? (
      <i className="fa fa-check-circle text-primary" style={{ fontSize: '1.2rem' }} />
    ) : (
      <i className="fa fa-times-circle text-danger" style={{ fontSize: '1.2rem' }} />
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
  // error: string;
  data: Array<any>;
}

const Products: NextPage<Props> = () => {
  const { loading, data } = useGetProductsQuery();

  if (loading) return <Loading />;
  // if (error) return <Error title="Error" content={error} />;

  return (
    <Layout title="Products">
      <div className="animated fadeIn">
        <PaginationProvider
          pagination={paginationFactory({
            custom: true,
            page: 1,
            sizePerPage: 10,
            // ...options,
            totalSize: data && data.getProducts.length,
          })}
        >
          {({ paginationProps, paginationTableProps }: any) => (
            <>
              <Row>
                <Col xs="12">
                  <Card>
                    <Card.Header>
                      <i className="fa fa-align-justify" />
                      <strong>Products</strong>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex d-column justify-content-between">
                        <div className="">
                          <SizePerPageDropdownStandalone {...paginationProps} />
                        </div>
                        <div className="form-group form-group-sm react-bs-table-search-form input-group input-group-sm w-50">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Search"
                            value=""
                            onChange={() => null}
                            style={{ height: '35px' }}
                          />
                          <button
                            className="btn btn-default btn-secondary react-bs-table-search-clear-btn ml-2"
                            type="button"
                            style={{ width: '75px' }}
                          >
                            Clear
                          </button>
                        </div>
                        <div>
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
      </div>
    </Layout>
  );
};

export default Products;
