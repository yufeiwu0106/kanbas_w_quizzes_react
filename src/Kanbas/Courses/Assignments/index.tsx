import GreenCheckPlus from "./GreenCheckPlus";
import { BsGripVertical } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./index.css";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import AssignmentController from "./AssignmentController";
import * as coursesClient from "../client";
import React, { useEffect } from "react";
import { setAssignments } from "./reducer";

export default function Assignments() {
  const dispatch = useDispatch();

  const { cid } = useParams();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignementsForCourse(
      cid as string
    );
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      <div
        id="wd-assignments"
        className="d-flex align-items-center justify-content-between mb-3"
      >
        <div className="input-group w-50">
          <span className="input-group-text bg-white border-end-0">
            <HiMagnifyingGlass />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            id="wd-search-assignment"
            placeholder="Search..."
          />
        </div>

        <AssignmentController cid={cid} />
      </div>

      {/* Assignment */}
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="list-group-item p-1 mb-3 fs-5 border-grey">
          <div className="wd-title p-3 ps-2 bg-secondary text-black">
            <BsGripVertical className="me-2 fs-3" />
            <AiFillCaretDown /> ASSIGNMENT
            <BiDotsVerticalRounded className="float-end mt-2" />
            <AiOutlinePlus className="float-end mt-2" />
            <button
              type="button"
              className="btn btn-outline-secondary text-black float-end me-1"
            >
              40% of Total
            </button>
          </div>
          <ul className="list-group list-group-flush">
            {assignments.map((assignment: any) => (
              // add a logging here
              console.log("assignment", assignment.title),
              <li
                className="wd-assignment-list-item list-group-item p-3 ps-1"
                style={{ borderLeft: "5px solid green" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <GiNotebook className="me-2 fs-3" />
                    <div>
                      <a
                        className="wd-assignment-link"
                        href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                        style={{
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        {assignment.title}
                      </a>
                      <br />
                      <span className="text-red">Multiple Modules</span>
                      <span style={{ color: "black" }}>
                        <b> | Not available until</b> {assignment.availableDate}
                      </span>
                      <br />
                      <span className="text-black">
                        <b>Due</b> {assignment.dueDate} | {assignment.point} pts{" "}
                        <br />
                      </span>
                    </div>
                  </div>
                  <GreenCheckPlus assignmentId={assignment._id} />
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
