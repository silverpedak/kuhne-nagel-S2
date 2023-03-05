import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/app";

import { App } from "./app";

import "@/assets/css/argon-dashboard-pro-react.css";
import "@/assets/vendor/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/dist/react-datepicker.min.css";
import "@/views/components/widgets/react-table/styles/reactTable.css";
import "jvectormap-next/jquery-jvectormap.css";
import "leaflet/dist/leaflet.css";
import "reactflow/dist/style.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
