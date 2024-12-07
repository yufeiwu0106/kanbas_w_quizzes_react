import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheck from "./GreenCheck";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as assignmentsClient from "./client";

export default function GreenCheckPlus({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role == "FACULTY";

  const handleConfirmDelete = async () => {
    dispatch(deleteAssignment(assignmentId)); // Dispatch the delete action

    await assignmentsClient.deleteAssignment(assignmentId);
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <GreenCheck />

      <IoEllipsisVertical className="fs-4" />

      {isFaculty && (
        <>
          <button
            id="wd-delete-assignment-btn"
            className="btn btn-lg btn-white me-1"
            data-bs-toggle="modal"
            data-bs-target={`#wd-delete-assignment-dialog-${assignmentId}`}
          >
            <FaTrash className="text-danger me-2 mb-1" />
          </button>

          <div
            id={`wd-delete-assignment-dialog-${assignmentId}`}
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Remove the assignment {assignmentId}?{" "}
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
