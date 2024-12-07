import { IoIosArrowDown } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAssignments } from "./reducer";
import { useState } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const assignment = assignments.find((a: any) => a._id === aid);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role == "FACULTY";

  const addOrUpdateAssignmentToBackend = async (aid: string, assignment: any) => {
    const existingAssignmentIndex = assignments.findIndex(
      (a: any) => a._id === aid
    );

    if (existingAssignmentIndex !== -1) {
      await assignmentsClient.updateAssignment(aid, assignment);
    } else {
      await coursesClient.createAssignmentForCourse(assignment.course, assignment);
    }
  }

  // asignment title state
  const [assignmentName, setAssignmentName] = useState(
    assignment?.title || "Untitled"
  );

  // description
  const DEFAULT_DESCRIPTION = `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
  - Your full name and section
  - Links to each of the lab assignments
  - Link to the Kanbas application
  - Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`;

  const [description, setDescription] = useState(
    assignment?.description || DEFAULT_DESCRIPTION
  );

  // available/due/until date state
  const DEFAULT_DATE = "2024-01-01T00:00";
  const [availableDate, setAvailableDate] = useState(
    assignment?.availableDate || DEFAULT_DATE
  );
  const [dueDate, setDueDate] = useState(assignment?.dueDate || DEFAULT_DATE);
  const [untilDate, setUntilDate] = useState(
    assignment?.untilDate || DEFAULT_DATE
  );

  // point state
  const DEFAULT_POINT = "100";
  const [point, setPoint] = useState(DEFAULT_POINT);

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Assignment Name
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            onChange={(e) => {
              setAssignmentName(e.target.value);
            }}
            defaultValue={assignment?.title || "Untitled"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-description" className="col-sm-2 col-form-label">
          Description
        </label>
        <div className="col-sm-10">
          <textarea
            id="wd-description"
            className="form-control"
            style={{ height: "400px" }}
            defaultValue={assignment?.description || DEFAULT_DESCRIPTION}
            onChange={(e) => setDescription(e.target.value)}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-points" className="col-sm-2 col-form-label">
          Points
        </label>
        <div className="col-sm-10">
          <input
            id="wd-points"
            value={assignment?.point}
            className="form-control"
            onChange={(e) => {
              setPoint(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-group" className="col-sm-2 col-form-label">
          Assignment Group
        </label>
        <div className="col-sm-10 position-relative">
          <select id="wd-group" className="form-control">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </select>
          <IoIosArrowDown
            className="position-absolute"
            style={{ top: "45%", right: "15px", transform: "translateY(-50%)" }}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label
          htmlFor="wd-display-grade-as"
          className="col-sm-2 col-form-label"
        >
          Display Grade as
        </label>
        <div className="col-sm-10 position-relative">
          <select id="wd-display-grade-as" className="form-control">
            <option value="Percentage">Percentage</option>
          </select>
          <IoIosArrowDown
            className="position-absolute"
            style={{ top: "45%", right: "15px", transform: "translateY(-50%)" }}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label">
          Submission Type
        </label>
        <div className="col-sm-10">
          <div className="card p-3">
            <select id="wd-submission-type" className="form-control mb-3">
              <option value="Online">Online</option>
            </select>
            <label className="form-label">
              <b>Online Entry Options</b>
            </label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-text-entry"
              />
              <label htmlFor="wd-text-entry" className="form-check-label">
                Text Entry
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-website-url"
                defaultChecked
              />
              <label htmlFor="wd-website-url" className="form-check-label">
                Website URL
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings" className="form-check-label">
                Media Recordings
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-student-annotation"
              />
              <label
                htmlFor="wd-student-annotation"
                className="form-check-label"
              >
                Student Annotation
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-file-upload"
              />
              <label htmlFor="wd-file-upload" className="form-check-label">
                File Uploads
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label">
          Assign
        </label>
        <div className="col-sm-10">
          <div className="card p-3">
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="form-label">
                <b>Assign to</b>
              </label>
              <input
                id="wd-assign-to"
                value="Everyone"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label">
                <b>Due</b>
              </label>
              <input
                type="datetime-local"
                id="wd-due-date"
                value={assignment?.dueDate}
                className="form-control"
                onChange={(e) => setDueDate(e.target.value)} // Update state on change
              />
            </div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="wd-available-from" className="form-label">
                  <b>Available From</b>
                </label>
                <input
                  type="datetime-local"
                  id="wd-available-from"
                  className="form-control"
                  value={assignment?.availableDate}
                  onChange={(e) => setAvailableDate(e.target.value)} // Update state on change
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="wd-available-until" className="form-label">
                  <b>Until</b>
                </label>
                <input
                  type="datetime-local"
                  id="wd-available-until"
                  value={assignment?.untilDate}
                  className="form-control"
                  onChange={(e) => setUntilDate(e.target.value)} // Update state on change
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFaculty && (
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={async () => {
              const newAssignment = {
                title: assignmentName,
                course: cid,
                description: description,
                availableDate: availableDate,
                dueDate: dueDate,
                untilDate: untilDate,
                point: point,
              };

              // dispatch(addOrUpdateAssignment({...newAssignment, _id: aid}));
              setAssignmentName(assignmentName);
              await addOrUpdateAssignmentToBackend(
                aid as string,
                newAssignment,
              );
              
              const assignments = await coursesClient.findAssignementsForCourse(
                cid as string
              );
              dispatch(setAssignments(assignments));

              navigate(`/Kanbas/Courses/${cid}/Assignments`);
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
