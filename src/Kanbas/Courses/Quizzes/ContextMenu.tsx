import { FaTrash } from "react-icons/fa";

import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ContextMenu({ quizId }: { quizId: string }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role == "FACULTY";

  const handleConfirmDelete = async () => {
    // TODO: Delete quiz
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* Green check icon */}
      <span className="me-1 position-relative">
        <FaCheckCircle
          style={{ top: "2px" }}
          className="text-success me-1 position-absolute fs-5"
        />
        <FaCircle className="text-white me-1 fs-6" />
      </span>

      <IoEllipsisVertical className="fs-4" />

      {isFaculty && (
        <>
          <button
            id="wd-delete-quiz-btn"
            className="btn btn-lg btn-white me-1"
            data-bs-toggle="modal"
            data-bs-target={`#wd-delete-quiz-dialog-${quizId}`}
          >
            <FaTrash className="text-danger me-2 mb-1" />
          </button>

          <div
            id={`wd-delete-quiz-dialog-${quizId}`}
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Remove the quiz {quizId}?{" "}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel{" "}
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Delete{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
