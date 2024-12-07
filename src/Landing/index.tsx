import { Route, Routes, Navigate } from "react-router";
import { Link } from "react-router-dom"

import Lab3 from "../Labs/Lab3";
import Lab2 from "../Labs/Lab2";
import Lab1 from "../Labs/Lab2";


export default function Landing() {
  return (
    <div>
      {/* Full name and section number */}
      <div style={{ marginBottom: "20px" }}>
        <h1>Yufei Wu - CS5610 - Section 1</h1>
      </div>

      {/* Heading for GitHub link */}
      <h1>Repositories Link</h1>
      <div style={{ marginTop: "20px" }}>
        <a
          href="https://github.com/yufeiwu0106/kanbas-react-web-app/tree/a2"
          target="_blank"
          rel="noopener noreferrer"
        >
          All Source Code Repositories on GitHub
        </a>
      </div>

      <h1>Labs</h1>

      <ul>
        <li><Link to="/Labs/Lab1">Labs</Link></li>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/Lab2">Lab 2</Link></li>
        <li><Link to="/Labs/Lab3">Lab 3</Link></li>
        <li><Link to="/Labs/Lab4">Lab 4</Link></li>
        <li><Link to="/Labs/Lab5">Lab 5</Link></li>
      </ul>

      <h1>Kanbas</h1>

      <ul>
        <li><Link to="/Kanbas/Account/Signin">Kanbas</Link></li>
      </ul>
    </div>
  );
}
