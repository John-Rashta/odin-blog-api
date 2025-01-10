import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HomePage} from "./components/HomePage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Post} from "./components/Post";
import { Comment } from './components/Comment';
import { CreateComment } from './components/CreateComment';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,

  },
  {
    path: '/posts/:postid',
    element: <Post />,
  },
  {
    path: "/posts/:postid/comments/:commentid",
    element:  <Comment />,
  },
  {
    path: "/posts/:postid/createcomment",
    element: <CreateComment />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
