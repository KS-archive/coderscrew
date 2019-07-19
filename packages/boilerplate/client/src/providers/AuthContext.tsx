import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import { apollo } from 'utils';
import { ObservableQuery } from 'apollo-client';

interface User {
  id: string;
  name: string;
  __typename: 'User';
}

interface State {
  user: User | null;
  loading: boolean;
}

interface UserData {
  me: User;
}

interface AuthContext extends State {
  refetchUser: () => void;
  logout: () => void;
}

const USER_QUERY = gql`
  {
    me {
      id
      name
    }
  }
`;

const deleteCookie = (cname: string) => {
  const d = new Date();
  d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
  const expires = 'expires=' + d.toUTCString();
  window.document.cookie = cname + '=' + '; ' + expires;
};

const initialState: State = {
  user: null,
  loading: true,
};

const initialContext: AuthContext = {
  ...initialState,
  refetchUser: () => {},
  logout: () => {},
};

const AuthContext = React.createContext<AuthContext>(initialContext);

class Auth extends Component<RouteComponentProps, State> {
  state: State = initialState;
  querySubscription: ZenObservable.Subscription | undefined;
  query: ObservableQuery<UserData> | undefined;

  componentDidMount() {
    this.createUserSubscription();
  }

  createUserSubscription = () => {
    this.query = apollo.watchQuery<UserData>({ query: USER_QUERY });
    this.querySubscription = this.query!.subscribe(
      ({ data, loading }) => {
        this.setState({ loading, user: data.me });
      },
      err => {
        if (err.message.includes('Not Authorised') && this.props.location.pathname.includes('app')) {
          this.props.history.push('/sign-in');
        }
      },
    );
  };

  logout = () => {
    deleteCookie('token');
    this.setState({ user: null });
  };

  refetchUser = async () => {
    await this.querySubscription!.unsubscribe();
    await apollo.resetStore();
    this.createUserSubscription();
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          refetchUser: this.refetchUser,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthProvider = withRouter(Auth);
export default AuthContext;
