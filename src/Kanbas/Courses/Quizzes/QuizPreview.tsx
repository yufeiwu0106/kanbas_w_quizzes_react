import React, { useState, useEffect } from "react";
import QuizTaker from "./QuizTaker";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./QuestionEditor/client";
import {
  setQuestion,
  deleteQuestion,
  editQuestion,
} from "./QuestionEditor/reducer";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Editor from "react-simple-wysiwyg";
import QuizTab from "./QuizTab";
const QuizPreview = () => {
  const { cid, qid: quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await client.fetchQuizQuestions(quizId);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const handleNewQuestion = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/edit/NewQuestion`);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await client.deleteQuestion(questionId);
        dispatch(deleteQuestion(questionId));
        // Refresh questions list
        const fetchedQuestions = await client.fetchQuizQuestions(quizId);
        dispatch(setQuestion(fetchedQuestions));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error deleting question:", error);
        alert("Failed to delete question. Please try again.");
      }
    }
  };

  const handleEditQuestion = async (questionId: string) => {
    navigate(
      `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Questions/${questionId}/Edit`
    );
    setShowEditModal(false);
  };

  const handleUpdateQuestion = async () => {
    try {
      await client.updateQuizQuestion(selectedQuestion._id, selectedQuestion);
      const updatedQuestions = await client.fetchQuizQuestions(quizId);
      setQuestions(updatedQuestions);
      dispatch(setQuestion(updatedQuestions));
      setShowEditModal(false);
      setSelectedQuestion(null);
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question. Please try again.");
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const modalElement = e.currentTarget.querySelector(
        ".modal-dialog"
      ) as HTMLElement;
      if (!modalElement) return;

      const modalRect = modalElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;

      // Prevent moving beyond left and right edges
      if (newX < 0) newX = 0;
      if (newX + modalRect.width > windowWidth) {
        newX = windowWidth - modalRect.width;
      }

      // Prevent moving beyond top and bottom edges
      if (newY < 0) newY = 0;
      if (newY + modalRect.height > windowHeight) {
        newY = windowHeight - modalRect.height;
      }

      setModalPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="container mt-4">
      <QuizTab />
      <br/>
      <h1 className="mb-4">Quiz Preview</h1>
      <QuizTaker />

      {isFaculty && (
        <div className="mt-5">
          <div className="row">
            {/* Left side buttons */}
            <div className="col-6">
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-success w-75"
                  onClick={() =>
                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Submit`)
                  }
                >
                  Submit Quiz
                </button>
                <button
                  className="btn btn-primary w-75"
                  onClick={() =>
                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Editor`)
                  }
                >
                  Edit Quiz
                </button>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="col-6">
              <div className="d-flex flex-column gap-2 align-items-end">
                <button
                  className="btn btn-success w-75"
                  onClick={handleNewQuestion}
                >
                  Add New Question
                </button>
                <button
                  className="btn btn-danger w-75"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Questions
                </button>
                <button
                  className="btn btn-primary w-75"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Questions
                </button>
              </div>
            </div>
          </div>

          {/* Delete Questions Modal */}
          {showDeleteModal && (
            <div
              className="modal show d-block"
              tabIndex={-1}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div
                className="modal-dialog modal-lg"
                style={{
                  transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
                  cursor: isDragging ? "grabbing" : "default",
                }}
              >
                <div className="modal-content">
                  <div
                    className="modal-header bg-light"
                    style={{ cursor: "grab" }}
                    onMouseDown={handleMouseDown}
                  >
                    <h5 className="modal-title">Delete Questions</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowDeleteModal(false)}
                    ></button>
                  </div>
                  <div
                    className="modal-body"
                    style={{ maxHeight: "60vh", overflowY: "auto" }}
                  >
                    <div className="list-group">
                      {questions.map((question, index) => (
                        <div
                          key={question._id}
                          className="list-group-item d-flex justify-content-between align-items-center py-3"
                        >
                          <div className="d-flex align-items-center flex-grow-1 me-3">
                            <span className="badge bg-secondary me-3">
                              {index + 1}
                            </span>
                            <span className="text-truncate">
                              {question.title}
                            </span>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteQuestion(question._id)}
                          >
                            <RiDeleteBin6Line className="me-1" />
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer bg-light">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Question Modal */}
          {showEditModal && (
            <div
              className="modal show d-block"
              tabIndex={-1}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div
                className="modal-dialog modal-lg"
                style={{
                  transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
                  cursor: isDragging ? "grabbing" : "default",
                }}
              >
                <div className="modal-content">
                  <div
                    className="modal-header bg-light"
                    style={{ cursor: "grab" }}
                    onMouseDown={handleMouseDown}
                  >
                    <h5 className="modal-title">Edit Questions</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowEditModal(false)}
                    ></button>
                  </div>
                  <div
                    className="modal-body"
                    style={{ maxHeight: "60vh", overflowY: "auto" }}
                  >
                    <div className="list-group">
                      {questions.map((question, index) => (
                        <div
                          key={question._id}
                          className="list-group-item d-flex justify-content-between align-items-center py-3"
                        >
                          <div className="d-flex align-items-center flex-grow-1 me-3">
                            <span className="badge bg-secondary me-3">
                              {index + 1}
                            </span>
                            <span className="text-truncate">
                              {question.title}
                            </span>
                          </div>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleEditQuestion(question._id)}
                          >
                            <MdEdit className="me-1" />
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer bg-light">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowEditModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPreview;
