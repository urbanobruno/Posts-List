import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import PostsList from '../components/PostsList';

function Posts() {

  useEffect(() => {
    // Fetch the posts list using the loader when the component is mounted or whenever the URL changes.
    // This will ensure that the posts list is updated after a post is deleted in the PostDetails component.
    async function fetchPosts() {
      try {
        await loader();
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  return resData.posts;
}
