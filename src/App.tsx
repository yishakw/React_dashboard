import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { dataProvider, liveProvider } from "./providers/data";
import { authProvider } from "./providers";
import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

// import dataProvider, {
//   GraphQLClient,
//   liveProvider,
// } from "@refinedev/nestjs-query";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import { authProvider } from "./authProvider";
// import { Header } from "./components/header";
// import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
// import { ForgotPassword } from "./pages/forgotPassword";
// import { Login } from "./pages/login";
// import { Register } from "./pages/register";
import { Home, ForgotPassword, Login, Register } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "FQnumw-c2F0So-ahB1E9",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        // Header={() => <Header sticky />}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route index element={<Home />} />
                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/register" element={<Register />} />
                  <Route path="/pages" element={<Login />} />

                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
