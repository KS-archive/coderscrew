import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from '@coderscrew/coderskit';
import styled from '@emotion/styled';

// const POSTS_SUBSCRIPTION = gql`
//   subscription {
//     posts {
//       id
//       title
//     }
//   }
// `;

const POSTS_QUERY = gql`
  {
    posts {
      id
      title
    }
  }
`;

interface Post {
  id: string;
  title: string;
}

interface PostsData {
  posts: Post[];
}

const HomeContainer = styled.div`
  text-align: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222;
  height: 200px;
  padding: ${p => p.theme.space[3]};
  color: #fff;
`;

const Intro = styled.p`
  font-size: large;
`;

class Home extends React.Component<{}, {}> {
  render() {
    return (
      <HomeContainer>
        <Header>
          <h2>Welcome to CCAF</h2>
        </Header>
        <Button>Some text</Button>
        <Intro>
          To get started, edit <code>src/App.tsx</code> or <code>src/Home.tsx</code> and save to reload.
        </Intro>
        <Query<PostsData, {}> query={POSTS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <h2>Loading ...</h2>;
            }

            const posts = data ? data.posts : [];

            // if (typeof window !== undefined) {
            //   subscribeToMore({
            //     document: POSTS_SUBSCRIPTION,
            //     updateQuery: (prev, { subscriptionData }) => {
            //       console.log(subscriptionData);
            //       if (!subscriptionData.data) return prev;
            //       const newPost = subscriptionData.data.posts;

            //       return Object.assign({}, prev, {
            //         posts: [...prev.posts, newPost],
            //       });
            //     },
            //   });
            // }

            return (
              <div>
                {posts.map(a => (
                  <li key={a.id}>{a.title}</li>
                ))}
              </div>
            );
          }}
        </Query>
      </HomeContainer>
    );
  }
}

export default Home;
