import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Resultados from "./Resultados.jsx";
import { Flex, Layout, Typography } from "antd";
const { Header, Content, Footer } = Layout;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/resultados",
    element: <Resultados />,
  },
]);
createRoot(document.getElementById("root")).render(
  <Flex gap="middle" wrap>
    <Layout>
      <div className="text-center">
        <Typography.Title className="my-10">Elecciones 2025</Typography.Title>
      </div>
      <Content style={{ padding: "0 48px" }}>
        <RouterProvider router={router} />
      </Content>
      <Footer style={{ textAlign: "center" }} className="mt-8">
        Created by{" "}
        <a href="https://github.com/rudymarca" target="_blank">
          RM
        </a>
      </Footer>
    </Layout>
  </Flex>
);
