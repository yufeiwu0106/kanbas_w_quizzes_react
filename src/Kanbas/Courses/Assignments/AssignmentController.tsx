import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// Add assignment
export default function AssignmentController( {cid } : {cid: any;}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const navigate = useNavigate();
  const addAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/New%20Assignment`)
  }

  if (currentUser.role != "FACULTY") {
    return null;
  }

  return (
    <div className="d-flex">
      <button
        id="wd-add-assignment-group"
        className="btn btn-lg btn-outline-secondary me-1"
      >
        + Group
      </button>
      <button onClick={addAssignment} id="wd-add-assignment" className="btn btn-lg btn-danger">
        + Assignment
      </button>
    </div>
  );
}
