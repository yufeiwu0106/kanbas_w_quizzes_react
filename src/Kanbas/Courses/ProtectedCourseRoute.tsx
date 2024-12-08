// Protect the route to a course so that only students enrolled in that course can navigate to the course,
// and stay in the Dashboard screen otherwise.

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  course,
  children,
}: {
  course: any;
  children: any;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role == "FACULTY";

  const { enrollments } = useSelector(
    (state: { enrollmentsReducer: { enrollments: any[] } }) =>
      state.enrollmentsReducer
  );

  console.log("course", course);
  console.log("currentUser", currentUser);
  console.log("enrollments", enrollments);

  const enrollmentObj = enrollments.find(
    (enrollment) =>
      enrollment.user === currentUser._id &&
      enrollment.course === course._id
  );

  console.log("isFaculty", isFaculty);
  console.log("enrollmentObj", enrollmentObj);

  if (isFaculty || enrollmentObj) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}
