import { Formik } from 'formik';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as yup from 'yup';

import ConfirmationDialog from '../../modules/shared/ConfirmationDialog';

const schema = yup.object({
  name: yup.string().required('Required Field'),
  category: yup.string().required('Required Field'),
  price: yup.number().required('Required Field'),
  quantity: yup.number().required('Required Field'),
  isActive: yup.bool().required('Required Field'),
});

interface Props {
  onCancel: () => void;
  onSubmit: (data: {}) => void;
  onDelete: () => void;
  product?: any;
}

const ProductForm: NextPage<Props> = ({ onCancel, onSubmit, onDelete, product }) => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleConfirmationDialogClose = () => setShowConfirmationDialog(false);
  const handleConfirmationDialogClick = () => onDelete();

  return (
    <Modal show={true} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product && product.id ? 'Edit' : 'Add'} Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={d => onSubmit(d)}
          initialValues={{
            name: (product && product.name) || '',
            category: (product && product.category) || '',
            price: (product && product.price) || 0,
            quantity: (product && product.quantity) || 0,
            isActive: true,
            imagePath: '',
            file: new File([''], 'file'),
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormikName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormikCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                />
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormikPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  name="price"
                  value={values.price.toString()}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormikQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  name="quantity"
                  value={values.quantity.toString()}
                  onChange={handleChange}
                  isInvalid={!!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload Image</Form.Label>
                <div className="custom-file">
                  <input
                    type="file"
                    id="imagePath"
                    className="custom-file-input"
                    onChange={async ({ target: { files } }) => {
                      const file = files![0];
                      setFieldValue('imagePath', file.name);
                      setFieldValue('file', file);
                    }}
                  />
                  <label htmlFor="imagePath" className="custom-file-label">
                    {values.imagePath}
                  </label>
                </div>
                <small className="form-text text-muted">Max Size 3MB</small>
              </Form.Group>
              <hr />
              {!!product.id && (
                <div className="float-left">
                  <Button variant="danger" className="mr-2" onClick={() => setShowConfirmationDialog(true)}>
                    Delete
                  </Button>
                </div>
              )}
              <div className="float-right">
                <Button variant="light" className="mr-2" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
        {showConfirmationDialog && (
          <ConfirmationDialog
            title="Delete Confirmation"
            message="Are you sure you want to delete this item?"
            defaultButtonText="Delete"
            defaultButtonStyle="danger"
            onClose={handleConfirmationDialogClose}
            onClick={handleConfirmationDialogClick}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
