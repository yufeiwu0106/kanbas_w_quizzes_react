import { useParams } from "react-router";

export default function Navigation({ pathname }: { pathname: string }) {
  const { cid, qid } = useParams();

  // Determine if the current path is for editing or creating a new quiz
  const isEditMode = pathname.includes("edit");
  const isEditDetail = pathname.includes("editdetail");
  const isNewDetail = pathname.includes("newdetail");
  const isQuestionList = pathname.includes("QuestionList");

  // Generate hrefs based on the current mode
  const detailsHref =
    isEditMode || isQuestionList
      ? `#/Kanbas/Courses/${cid}/Quizzes/${qid}/editdetail`
      : `#/Kanbas/Courses/${cid}/Quizzes/newdetail`;
  const questionsHref = `#/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionList`;

  // Determine the styles and disabled status based on the pathname
  const detailsStyle = {
    color: isEditDetail || isNewDetail ? "black" : "#dc3545",
  };

  const questionsStyle = {
    color: isEditDetail ? "#dc3545" : isQuestionList ? "black" : "grey",
  };

  const questionsDisabled = isNewDetail;

  return (
    <div id="wd-quiz-editor">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            id="quiz-edit"
            href={detailsHref}
            className={`nav-link ${
              isEditDetail || isNewDetail ? "active" : ""
            }`}
            style={detailsStyle}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            id="questions-edit"
            href={questionsHref}
            className={`nav-link ${isQuestionList ? "active" : ""}`}
            style={questionsStyle}
            aria-disabled={questionsDisabled}
            onClick={(e) => {
              if (questionsDisabled) e.preventDefault();
            }}
          >
            Questions
          </a>
        </li>
      </ul>
    </div>
  );
}
