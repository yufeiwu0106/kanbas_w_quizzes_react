import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { findLastRecordForQuizAndUser, findQuestionsForQuiz } from "./client";
import { useEffect, useState } from "react";

const QuizLastRecord = () => {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const [lastRecord, setLastRecord] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [recordData, questionsData] = await Promise.all([
            findLastRecordForQuizAndUser(qid || "", currentUser._id),
            findQuestionsForQuiz(qid || "")
            ]);
            setLastRecord(recordData);
            setQuestions(questionsData);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [qid, currentUser._id]);

    if (loading) {
        return <div>Loading...</div>;
    }

  if (!lastRecord) {
    return <div>No previous attempts found for this quiz.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Quiz Results</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Summary</h5>
          <p className="card-text">
            <strong>Score:</strong> {lastRecord.score} points
          </p>
          <p className="card-text">
            <strong>Attempt Time:</strong>{" "}
            {new Date(lastRecord.attemptTime).toLocaleString()}
          </p>
        </div>
      </div>

      <h3>Question Details</h3>
      {questions.map((question, index) => {
        const answer = lastRecord.answers.find(
          (a: any) => a.questionId === question._id
        );
        
        return (
          <div key={question._id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Question {index + 1}</h5>
                <span className={`badge ${answer?.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                  {answer?.pointsEarned || 0}/{question.points} points
                </span>
              </div>
              
              <p className="card-text">{question.title}</p>
              <p className="card-text"><strong>Your Answer:</strong> {answer?.answer}</p>
              
              {answer?.isCorrect ? (
                <div className="text-success">
                  <i className="bi bi-check-circle"></i> Correct
                </div>
              ) : (
                <div className="text-danger">
                  <i className="bi bi-x-circle"></i> Incorrect
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizLastRecord;