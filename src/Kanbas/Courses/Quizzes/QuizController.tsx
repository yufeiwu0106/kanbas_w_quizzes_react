import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Add quiz
export default function QuizController({ cid }: { cid: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const navigate = useNavigate();
  const addQuiz = () => {
    // TODO: Add quiz
    navigate(`/Kanbas/Courses/${cid}/Quizzes/New%20Quiz`);
  };

  if (currentUser.role != "FACULTY") {
    return null;
  }

  return (
    <div className="d-flex">
      <button
        onClick={addQuiz}
        id="wd-add-quiz"
        className="btn btn-lg btn-danger"
      >
        + Quiz
      </button>
    </div>
  );
}
