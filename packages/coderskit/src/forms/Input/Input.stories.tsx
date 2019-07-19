import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Field, Formik, Form, FormikActions } from 'formik';
import * as Yup from 'yup';
import { FInput } from '.';
import { Button } from '../..';

const wait = (time: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('Hello');
    }, time);
  });

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong e-mail address')
    .required('E-mail is required'),
  password: Yup.string()
    .min(8, 'Password have to contain at least 8 characters')
    .required('Password is required'),
});

const initialValues = {
  email: 'test@test.test',
  password: 'test1234',
};

type FormValues = typeof initialValues;

const handleSubmit = async (values: FormValues, actions: FormikActions<FormValues>) => {
  console.log('Submitting...');
  await wait(2000);
  console.log(`Submitted with email ${values.email} and pasword ${values.password}`);
  actions.setSubmitting(false);
};

storiesOf('Formik', module).add('Input', () => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Field name="email" component={FInput} placeholder="Enter e-mail address" label="E-mail" width={240} />
          <Field
            name="password"
            component={FInput}
            type="password"
            placeholder="Enter password"
            label="Password"
            style={{ marginTop: 12 }}
            width={240}
            hasFeedback
          />
          <Button type="submit" disabled={isSubmitting} style={{ marginTop: 24 }}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
});
