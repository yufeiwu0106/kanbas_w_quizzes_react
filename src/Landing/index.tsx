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
        <h1>Group Project - Di He, Kaichen Qu, Liuyi Yang, Yufei Wu </h1>
      </div>

      {/* Heading for GitHub link */}
      <h1>Quizzes Project Repositories Link</h1>
      <div style={{ marginTop: "20px" }}>
        <a
          href="https://github.com/yufeiwu0106/kanbas_w_quizzes_node"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github: Node server kanbas_w_quizzes_node
        </a>
        <br />
        <a
          href="https://github.com/yufeiwu0106/kanbas_w_quizzes_react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github: React UI kanbas_w_quizzes_react
        </a>
      </div>

      <h1>Kanbas</h1>

      <ul>
        <li><Link to="/Kanbas/Account/Signin">Kanbas</Link></li>
      </ul>
    </div>
  );
}
