import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as quizClient from "./client";

export default function ProtectedQuizRoute({
  quiz,
  children,
}: {
  quiz: any;
  children: any;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [canTakeQuiz, setCanTakeQuiz] = useState(false);

  useEffect(() => {
    const checkQuizAttempts = async () => {
      try {
        // Get all records for this user and quiz
        const records = await quizClient.findRecordsForQuizAndUser(
          quiz._id,
          currentUser._id
        );

        // If multiple attempts are not allowed and there's at least one record
        if (quiz.multipleAttempts === "No" && records.length > 0) {
          setCanTakeQuiz(false);
        }
        // If multiple attempts are allowed, check against maximum attempts
        else if (quiz.multipleAttempts === "Yes") {
          setCanTakeQuiz(records.length < parseInt(quiz.howManyAttempts));
        }
        // If no attempts yet, allow taking the quiz
        else {
          setCanTakeQuiz(true);
        }
      } catch (error) {
        console.error("Error checking quiz attempts:", error);
        setCanTakeQuiz(false);
      } finally {
      }
    };

    checkQuizAttempts();
  }, [quiz._id, currentUser._id, quiz.multipleAttempts, quiz.howManyAttempts]);

  if (!canTakeQuiz) {
    return (
      <div className="alert alert-warning">
        You have reached the maximum number of attempts for this quiz.
      </div>
    );
  }

  return children;
}
