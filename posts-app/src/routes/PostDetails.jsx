import { useLoaderData, Link, Form, redirect } from "react-router-dom";

import Modal from "../components/Modal";
import classes from "./PostDetails.module.css";

function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>
          {post.author}
        </p>
        <p className={classes.text}>{post.body}</p>
        <div className={classes.delete_div}>

        <Form method="delete">
          <button
            className={classes.delete_button}
          >
           
            <input type="hidden" value={post.id} name="postId" id="postId"/>

            X Deletar Post
          </button>
          </Form>

        </div>
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function loader({ params }) {
  const response = await fetch("http://localhost:8080/posts/" + params.postId);
  const resData = await response.json();
  return resData.post;
}

export async function action({request}) {
  const formData = await request.formData();
  const postId = Object.fromEntries(formData);
  console.log(postId);
  await fetch('http://localhost:8080/posts/' + postId.postId, {
    method: 'delete',
    body: JSON.stringify(postId),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return redirect('/');

}

