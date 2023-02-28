import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ProvideAuthentication } from "./Authentication/ProvideAuthentication";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ProvideAuthentication>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ProvideAuthentication>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
