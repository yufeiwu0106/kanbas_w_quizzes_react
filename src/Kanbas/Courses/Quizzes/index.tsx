import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEllipsisV, FaCheckCircle, FaPlus } from "react-icons/fa";
import "./index.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { RxRocket } from "react-icons/rx";
import { useDispatch } from "react-redux";
import QuizController from "./QuizController";
import ContextMenu from "./ContextMenu";
import { setQuizzes } from "./reducer";
import { findQuizzesForCourse } from "./client";
import * as quizClient from "./client";

function Quizzes() {
  const dispatch = useDispatch();

  const { cid } = useParams();

  // const quizzes = quizzesData;
  const [quizzes, setQuizzesState] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    if (!cid) return;
    try {
      const quizzesData = await findQuizzesForCourse(cid); // 调用 API 获取数据
      console.log("Fetched quizzes: ", quizzesData);
      setQuizzesState(quizzesData);
      dispatch(setQuizzes(quizzesData));
    } catch (error) {
      console.error("Error fetching quizzes for course:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  // Delete quiz
  const deleteQuiz = async (quizId: string) => {
    const status = await quizClient.deleteQuiz(quizId);
    setQuizzesState(quizzes.filter((quiz) => quiz._id !== quizId));
    fetchQuizzes();
  };

  return (
    <div>
      <div
        id="wd-assignments"
        className="d-flex align-items-center justify-content-between mb-3"
      >
        <div className="input-group w-50">
          <span className="input-group-text bg-white border-end-0">
            <HiMagnifyingGlass />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            id="wd-search-assignment"
            placeholder="Search..."
          />
        </div>

        <QuizController cid={cid} />
      </div>

      {/* Assignment QUIZZES*/}
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="list-group-item p-1 mb-3 fs-5 border-grey">
          <div className="wd-title p-3 ps-2 bg-secondary text-black">
            <AiFillCaretDown /> ASSIGNMENT QUIZZES
            <BiDotsVerticalRounded className="float-end mt-2" />
            <AiOutlinePlus className="float-end mt-2" />
            <button
              type="button"
              className="btn btn-outline-secondary text-black float-end me-1"
            >
              40% of Total
            </button>
          </div>
          <ul className="list-group list-group-flush">
            {quizzes.map(
              (quiz: any) => (
                // add a logging here
                console.log("assignment", quiz.title),
                (
                  <li
                    className="wd-assignment-list-item list-group-item p-3 ps-1"
                    style={{ borderLeft: "5px solid green" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <RxRocket className="ms-2 me-4 fs-4 text-success" />
                        <div>
                          <a
                            className="wd-assignment-link"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                            style={{
                              color: "black",
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            {quiz.title}
                          </a>
                          <br />
                          <span className="text-black">
                            <b>Available:</b> {formatDate(quiz.availableDate)}
                            <b> | Due:</b> {formatDate(quiz.dueDate)}
                            <b> | Points:</b> {quiz.point} pts
                          </span>
                        </div>
                      </div>
                      <div style={{ position: "relative", right: "2rem" }}>
                        <ContextMenu
                          quizId={quiz._id}
                          deleteQuiz={deleteQuiz}
                        />
                      </div>
                    </div>
                  </li>
                )
              )
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Quizzes;
