import { Suspense, useEffect, useState } from "react";
import { fetchPostsByUserId } from "../../services/api";
import { Link, Outlet, useParams } from "react-router-dom";

const PostByUser = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPostsByUserId(userId);
      setPosts(data);
    };
    getData();
  }, [userId]);
  if (!posts.length) {
    return <h2>This user have not any posts yet</h2>;
  }
  return (
    <div className="wrapperPosts">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`${post.id}/details`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Suspense fallback={<h2>Third suspense</h2>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default PostByUser;
