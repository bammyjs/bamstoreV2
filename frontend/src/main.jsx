import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
