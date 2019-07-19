import React, { useContext } from 'react';
import styled from '@emotion/styled';
import SVG from 'react-inlinesvg';
import axios from 'axios';
import { Formik, Field, Form, FormikActions } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Button, FInput, Divider, Icon } from '@coderscrew/coderskit';
import { AuthContext } from 'providers';

interface FormValues {
  email: string;
  password: string;
}

const SignInContainer = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'cetner',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.colors.background,
}));

const MiddleWarpper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'cetner',
  justifyContent: 'center',
});

const Heading = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.space[40],
}));

const Logo = styled(SVG)(({ theme }) => ({
  display: 'inline-block',
  width: 288,
  height: 32,
  marginBottom: theme.space[16],
  svg: {
    width: 288,
    height: 32,
  },
}));

const Text = styled.p(({ theme }) => ({
  fontSize: theme.fontSizes.h3,
  lineHeight: theme.lineHeights.h3,
  textAlign: 'center',
  color: theme.colors.fontPlaceholder,
}));

const FormContainer = styled.div(({ theme }) => ({
  width: 416,
  padding: 32,
  border: theme.borders.light,
  background: theme.colors.white,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.sm,
}));

const ActionsRow = styled.div(({ theme: { fontSizes, lineHeights } }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginTop: 8,

  a: {
    fontSize: fontSizes.body2,
    lineHeight: lineHeights.body2,
  },
}));

const SocialButtons = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const SocialButton = styled(Button)(({ theme: { space } }) => ({
  justifyContent: 'flex-start',
  width: 108,
  paddingLeft: space[12],
  paddingRight: space[12],

  '> span': {
    marginLeft: space[8],
  },
}));

const Footer = styled.div(({ theme }) => ({
  marginTop: theme.space[40],
  fontSize: theme.fontSizes.body1,
  lineHeight: theme.lineHeights.body1,
  textAlign: 'center',
  color: theme.colors.fontRegular,
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong e-mail address')
    .required('E-mail is required'),
  password: Yup.string()
    .min(8, 'Password have to contain at least 8 characters')
    .required('Password is required'),
});

const initialValues = {
  email: 'john.doe@gmail.pl',
  password: 'example123',
};

const handleSubmit = async (values: FormValues, actions: FormikActions<FormValues>) => {
  try {
    await axios.post('/auth/signin', values);
    actions.setSubmitting(false);
    actions.setStatus('logged');
  } catch (ex) {
    console.log(ex);
  }
};

const SignIn = () => {
  const { user, refetchUser } = useContext(AuthContext);
  console.log(user);

  return (
    <SignInContainer>
      <MiddleWarpper>
        <Heading>
          <Logo src="logo-black.svg">Company logo</Logo>
          <Text>Sign in to the dashboard</Text>
        </Heading>
        <FormContainer>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ status, setStatus }) => {
              if (status === 'logged') {
                setImmediate(() => {
                  refetchUser();
                  setStatus('');
                });
                return null;
              }

              return (
                <Form>
                  <Field name="email" component={FInput} label="E-mail" autoComplete="email" />
                  <Field
                    name="password"
                    component={FInput}
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    style={{ marginTop: 8 }}
                  />
                  <ActionsRow>
                    <Link to="/restore-password">Forgot password?</Link>
                    <Button type="submit">Sign in</Button>
                  </ActionsRow>
                </Form>
              );
            }}
          </Formik>
          <Divider style={{ margin: '32px 0' }}>use a social account</Divider>
          <SocialButtons>
            <SocialButton variant="outlined" color="#EA4336" as="a" href="http://localhost:4000/auth/google">
              <Icon src="/icons/google-brands.svg" color="#EA4336" />
              <span>Google</span>
            </SocialButton>
            <SocialButton variant="outlined" color="#3C5998" as="a" href="http://localhost:4000/auth/facebook">
              <Icon src="/icons/facebook-brands.svg" color="#3C5998" />
              <span>Facebook</span>
            </SocialButton>
            <SocialButton variant="outlined" color="#212020" as="a" href="http://localhost:4000/auth/github">
              <Icon src="/icons/github-brands.svg" color="#212020" />
              <span>Github</span>
            </SocialButton>
          </SocialButtons>
        </FormContainer>
        <Footer>
          <span>Don&apos;t have an account? </span>
          <Link to="/sign-up">Sign up</Link>
        </Footer>
      </MiddleWarpper>
    </SignInContainer>
  );
};

export default SignIn;
