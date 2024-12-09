import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as quizClient from "./client";
import QuizTab from "./QuizTab";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const isNewQuiz = qid === "NewQuiz";

  // get current user
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  // get quizzes
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);

  // Define initial state for a new quiz or edit an existing quiz
  const initialQuizState = isNewQuiz
    ? {
        _id: "123",
        title: "Untitled",
        type: "Graded Quiz",
        point: "100",
        status: "Unpublished",
        assignmentGroup: "Quizzes",
        dueDate: "",
        availableDate: "",
        untilDate: "",
        shuffleAnswer: "Yes",
        timeLimit: "20",
        multipleAttempts: "No",
        howManyAttempts: "1",
        showCorrectAnswers: "Immediately",
        accessCode: "",
        oneQuestionAtATime: "Yes",
        webcamRequired: "No",
        lockQuestionsAfterAnswering: "No",
      }
    : {
        _id: quiz?._id || "123",
        title: quiz?.title || "Untitled",
        type: quiz?.type || "Graded Quiz",
        point: quiz?.point || "100",
        status: quiz?.status || "Unpublished",
        assignmentGroup: quiz?.assignmentGroup || "Quizzes",
        dueDate: quiz?.dueDate || "",
        availableDate: quiz?.availableDate || "",
        untilDate: quiz?.untilDate || "",
        shuffleAnswer: quiz?.shuffleAnswer || "Yes",
        timeLimit: quiz?.timeLimit || "20",
        multipleAttempts: quiz?.multipleAttempts || "No",
        howManyAttempts: quiz?.howManyAttempts || "1",
        showCorrectAnswers: quiz?.showCorrectAnswers || "Immediately",
        accessCode: quiz?.accessCode || "",
        oneQuestionAtATime: quiz?.oneQuestionAtATime || "Yes",
        webcamRequired: quiz?.webcamRequired || "No",
        lockQuestionsAfterAnswering: quiz?.lockQuestionsAfterAnswering || "No",
      };

  const [quizData, setQuizData] = useState(initialQuizState);

  // Handle Save Button
  const handleSave = async (cid: string, qid: string) => {
    try {
      if (isNewQuiz) {
        // Logic for creating a new quiz
        const newQuizData = {
          ...quizData,
          status: "Unpublished", // Ensure the quiz is saved as unpublished
        };

        // Call the API to create the quiz
        const createdQuiz = await quizClient.createQuizForCourse(
          cid,
          newQuizData
        );

        // Navigate to the details of the newly created quiz
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${createdQuiz._id}`);
      } else {
        // Logic for updating an existing quiz
        const updatedQuizData = {
          ...quizData,
        };

        // Call the API to update the quiz
        await quizClient.updateQuiz(qid, updatedQuizData);

        // Navigate to the details of the updated quiz
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
      }
    } catch (error) {
      console.error("Failed to save the quiz:", error);
      alert("An error occurred while saving the quiz. Please try again.");
    }
  };

  // Handle Save and Publish Button
  const handleSaveAndPublish = async (cid: string, qid: string) => {
    try {
      if (isNewQuiz) {
        // Logic for creating a new quiz
        const newQuizData = {
          ...quizData,
          status: "Published", // Mark the quiz as published
        };

        // Call the API to create the quiz
        const createdQuiz = await quizClient.createQuizForCourse(
          cid,
          newQuizData
        );
      } else {
        // Logic for updating an existing quiz
        const updatedQuizData = {
          ...quizData,
          status: "Published", // Mark the quiz as published
        };

        // Call the API to update the quiz
        await quizClient.updateQuiz(qid, updatedQuizData);
      }

      // After saving, navigate to the quiz list page
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to save and publish the quiz:", error);
      alert(
        "An error occurred while saving and publishing the quiz. Please try again."
      );
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    // Simply navigate back to the quiz list without saving
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="container mt-4">
      <QuizTab />
      <br/>
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
              setQuizData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }));
            }}
            defaultValue={quizData.title}
            readOnly={!isFaculty}
          />
        </div>
      </div>

      {/* Quiz Type with value from quiz.type */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Quiz Types
        </label>
        <div className="col-sm-10">
          <select
            id="wd-quiz-type"
            className="form-select"
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                type: e.target.value,
              }));
            }}
            value={quizData.type} // Default value for new quizzes
            disabled={!isFaculty} // Make dropdown readonly for non-faculty users
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
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
              setQuizData((prevData) => ({
                ...prevData,
                point: e.target.value,
              }));
            }}
            defaultValue={quizData.point}
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
              setQuizData((prevData) => ({
                ...prevData,
                assignmentGroup: e.target.value,
              }));
            }}
            defaultValue={quizData.assignmentGroup}
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
          <select
            id="wd-shuffle-answer"
            className="form-select"
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                shuffleAnswer: e.target.value,
              }));
            }}
            value={quizData.shuffleAnswer}
            disabled={!isFaculty} // Make dropdown readonly for non-faculty users
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
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
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                timeLimit: e.target.value,
              }));
            }}
            defaultValue={quizData.timeLimit}
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
          <select
            id="wd-multiple-attempts"
            className="form-select"
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                multipleAttempts: e.target.value,
              }));
            }}
            value={quizData.multipleAttempts} // Default value for new quizzes
            disabled={!isFaculty} // Make dropdown readonly for non-faculty users
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
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
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                howManyAttempts: e.target.value,
              }));
            }}
            defaultValue={quizData.howManyAttempts}
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
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                showCorrectAnswers: e.target.value,
              }));
            }}
            defaultValue={quizData.showCorrectAnswers}
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
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                accessCode: e.target.value,
              }));
            }}
            defaultValue={quizData.accessCode}
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
          <select
            id="wd-one-question"
            className="form-select"
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                oneQuestionAtATime: e.target.value,
              }));
            }}
            value={quizData.oneQuestionAtATime}
            disabled={!isFaculty} // Read-only for non-faculty users
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Webcam Required */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Webcam Required
        </label>
        <div className="col-sm-10">
          <select
            id="wd-webcam-required"
            className="form-select"
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                webcamRequired: e.target.value,
              }));
            }}
            value={quizData.webcamRequired}
            disabled={!isFaculty} // Read-only for non-faculty users
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Lock Questions after answering - default No */}
      <div className="mb-3 row">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label">
          Lock Questions after answering
        </label>
        <div className="col-sm-10">
          <select
            id="wd-lock-questions"
            className="form-select"
            onChange={(e) => {
              setQuizData((prevData) => ({
                ...prevData,
                lockQuestionsAfterAnswering: e.target.value,
              }));
            }}
            value={quizData.lockQuestionsAfterAnswering}
            disabled={!isFaculty} // Read-only for non-faculty users
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
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
          value={quizData.dueDate}
          className="form-control"
          onChange={(e) => {
            setQuizData((prevData) => ({
              ...prevData,
              dueDate: e.target.value,
            }));
          }}
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
          value={quizData.availableDate}
          onChange={(e) => {
            setQuizData((prevData) => ({
              ...prevData,
              availableDate: e.target.value,
            }));
          }}
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
          value={quizData.untilDate}
          className="form-control"
          // Update state on change
          onChange={(e) => {
            setQuizData((prevData) => ({
              ...prevData,
              untilDate: e.target.value,
            }));
          }}
        />
      </div>

      {/* Action buttons in one row */}
      <div className="d-flex justify-content-start mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => handleSave(cid as string, qid as string)}
        >
          Save
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => handleSaveAndPublish(cid as string, qid as string)}
        >
          Save and Publish
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
