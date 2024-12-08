import { FaTrash } from "react-icons/fa";
import { RiForbidLine } from "react-icons/ri";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizClient from "./client";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export default function ContextMenu({
  quizId,
  deleteQuiz,
}: {
  quizId: string;
  deleteQuiz: (quizId: string) => void;
}) {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>();
  const [isPublished, setPublish] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const isFaculty = currentUser.role === "FACULTY";
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    const quiz = await quizClient.findOneSpecificQuiz(quizId as string);
    setQuiz(quiz);
    setPublish(quiz.status === "Published");
  };
  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const toggleContextMenu = () => {
    setIsContextMenuOpen((prev) => !prev);
  };

  // // Delete quiz
  // const handleDelete = async (quizId: string) => {
  //   const status = await quizClient.deleteQuiz(quizId);
  //   toggleContextMenu();
  // };

  // Edit quiz
  const handleEdit = async () => {
    console.log("Course ID:", cid);
    console.log("Quiz ID:", quizId);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
    toggleContextMenu();
  };

  // Publish/Unpublish quiz
  const handlePublish = async () => {
    // Update the local state to reflect the new status
    setPublish(!isPublished);
    try {
      // Toggle the `status` field
      const updatedQuiz = {
        ...quiz,
        status: isPublished ? "Unpublished" : "Published",
      };
      // Update the quiz using the API
      await quizClient.updateQuiz(quizId, updatedQuiz);
      // Re-fetch the quiz to ensure state consistency
      fetchQuiz();
      toggleContextMenu();
    } catch (error) {
      console.error("Error updating quiz status:", error);
    }
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* when quiz is unpublished */}
      {!isPublished && (
        <RiForbidLine
          style={{ top: "2px" }}
          className="text-danger me-4 position-relative fs-4"
        />
      )}

      {/* when quiz is published */}
      {/* Green check icon */}
      {isPublished && (
        <span className="me-4 position-relative">
          <FaCheckCircle
            style={{ top: "2px" }}
            className="text-success me-1 position-absolute fs-5"
          />
          <FaCircle className="text-white me-1 fs-6" />
        </span>
      )}

      {isFaculty && (
        <IoEllipsisVertical
          className="fs-4 me-3"
          onClick={() => toggleContextMenu()}
        />
      )}

      {isContextMenuOpen && (
        <div
          className="dropdown-menu show position-absolute"
          style={{
            right: "0",
            top: "2rem",
            zIndex: 1000,
            backgroundColor: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Edit Option */}
          <button className="dropdown-item" onClick={handleEdit}>
            Edit
          </button>

          {/* Delete Option */}
          <button
            className="dropdown-item"
            onClick={() => {
              deleteQuiz(quizId);
              toggleContextMenu();
            }}
          >
            Delete
          </button>

          {/* Publish/Unpublish Option */}
          <button className="dropdown-item" onClick={handlePublish}>
            {isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      )}
    </div>
  );
}
