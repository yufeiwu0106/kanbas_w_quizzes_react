import "./App.css";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import Landing from "./Landing/index";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Kanbas/store/index";
import { Provider } from "react-redux";

export function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Landing" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
            <Route path="/Landing" element={<Landing />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
