import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import ProtectedCourseRoute from "./ProtectedCourseRoute";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  // get users for the course
  const [users, setUsers] = useState<any[]>([]);
  const fetchUsersForCourse = async ( cid: any ) => {
    const users = await client.findUsersForCourse(cid);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsersForCourse(cid);
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedCourseRoute course={course}>
                  <Navigate to="Home" />
                </ProtectedCourseRoute>
              }
            />
            <Route
              path="Home"
              element={
                <ProtectedCourseRoute course={course}>
                  <Home />
                </ProtectedCourseRoute>
              }
            />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
