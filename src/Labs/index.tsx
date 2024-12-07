import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab3 from "./Lab3";
import Lab2 from "./Lab2";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import store from "./store";
import { Provider } from "react-redux";


export default function Labs() {
  return (
    <Provider store={store}>
    <div>
      {/* Full name and section number */}
      <div style={{ marginBottom: '20px' }}>
        <h1>Yufei Wu - Section 1</h1>
      </div>

      {/* Heading for GitHub link */}
      <h1>Repositories Link</h1>
      <div style={{ marginTop: '20px' }}>
        <a id="wd-github" href="https://github.com/yufeiwu0106/kanbas-react-web-app/tree/a5" target="_blank" rel="noopener noreferrer">
          All Source Code Repositories on GitHub
        </a>
      </div>

      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
        <Route path="Lab4" element={<Lab4 />} />
        <Route path="Lab5" element={<Lab5 />} />
      </Routes>
    </div>
    </Provider>
  );
}
