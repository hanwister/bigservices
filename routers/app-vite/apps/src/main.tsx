import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
let App2 = React.lazy( async () => await import("./App.jsx"))
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useLoaderData
} from "react-router-dom";

let loaderLocal = function (loader) {
  return loader
}

window.env = import.meta.env;

console.log("env", JSON.stringify(window.env))
function Module(props) {
  const [display, setDisplay] = React.useState(false);
  const [module_id, setModuleId] = React.useState(null);
  console.log(window.location.pathname)
  // let loader = useLoaderData();
  !display && axios({
      method: "post",
      url: import.meta.env.VITE_GRAPHQL_URL_APP,
      data: {
        query: `query List_clibkgqe60001tr2ef6bmewkn($where: Modelclibkgqe60001tr2ef6bmewknWhereInput, $orderBy: Modelclibkgqe60001tr2ef6bmewknOrderByInput, $limit: Int) {
            app:list_clibkgqe60001tr2ef6bmewkn(where: $where, orderBy: $orderBy, limit: $limit) {
              id
            }
          }`,
        variables: {
          "where": {
            "pqr6xwnvyerwvmmz2wqmrldn": {
              "equals": '/' + `${window.location.pathname}`.split("/").filter(x => x).splice(-1)[0]
            }
          },
          "orderBy": {
            "createdAt": "desc"
          },
          "limit": 1
        } },
      headers: {
        "Content-Type": "application/json",
        // "Sec-Fetch-Site": "cross-site"
      },
      // maxRedirects: 20,
      // timeout: 1000
    })
      .then(async ({errors, data}) => {
        if (!errors) {
          let moduleid = data.data.app?.[0]?.id;
          setModuleId(moduleid)
          console.log(data, module_id)
          setDisplay(true)
        }
      })
      .catch((err) => {
        // reject(err?.response?.data)
      });
  return display && React.createElement(App2, { module_id: module_id})
}

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(App2),
  },
  // {
  //   path: "/2",
  //   element: React.createElement(App2),
  // },
  // {
  //   path: "/app",
  //   element: React.createElement(Link, { to: "/"}, "Homepahe")
  // },
  {
    path: "/:appName",
    element: React.createElement(Module),
    loader: loaderLocal
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>,
  <Module></Module>
  // <RouterProvider router={router} ></RouterProvider>
)
