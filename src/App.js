import { createBrowserRouter,RouterProvider } from "react-router-dom";
import './App.css';
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Otp from "./pages/Login/Otp";
import NotFound from "./pages/NotFound/NotFound";
import Congrates from "./pages/SignUp/Congrates";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',element: <Layout />,
      children: [
        { path: '/',element: <Home /> },
        {
          path: '/login',element: <Login />
        },
        {
          path: '/signup',element: <SignUp />
        },
        {
          path: '/otp',element: <Otp />
        },
        {
          path: '/congrates',element: <Congrates />
        }
      ]
    },

    {
      path: '*',element: <NotFound />
    },
  ])



  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
