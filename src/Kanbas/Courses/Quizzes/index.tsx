import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEllipsisV, FaCheckCircle, FaPlus } from "react-icons/fa";
import "./index.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { RxRocket } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import QuizController from "./QuizController";
import ContextMenu from "./ContextMenu";
import { setQuizzes } from "./reducer";
import { findQuizzesForCourse } from "./client";
import * as quizClient from "./client";

function Quizzes() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  type LastRecords = {
    [quizId: string]: any;
  };

  // const quizzes = quizzesData;
  const [quizzes, setQuizzesState] = useState<any[]>([]);
  const [lastRecords, setLastRecords] = useState<LastRecords>({}); // To store last record per quiz

  const fetchQuizzes = async () => {
    if (!cid) return;
    try {
      const quizzesData = await quizClient.findQuizzesForCourse(cid); // Fetch quizzes data from API
      console.log("Fetched quizzes: ", quizzesData);

      // Fetch questions for each quiz and set the question count
      const quizzesWithQuestionCount = await Promise.all(
        quizzesData.map(async (quiz: any) => {
          const questions = await quizClient.findQuestionsForQuiz(quiz._id);
          return { ...quiz, questionCount: questions.length };
        })
      );
      setQuizzesState(quizzesWithQuestionCount);
      dispatch(setQuizzes(quizzesWithQuestionCount));

      // If the user is a student, fetch the last record for each quiz
      if (currentUser.role === "STUDENT") {
        const records = await Promise.all(
          quizzesData.map(async (quiz: any) => {
            try {
              const lastRecord = await quizClient.findLastRecordForQuizAndUser(
                quiz._id,
                currentUser._id
              );
              return { quizId: quiz._id, lastRecord };
            } catch (error) {
              console.error(
                `Failed to fetch last record for quiz ${quiz._id}:`,
                error
              );
              return { quizId: quiz._id, lastRecord: null };
            }
          })
        );

        // Map the records to an object with quizId as the key
        const recordsMap = records.reduce(
          (
            acc: Record<string, (typeof records)[0]["lastRecord"]>,
            { quizId, lastRecord }
          ) => {
            acc[quizId] = lastRecord;
            return acc;
          },
          {}
        );

        setLastRecords(recordsMap);
      }
    } catch (error) {
      console.error("Error fetching quizzes for course:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  // Delete quiz
  const deleteQuiz = async (quizId: string) => {
    const status = await quizClient.deleteQuiz(quizId);
    setQuizzesState(quizzes.filter((quiz) => quiz._id !== quizId));
    fetchQuizzes();
  };

  const getAvailabilityStatus = (
    availableDate: string,
    availableUntilDate: string
  ) => {
    const now = new Date();
    const availableFrom = new Date(availableDate);
    const availableUntil = new Date(availableUntilDate);

    if (now < availableFrom) {
      return `Not available until ${formatDate(availableDate)}`;
    } else if (now > availableUntil) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  return (
    <div>
      <div
        id="wd-assignments"
        className="d-flex align-items-center justify-content-between mb-3"
      >
        <div className="input-group w-50">
          <span className="input-group-text bg-white border-end-0">
            <HiMagnifyingGlass />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            id="wd-search-assignment"
            placeholder="Search..."
          />
        </div>

        <QuizController cid={cid} />
      </div>

      {/* Assignment QUIZZES*/}
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="list-group-item p-1 mb-3 fs-5 border-grey">
          <div className="wd-title p-3 ps-2 bg-secondary text-black">
            <AiFillCaretDown /> ASSIGNMENT QUIZZES
            <BiDotsVerticalRounded className="float-end mt-2" />
            <AiOutlinePlus className="float-end mt-2" />
            <button
              type="button"
              className="btn btn-outline-secondary text-black float-end me-1"
            >
              40% of Total
            </button>
          </div>
          <ul className="list-group list-group-flush">
            {quizzes.map(
              (quiz: any) => (
                // add a logging here
                console.log("assignment", quiz.title),
                (
                  <li
                    className="wd-assignment-list-item list-group-item p-3 ps-1"
                    style={{ borderLeft: "5px solid green" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <RxRocket className="ms-2 me-4 fs-4 text-success" />
                        <div>
                          <a
                            className="wd-assignment-link"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                            style={{
                              color: "black",
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            {quiz.title}
                          </a>
                          <br />
                          <span className="text-black">
                            <b>
                              {getAvailabilityStatus(
                                quiz.availableDate,
                                quiz.dueDate
                              )}
                            </b>
                            <b> | Due:</b> {formatDate(quiz.dueDate)}
                            <b> | Points:</b> {quiz.point} pts
                            {/* Number of questions*/}
                            <b> | {quiz.questionCount} </b>Questions
                            {/* to do: Score if the current user is a student,*/}
                            {currentUser.role === "STUDENT" && (
                              <>
                                <b> | Score:</b>
                                {/* Add the score logic or value here */}
                              </>
                            )}
                            {currentUser.role === "STUDENT" && (
                              <>
                                <b> | Score:</b>
                                {lastRecords[quiz._id] ? (
                                  // If a record exists for the quiz, display the score
                                  <span>{lastRecords[quiz._id]?.score}</span>
                                ) : (
                                  // If the record explicitly does not exist (null), show "No record found"
                                  <span>No record found</span>
                                )}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      <div style={{ position: "relative", right: "2rem" }}>
                        <ContextMenu
                          quizId={quiz._id}
                          deleteQuiz={deleteQuiz}
                        />
                      </div>
                    </div>
                  </li>
                )
              )
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Quizzes;
