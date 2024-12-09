import { useParams, useNavigate } from "react-router";

export default function Navigation({ pathname }: { pathname: string }) {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  // Determine if the current path is for editing or creating a new quiz
  const isPreview = pathname.includes("Preview");
  const isDetails = !isPreview; // If not in preview, we're in details

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleQuestionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`);
  };

  // Determine the styles based on active state
  const detailsStyle = {
    color: isDetails ? "black" : "#dc3545",
    backgroundColor: isDetails ? "#f8f9fa" : "transparent",
    borderBottom: isDetails ? "2px solid black" : "none",
  };

  const questionsStyle = {
    color: isPreview ? "black" : "#dc3545",
    backgroundColor: isPreview ? "#f8f9fa" : "transparent",
    borderBottom: isPreview ? "2px solid black" : "none",
  };

  return (
    <div id="wd-quiz-editor">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            id="quiz-edit"
            href="#"
            className={`nav-link ${isDetails ? "active" : ""}`}
            style={detailsStyle}
            onClick={handleDetailsClick}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            id="questions-edit"
            href="#"
            className={`nav-link ${isPreview ? "active" : ""}`}
            style={questionsStyle}
            onClick={handleQuestionsClick}
          >
            Questions
          </a>
        </li>
      </ul>
    </div>
  );
}
