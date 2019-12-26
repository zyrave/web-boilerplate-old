import React from 'react';
import { NextPage } from 'next';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object({
  name: yup.string().required('Required Field'),
  category: yup.string().required('Required Field'),
  price: yup.number().required('Required Field'),
  quantity: yup.number().required('Required Field'),
  isActive: yup.bool().required('Required Field'),
});

interface Props {
  onSubmit: (data: {}) => void;
  onCancel: () => void;
}

const ProductForm: NextPage<Props> = ({ onSubmit, onCancel }) => (
  <Formik
    validationSchema={schema}
    onSubmit={data => onSubmit(data)}
    initialValues={{
      name: 'x',
      category: 'x',
      price: 0,
      quantity: 0,
      imagePath: '',
      file: new File([''], 'file'),
      isActive: true,
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
        <div className="float-right">
          <Button variant="outline-primary" className="mr-2" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default ProductForm;