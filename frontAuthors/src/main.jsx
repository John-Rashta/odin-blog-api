import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {CreatePost} from "./components/CreatePost.jsx";
import {EditComment} from "./components/EditComment.jsx";
import { EditPost } from './components/EditPost.jsx';
import { Index } from './components/Index.jsx';
import { Login } from './components/Login.jsx';
import { Posts } from './components/Posts.jsx';
import {Post} from './components/Post.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,

  },
  {
    path: '/posts',
    element: <Posts />,
  },
  {
    path: "/login",
    element:  <Login />,
  },
  {
    path: "/posts/:postid",
    element: <Post />
  },
  {
    path: "/posts/edit/:postid",
    element: <EditPost />
  },
  {
    path: "/posts/:postid/:commentid/edit",
    element: <EditComment />
  },
  {
    path: "/create/posts",
    element: <CreatePost />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
