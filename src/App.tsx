import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./App.css";

// Pages
import DrugSearchPage from "./pages/DrugSearchPage";
import DrugViewPage from "./pages/DrugViewPage";
import React from "react";

// const baseLoader = () => {
//   return redirect("/drugs/search");
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    // loader: baseLoader,
    // children: [
    //   {
    //     path: "/drugs/search",
    //     element: <DrugSearchPage />,
    //     // loader: teamLoader,
    //   },
    //   {
    //     path: "/drugs/:id",
    //     element: <DrugViewPage />,
    //   },
    // ],
  },
  {
    path: "/drugs",
    children: [
      {
        path: "search",
        element: <DrugSearchPage />,
      },
      {
        path: ":id",
        element: <DrugViewPage />,
      },
    ],
  },
]);

function MainPage() {
  return (
    <main>
      <h2>XoGene - RxCui Search</h2>
      <a
        className="px-4 py-1 rounded-md bg-indigo-600 text-white font-semibold"
        href="/drugs/search"
      >
        Search for a drug
      </a>
    </main>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
