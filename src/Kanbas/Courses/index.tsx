import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import ProtectedCourseRoute from "./ProtectedCourseRoute";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as client from "./client";
import QuizDetail from "./Quizzes/QuizDetail";
import QuestionEditor from "./Quizzes/QuestionEditor/NewQuestionEditor";
import NewQuestionEditor from "./Quizzes/QuestionEditor/NewQuestionEditor";
import QuizTaker from "./Quizzes/QuizTaker";
import QuizLastRecord from "./Quizzes/QuizLastRecord";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses?.find((course) => course?._id === cid) || null;
  const { pathname } = useLocation();

  // get users for the course
  const [users, setUsers] = useState<any[]>([]);
  const fetchUsersForCourse = async (cid: any) => {
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
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid/Editor" element={<QuizEditor />} />
            <Route path="Quizzes/:qid" element={<QuizDetail />} />
            <Route path="Quizzes/:qid/Preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/Take" element={<QuizTaker />} />
            <Route path="Quizzes/:qid/LastRecord" element={<QuizLastRecord />} />
            <Route path="People" element={<PeopleTable users={users} />} />
            <Route path="Quizzes/:qid/Questions" element={<QuestionEditor />} />
            <Route
              path="Quizzes/:qid/Questions/:questionId/Edit"
              element={<QuestionEditor />}
            />
            <Route
              path="Quizzes/:qid/edit/NewQuestion"
              element={<NewQuestionEditor />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
