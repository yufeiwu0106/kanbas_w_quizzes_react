import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EnrolledCourses({
  courses,
  isFaculty,
  deleteCourse,
  setCourse,
  enrolling,
  updateEnrollment,
}: {
  courses: any[];
  isFaculty: boolean;
  deleteCourse: (courseId: string) => void;
  setCourse: (courseId: string) => void;
  enrolling: boolean;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: { enrollmentsReducer: { enrollments: any[] } }) =>
      state.enrollmentsReducer
  );

  console.log("courses ", courses);
  console.log("enrolling ", enrolling);

  return (
    <div>
      <h2 id="wd-dashboard-published">
        {isFaculty
          ? "All Published Courses"
          : enrolling
          ? "All Published Courses"
          : "Enrolled Courses"}{" "}
        ({courses.length})
      </h2>

      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => {
            const enrolledCourse = course;
            const enrollmentObj = enrolledCourse
              ? enrollments.find(
                  (enrollment) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === enrolledCourse._id
                )
              : null;

            return (
              <div
                className="wd-dashboard-course col"
                style={{ width: "270px", marginBottom: "35px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <img
                    src={
                      course.image
                        ? course.image
                        : `/images/${course.number}.jpg`
                    }
                    width="100%"
                    height={160}
                  />

                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(`/Kanbas/Courses/${course._id}/Home`)
                      }
                    >
                      {" "}
                      Go{" "}
                    </button>

                    {enrolling && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(course._id, !course.enrolled);
                        }}
                        className={`btn ${
                          course.enrolled ? "btn-danger" : "btn-success"
                        } float-end`}
                      >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}

                    {isFaculty && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>

                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
