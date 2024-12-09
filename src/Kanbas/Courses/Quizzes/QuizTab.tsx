import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const QuizTab = () => {
  const { cid, qid: quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const getLastPathSegment = () => {
    const segments = location.pathname.split("/");
    return segments[segments.length - 1];
  };

  const activeSegment = getLastPathSegment();

  const cardStyle = {
    borderRadius: "8px",
    overflow: "hidden",
  };

  const cardHeaderStyle = {
    display: "flex",
    gap: "10px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
  };

  const activeLinkStyle = {
    color: "black",
    borderBottom: "3px solid black",
    backgroundColor: "transparent",
    width: "150px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const inactiveLinkStyle = {
    color: "red",
    borderBottom: "3px #f8f9fa",
    backgroundColor: "transparent",
    width: "150px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  };



  return (
    <div style={cardStyle}>
<div style={{ ...cardHeaderStyle, justifyContent: "flex-start" }}>
{/* Details Tab */}
        <div
          style={activeSegment === "Editor" ? activeLinkStyle : inactiveLinkStyle}
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Editor`)
          }
        >
          Details
        </div>

        {/* Questions Tab */}
        <div
          style={activeSegment === "Preview" ? activeLinkStyle : inactiveLinkStyle}
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Preview`)
          }
        >
          Questions
        </div>
      </div>
      {/* 卡片内容区域 */}
      
    </div>
  );
};

export default QuizTab;
