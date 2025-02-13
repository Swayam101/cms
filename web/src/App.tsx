import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client/queryClient";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/appRoutes";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Provider store={store}>
          <ModalsProvider>
            <Notifications />
            <RouterProvider router={appRouter} />
          </ModalsProvider>
        </Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
