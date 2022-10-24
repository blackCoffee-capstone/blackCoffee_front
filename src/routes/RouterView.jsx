import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from '../page/Home/Home'
import About from '../page/About'
import NotFound from '../page/NotFound'

const route = createBrowserRouter([
  { // 홈
    path: "/",
    element: <Home />,
  },
  { // 홈
    path: "/about",
    element: <About />,
  },

  { // 404 페이지
    path: "*",
    element: <NotFound />,
  },
]);

function RouterView() {
  return (
    <RouterProvider router={route} />
  )
}

export default RouterView