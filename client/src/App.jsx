import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Root from "./layouts/Root";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./components/Protected";

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Root />,
      children: [
        {
          index: true,
          element: (
            <Protected>
              <Home />
            </Protected>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <Auth />,
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
