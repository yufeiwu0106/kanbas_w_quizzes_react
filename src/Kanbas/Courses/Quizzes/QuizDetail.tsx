import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findQuestionsForQuiz } from "./client";
import * as quizClient from "./client";
import Navigation from "./QuestionEditor/Navigation";
import ProtectedStartQuizRoute from "./ProtectedStartQuizRoute";

const QuizDetail = () => {
  const { cid, qid: quizId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer); // Get quizzes from Redux store
  const [questions, setQuestions] = useState([]);
  const [isNewQuiz, setIsNewQuiz] = useState(false);
  const [quiz, setQuiz] = useState<any>(null);

  // Function to fetch quiz data
  const fetchQuiz = async (quizId: string) => {
    try {
      const curQuiz = await quizClient.findQuizById(quizId); // API call to fetch quiz details
      if (!curQuiz) {
        setQuiz(null); // If no quiz is found, set to null
      } else {
        setQuiz(curQuiz); // Update state with fetched quiz
      }
    } catch (error) {
      console.error("Error fetching quiz:", error); // Log the error for debugging
      setQuiz(null); // Set to null in case of an error
    }
  };

  // UseEffect to fetch the quiz whenever quizId or quizzes change
  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId); // Ensure quizId is passed correctly
    }
  }, [quizId, quizzes]); // Ensure it runs when either quizId or quizzes change

  const formatDate = (date: string | undefined): string => {
    if (!date) return "Not specified";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    if (quizId === "NewQuiz") {
      setIsNewQuiz(true);
      return;
    }
    const fetchQuestions = async () => {
      if (quizId) {
        // 确保 quizId 不为 undefined
        const data = await findQuestionsForQuiz(quizId);
        setQuestions(data);
      } else {
        console.error("Quiz ID is undefined");
      }
    };
    fetchQuestions();
  }, [quizId]);

  const isFaculty = currentUser.role === "FACULTY"; // Check if the user is a faculty member
  const totalPoints = questions.reduce(
    (sum: number, q: any) => sum + q.points,
    0
  ); // Sum of all question points

  return (
    <div className="container mt-4">
      <div id="wd-quiz-editor" className="mb-4"></div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Quiz Title</strong>
        </label>
        <div className="col-sm-9">{quiz?.title || "Untitled Quiz"}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Quiz Type</strong>
        </label>
        <div className="col-sm-9">{quiz?.type || "Graded Quiz"}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Points</strong>
        </label>
        <div className="col-sm-9">{quiz?.point || 0}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Status</strong>
        </label>
        <div className="col-sm-9">{quiz?.status || "Unpublished"}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Assignment Group</strong>
        </label>
        <div className="col-sm-9">{quiz?.assignmentGroup || "Quizzes"}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Shuffle Answers</strong>
        </label>
        <div className="col-sm-9">{quiz?.shuffleAnswer || "No"}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Time Limit</strong>
        </label>
        <div className="col-sm-9">{quiz?.timeLimit || "20"} Minutes</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Multiple Attempts</strong>
        </label>
        <div className="col-sm-9">{quiz?.multipleAttempts || "No"}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>How Many Attempts</strong>
        </label>
        <div className="col-sm-9">{quiz?.howManyAttempts || 1}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Show Correct Answers</strong>
        </label>
        <div className="col-sm-9">
          {quiz?.showCorrectAnswers || "Not specified"}
        </div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>One Question at a Time</strong>
        </label>
        <div className="col-sm-9">{quiz?.oneQuestionAtATime || "No"}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Webcam Required</strong>
        </label>
        <div className="col-sm-9">{quiz?.webcamRequired || "No"}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Lock Questions After Answering</strong>
        </label>
        <div className="col-sm-9">
          {quiz?.lockQuestionsAfterAnswering || "No"}
        </div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Due Date</strong>
        </label>
        <div className="col-sm-9">{formatDate(quiz?.dueDate)}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Available From</strong>
        </label>
        <div className="col-sm-9">{formatDate(quiz?.availableDate)}</div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3 col-form-label">
          <strong>Until Date</strong>
        </label>
        <div className="col-sm-9">{formatDate(quiz?.untilDate)}</div>
      </div>

      {/* Additional quiz fields */}
      <div className="mt-3">
        {isFaculty ? (
          <>
            {/* Edit Quiz Button */}
            <button
              className="btn btn-primary me-2"
              onClick={() =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Editor`)
              }
            >
              Edit Quiz
            </button>

            {/* Preview Quiz Button */}
            <button
              className="btn btn-secondary"
              onClick={() =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Preview`)
              }
            >
              Preview
            </button>
          </>
        ) : (
          <>
            {quiz && (
              <ProtectedStartQuizRoute quiz={quiz}>
                {/* Start Quiz Button for Students */}
                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Take`)
                  }
                >
                  Start Quiz
                </button>
              </ProtectedStartQuizRoute>
            )}
            {/* add some space between the buttons */}
            <div className="mt-2"></div>

            {/* Button to get last record */}
            {quiz && (
              <button
                className="btn btn-info"
                onClick={() =>
                  navigate(
                    `/Kanbas/Courses/${cid}/Quizzes/${quizId}/LastRecord`
                  )
                }
              >
                Get Last Record
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;
