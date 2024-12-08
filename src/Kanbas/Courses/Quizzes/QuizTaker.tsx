import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findQuestionsForQuiz } from "./client";
import { useSelector } from "react-redux";
import axios from "axios";

const QuizTaker = ({ onSubmit }: { onSubmit?: (score: number) => void }) => {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  const fetchQuestions = async () => {
    try {
      const data = await findQuestionsForQuiz(qid || "");
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev: any) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    let totalScore = 0;
    const gradedAnswers = questions.map((question) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;
      let pointsEarned = 0;

      if (
        question.type === "True/False" ||
        question.type === "Multiple Choice"
      ) {
        isCorrect = userAnswer === question.correctAnswer;
        pointsEarned = isCorrect ? question.points : 0;
      } else if (question.type === "Fill in the Blank") {
        isCorrect = question.correctAnswers.includes(userAnswer);
        pointsEarned = isCorrect ? question.points : 0;
      }

      totalScore += pointsEarned;

      return {
        questionId: question._id,
        answer: userAnswer,
        isCorrect,
        pointsEarned,
      };
    });

    try {
      const record = {
        quizId: qid,
        userId: currentUser._id,
        answers: gradedAnswers,
        score: totalScore,
        attemptTime: new Date().toISOString(),
      };
      await axios.post("/api/records", record);
      if (onSubmit) {
        onSubmit(totalScore);
      } else {
        alert(`Quiz submitted successfully! Your score: ${totalScore}`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <form>
      <ul className="list-group">
        {questions.map((question, index) => (
          <li key={question._id} className="list-group-item mb-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5>
                  Q{index + 1}: {question.title}
                </h5>
                <p>{question.description}</p>
              </div>
            </div>

            {question.type === "True/False" && (
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="true"
                    onChange={() => handleAnswerChange(question._id, "true")}
                  />{" "}
                  True
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="false"
                    onChange={() => handleAnswerChange(question._id, "false")}
                  />{" "}
                  False
                </label>
              </div>
            )}

            {question.type === "Multiple Choice" && (
              <div>
                {question.options.map((option: any, optIndex: number) => (
                  <div key={optIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option.text}
                        onChange={() =>
                          handleAnswerChange(question._id, option.text)
                        }
                      />{" "}
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {question.type === "Fill in the Blank" && (
              <div>
                <label>
                  Your Answer:{" "}
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      handleAnswerChange(question._id, e.target.value)
                    }
                  />
                </label>
              </div>
            )}

            <p className="text-secondary">Points: {question.points}</p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="btn btn-success mt-3"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </form>
  );
};

export default QuizTaker;
