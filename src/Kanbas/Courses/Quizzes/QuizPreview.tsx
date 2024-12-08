import React from "react";
import QuizTaker from "./QuizTaker";
import { useParams, useNavigate } from "react-router-dom";

const QuizPreview = () => {
  const { cid, qid: quizId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Quiz Preview</h1>
      <QuizTaker />
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Editor`)}
      >
        Edit Quiz
      </button>
    </div>
  );
};

export default QuizPreview;
