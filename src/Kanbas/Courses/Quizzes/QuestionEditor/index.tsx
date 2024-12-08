import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsGripVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import * as client from "./client";
import {
  setQuestion,
  addQuestion,
  deleteQuestion,
  editQuestion,
} from "./reducer";
import Navigation from "./Navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function QuestionEditor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state: any) =>
    state.questionReducer ? state.questionReducer.questions : []
  );
  console.log("questions", questions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedQuestions = await client.fetchQuizQuestions(qid);
        console.log("Fetched Questions:", fetchedQuestions);
        console.log(questions);
        dispatch(setQuestion(fetchedQuestions));
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchData();
  }, [dispatch, qid]);

  const handleEditQuestion = (questionId: string) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit/${questionId}`);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await client.deleteQuestion(questionId);
        dispatch(deleteQuestion(questionId));
        // Refresh questions list
        const fetchedQuestions = await client.fetchQuizQuestions(qid);
        dispatch(setQuestion(fetchedQuestions));
      } catch (error) {
        console.error("Error deleting question:", error);
        alert("Failed to delete question. Please try again.");
      }
    }
  };

  return (
    <div id="wd-question-editor" className="p-4">
      <div id="wd-quiz-editor" className="p-4">
        <Navigation pathname={pathname} />
      </div>
      <div>
        {questions.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          questions.map((question: any) => (
            <div
              key={question._id}
              className="question-container mb-4 border rounded shadow-sm"
            >
              <div className="d-flex justify-content-between align-items-center p-2 bg-light border-bottom">
                <div className="d-flex align-items-center">
                  <BsGripVertical
                    className="me-3"
                    style={{ fontSize: "1.2rem" }}
                  />
                  <h6 className="question-title mb-0">{question.title}</h6>
                </div>
                <span
                  className="text-muted me-1 points-text"
                  style={{ fontSize: "0.9rem" }}
                >
                  <b>{question.points} pts</b>
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-2">
                <div
                  className="question-text mb-0 p-2"
                  dangerouslySetInnerHTML={{ __html: question.question }}
                ></div>
                <div className="question-actions">
                  <MdEdit
                    className="text-black me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditQuestion(question._id)}
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteQuestion(question._id)}
                  >
                    <RiDeleteBin6Line className="me-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="d-flex justify-content-center mb-4">
        <button
          id="question-button"
          className="btn btn btn-light border mt-4 mb-2"
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit/NewQuestion`)
          }
        >
          New Question
        </button>
      </div>
      <hr />
      <div className="d-flex justify-content-start mb-4">
        <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
          <button type="button" className="btn btn-light border me-2 ms-5">
            Cancel
          </button>
        </Link>
        <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
          <button type="submit" className="btn btn-danger">
            Save
          </button>
        </Link>
      </div>
    </div>
  );
}
