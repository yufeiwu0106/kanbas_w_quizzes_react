import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInBlanksEditor from "./FillInBlanksEditor";
import { IoIosArrowDown } from "react-icons/io";
import { Question } from "../../../types";
import * as client from "./client";
import { addQuestion, editQuestion } from "./reducer";

interface Choice {
  text: string;
  isCorrect: boolean;
}

const QuestionEditor = () => {
  const { cid, qid, questionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = useSelector((state: any) =>
    state.questionReducer ? state.questionReducer.questions : []
  );

  const [currQuestion, setCurrQuestion] = useState<Question>({
    quizID: qid || "",
    title: "",
    type: "Multiple Choice",
    question: "",
    points: 10,
    answers: {},
    correctAnswer: "",
    correctAnswers: [],
  });

  const [choices, setChoices] = useState<Choice[]>([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    -1
  );

  useEffect(() => {
    const fetchQuestion = async () => {
      if (questionId) {
        try {
          const response = await client.fetchOneQuestion(questionId);

          // Update current question state
          setCurrQuestion({
            quizID: qid || "",
            title: response.title,
            type: response.type,
            question: response.description,
            points: response.points,
            answers: response.answers || {},
            correctAnswer: response.correctAnswer?.toString() || "",
            correctAnswers: response.correctAnswers || [],
          });

          // Handle different question types
          if (response.type === "Multiple Choice" && response.options) {
            setChoices(
              response.options.map((option: any) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              }))
            );
          } else if (response.type === "True/False") {
            setCurrQuestion((prev) => ({
              ...prev,
              answers: { "1": response.correctAnswer ? "True" : "False" },
            }));
          } else if (response.type === "Fill in the Blank") {
            setCurrQuestion((prev) => ({
              ...prev,
              correctAnswers: response.correctAnswers || [],
            }));
          }
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      }
    };

    fetchQuestion();
  }, [questionId, qid]);

  const handleChoicesChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChoices = [...choices];
    newChoices[index] = { ...newChoices[index], text: event.target.value };
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index: number) => {
    // Reset all choices to false first
    const newChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));

    setChoices(newChoices);

    // Update the current question's correct answer
    setCurrQuestion({
      ...currQuestion,
      correctAnswer: newChoices[index].text,
    });
  };

  const handleAddChoice = () => {
    setChoices([...choices, { text: "", isCorrect: false }]);
  };

  const handleDeleteChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      if (!currQuestion.title || !currQuestion.question) {
        alert("Please fill in all required fields");
        return;
      }

      let questionData: {
        quiz: string | undefined;
        title: string;
        type: string;
        points: number;
        description: string;
        options?: Array<{ text: string; isCorrect: boolean }>;
        answers?: { [key: string]: string };
        correctAnswers?: string[];
        correctAnswer?: boolean;
      } = {
        quiz: qid,
        title: currQuestion.title,
        type: currQuestion.type,
        points: currQuestion.points,
        description: currQuestion.question,
      };

      if (currQuestion.type === "Multiple Choice") {
        const validChoices = choices.filter(
          (choice) => choice.text.trim() !== ""
        );
        const hasCorrectAnswer = validChoices.some(
          (choice) => choice.isCorrect
        );
        if (!hasCorrectAnswer) {
          alert("Please select a correct answer");
          return;
        }
        questionData.options = validChoices;
      } else if (currQuestion.type === "True/False") {
        questionData.correctAnswer = currQuestion.answers["1"] === "True";
      } else if (currQuestion.type === "Fill in the Blank") {
        questionData.correctAnswers = currQuestion.correctAnswers;
      }

      if (questionId) {
        await client.updateQuizQuestion(questionId, questionData);
        dispatch(editQuestion({ ...questionData, _id: questionId }));
      } else {
        const response = await client.addNeWQuizQuestion(qid, questionData);
        dispatch(addQuestion(response));
      }

      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`);
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{questionId ? "Edit Question" : "New Question"}</h2>

      <div className="d-flex align-items-center mb-3">
        <div className="flex-grow-1 me-3">
          <input
            type="text"
            className="form-control"
            value={currQuestion.title}
            onChange={(e) =>
              setCurrQuestion({ ...currQuestion, title: e.target.value })
            }
            placeholder="Question Title"
          />
        </div>

        <div className="me-3 position-relative" style={{ width: "200px" }}>
          <select
            className="form-control"
            value={currQuestion.type}
            onChange={(e) =>
              setCurrQuestion({ ...currQuestion, type: e.target.value })
            }
          >
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True/False">True/False</option>
            <option value="Fill in the Blank">Fill in the Blank</option>
          </select>
          <IoIosArrowDown
            className="position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
          />
        </div>

        <div className="d-flex align-items-center">
          <label className="me-2">Points:</label>
          <input
            type="number"
            className="form-control"
            style={{ width: "80px" }}
            value={currQuestion.points}
            onChange={(e) =>
              setCurrQuestion({
                ...currQuestion,
                points: parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>

      {currQuestion.type === "Multiple Choice" && (
        <MultipleChoiceEditor
          currQuestion={currQuestion}
          setCurrQuestion={setCurrQuestion}
          choices={choices}
          setChoices={setChoices}
          handleChoicesChange={handleChoicesChange}
          handleCorrectAnswerChange={handleCorrectAnswerChange}
          handleAddChoice={handleAddChoice}
          handleDeleteChoice={handleDeleteChoice}
          selectedChoiceIndex={selectedChoiceIndex}
          setSelectedChoiceIndex={setSelectedChoiceIndex}
        />
      )}

      {currQuestion.type === "True/False" && (
        <TrueFalseEditor
          currQuestion={currQuestion}
          setCurrQuestion={setCurrQuestion}
        />
      )}

      {currQuestion.type === "Fill in the Blank" && (
        <FillInBlanksEditor
          currQuestion={currQuestion}
          setCurrQuestion={setCurrQuestion}
        />
      )}

      <div className="mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`)
          }
        >
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSave}>
          {questionId ? "Update Question" : "Save Question"}
        </button>
      </div>
    </div>
  );
};

export default QuestionEditor;
