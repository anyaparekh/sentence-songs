import ReactDOM from "react-dom/client";
import Generate from "./pages/Generate.tsx";
import Home from "./pages/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/generate",
    element: <Generate />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <div className="rainbow">
      <RouterProvider router={router} />
    </div>
  </>
);
