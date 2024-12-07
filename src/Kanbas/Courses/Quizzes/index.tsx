import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEllipsisV, FaCheckCircle, FaPlus } from "react-icons/fa";
import "./index.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { useDispatch } from "react-redux";
import QuizController from "./QuizController";
import ContextMenu from "./ContextMenu";
import { setQuizzes } from "./reducer";

function Quizzes() {
  const dispatch = useDispatch();

  const { cid } = useParams();

  const quizzes = [
    {
      _id: 1,
      title: "Q1 - HTML",
      type: "Graded Quiz",
      point: 100,
      status: "Published",
      assignmentGroup: "Quizzes",
      shuffleAnswer: "Yes",
      timeLimit: "20",
      multipleAttempts: "No",
      howManyAttempts: "1",
      showCorrectAnswers: "Immediately",
      oneQuestionAtATime: "Yes",
      webcamRequired: "No",
      lockQuestionsAfterAnswering: "No",
      dueDate: "2024-03-25",
      availableDate: "2024-03-25",
    },
    {
      _id: 2,
      title: "Q2 - CSS",
      dueDate: "2024-04-01",
      point: 100,
      status: "Published",
    },
    // Add more quiz items as needed
  ];

  console.log(quizzes);

  const fetchQuizzes = async () => {
    // TODO: fetch quizzes from backend
    const quizzes = [
        {
          _id: 1,
          title: "Q1 - HTML",
          dueDate: "2024-03-25",
          point: 100,
          status: "Published",
        },
        {
          _id: 2,
          title: "Q2 - CSS",
          dueDate: "2024-04-01",
          point: 100,
          status: "Published",
        },
        // Add more quiz items as needed
      ];    

    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);



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

      {/* Assignment */}
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="list-group-item p-1 mb-3 fs-5 border-grey">
          <div className="wd-title p-3 ps-2 bg-secondary text-black">
            <BsGripVertical className="me-2 fs-3" />
            <AiFillCaretDown /> ASSIGNMENT
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
                        <BsGripVertical className="me-2 fs-3" />
                        <GiNotebook className="me-2 fs-3" />
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
                            <b>Due</b> {quiz.dueDate} | {quiz.point} pts <br />
                          </span>
                        </div>
                      </div>
                      <ContextMenu quizId={quiz._id} />
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
