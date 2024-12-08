import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findQuestionsForQuiz } from "./client";

const QuizPreview = () => {
  const { cid, qid: quizId } = useParams(); 
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 获取题目数据
  const fetchQuestions = async () => {
    try {
      console.log("Fetching questions for quiz:", quizId); 
      const data = await findQuestionsForQuiz(quizId || ""); 
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Quiz Preview</h1>
      <h3 className="text-secondary">Quiz ID: {quizId}</h3>

      {questions.length === 0 ? (
        <div className="alert alert-warning">No questions available for this quiz.</div>
      ) : (
        <ul className="list-group">
          {questions.map((question, index) => (
            <li key={question._id} className="list-group-item mb-3">
              <h5>
                Q{index + 1}: {question.title}
              </h5>
              <p>{question.description}</p>

              {/* 渲染问题类型 */}
              {question.type === "True/False" && (
                <div>
                  <label>
                    <input type="radio" name={`question-${index}`} value="true" /> True
                  </label>
                  <br />
                  <label>
                    <input type="radio" name={`question-${index}`} value="false" /> False
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
                    <input type="text" className="form-control" name={`question-${index}`} />
                  </label>
                </div>
              )}

              {/* 显示每个问题的分数 */}
              <p className="text-secondary">Points: {question.points}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizPreview;
