import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  // get current user
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role == "FACULTY";

  // get quizzes
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id == qid);

  // quiz state
  const [quizName, setQuizName] = useState(quiz?.title || "Untitled");
  const [quizType, setQuizType] = useState(quiz?.type || "Graded Quiz");
  const [quizPoint, setQuizPoint] = useState(quiz?.point || "100");
  const [assignmentGroup, setAssignmentGroup] = useState(
    quiz?.assignmentGroup || "Quizzes"
  );
  const [dueDate, setDueDate] = useState(quiz?.dueDate || "");
  const [availableDate, setAvailableDate] = useState(quiz?.availableDate || "");
  const [untilDate, setUntilDate] = useState(quiz?.untilDate || "");

  return (

    // Add a buttom "Preview" to navigate to quiz preview screen
    // href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Quesions/}`}

    <div id="wd-quiz-editor" className="container mt-4">
      {/* Add a buttom "Preview" to navigate to quiz preview screen */}
      <button
        className="btn btn-primary"
        // use href on click
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Questions/`)}
      >
        Preview
      </button>

      {/* Quizz Name */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Quize Name
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            onChange={(e) => {
              setQuizName(e.target.value);
            }}
            defaultValue={quiz?.title || "Untitled"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Quiz Type with value from quiz.type */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Quiz Type
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            onChange={(e) => {
              setQuizType(e.target.value);
            }}
            defaultValue={quiz?.type || "Untitled"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Quiz Point */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Points
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            onChange={(e) => {
              setQuizPoint(e.target.value);
            }}
            defaultValue={quiz?.point || "100"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Assignment Group */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Assignment Group
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            onChange={(e) => {
              setAssignmentGroup(e.target.value);
            }}
            defaultValue={quiz?.assignmentGroup || "Quizzes"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Shuffle answer with yes or no */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Shuffle Answer
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.shuffleAnswer || "Yes"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Time Limit */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Time Limit
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.timeLimit || "20"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Multiple Attempts */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Multiple Attempts
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.multipleAttempts || "No"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* How many attempts */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          How many attempts
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.howManyAttempts || "1"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Show correct Answers */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Show correct Answers
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.showCorrectAnswers || "Immediately"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Access Code - default value is empty */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Access Code
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.accessCode || ""}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* One question at a time, default Yes */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          One question at a time
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.oneQuestionAtATime || "Yes"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Webcam Required */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Webcam Required
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.webcamRequired || "No"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Lock Questions after answering - default No */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Lock Questions after answering
        </label>
        <div className="col-sm-10">
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.lockQuestionsAfterAnswering || "No"}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Due Date */}
      <div className="mb-3">
        <label htmlFor="wd-due-date" className="form-label">
          <b>Due</b>
        </label>
        <input
          type="datetime-local"
          id="wd-due-date"
          value={quiz?.dueDate}
          className="form-control"
          onChange={(e) => setDueDate(e.target.value)} // Update state on change
        />
      </div>

      {/* Available Date */}
      <div className="col-sm-6">
        <label htmlFor="wd-available-from" className="form-label">
          <b>Available From</b>
        </label>
        <input
          type="datetime-local"
          id="wd-available-from"
          className="form-control"
          value={quiz?.availableDate}
          onChange={(e) => setAvailableDate(e.target.value)} // Update state on change
        />
      </div>

      {/* Until Date */}
      <div className="col-sm-6">
        <label htmlFor="wd-available-until" className="form-label">
          <b>Until</b>
        </label>
        <input
          type="datetime-local"
          id="wd-available-until"
          value={quiz?.untilDate}
          className="form-control"
          onChange={(e) => setUntilDate(e.target.value)} // Update state on change
        />
      </div>
    </div>
  );
}
