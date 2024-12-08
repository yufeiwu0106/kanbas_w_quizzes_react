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
  });

  const [choices, setChoices] = useState<string[]>(["", "", "", ""]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    -1
  );

  useEffect(() => {
    if (questionId) {
      const questionToEdit = questions.find((q: any) => q._id === questionId);
      if (questionToEdit) {
        setCurrQuestion({
          ...questionToEdit,
          title: questionToEdit.title || "",
          type: questionToEdit.type || "Multiple Choice",
          question: questionToEdit.question || "",
          description: questionToEdit.description || "",
          points: questionToEdit.points || 10,
          answers: questionToEdit.answers || {},
          correctAnswer: questionToEdit.correctAnswer || "",
        });

        if (questionToEdit.type === "Multiple Choice") {
          setChoices(questionToEdit.choices || ["", "", "", ""]);
          const correctIndex = questionToEdit.choices?.findIndex(
            (c: string) => c === questionToEdit.correctAnswer
          );
          setSelectedChoiceIndex(correctIndex >= 0 ? correctIndex : null);
        }
      }
    }
  }, [questionId, questions]);

  const handleChoicesChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChoices = [...choices];
    newChoices[index] = event.target.value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (choice: string) => {
    setCurrQuestion({ ...currQuestion, correctAnswer: choice });
  };

  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleDeleteChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      if (!currQuestion.title) {
        alert("Please enter a question title");
        return;
      }

      if (!currQuestion.question) {
        const messages = {
          "Multiple Choice":
            "Please enter the question and at least two choices",
          "True/False": "Please enter the question",
          "Fill in the Blank": "Please enter the question with blank spaces",
        };
        alert(messages[currQuestion.type as keyof typeof messages]);
        return;
      }

      let questionData: any = {
        quiz: qid,
        title: currQuestion.title,
        type: currQuestion.type,
        points: currQuestion.points,
        description: currQuestion.question,
      };

      if (currQuestion.type === "Multiple Choice") {
        const validChoices = choices.filter((choice) => choice.trim() !== "");
        if (validChoices.length < 2) {
          alert("Multiple choice questions must have at least two options");
          return;
        }
        if (
          !currQuestion.correctAnswers ||
          currQuestion.correctAnswers.length === 0
        ) {
          alert("Please select at least one correct answer");
          return;
        }

        questionData.options = validChoices.map((choice) => ({
          text: choice,
          isCorrect: (currQuestion.correctAnswers || []).includes(choice),
        }));
      } else if (currQuestion.type === "True/False") {
        if (!currQuestion.answers["1"]) {
          alert("Please select True or False as the correct answer");
          return;
        }
        questionData.correctAnswer = currQuestion.answers["1"] === "True";
      } else if (currQuestion.type === "Fill in the Blank") {
        if (!currQuestion.correctAnswer) {
          alert("Please provide the correct answer");
          return;
        }
        questionData.correctAnswers = [currQuestion.correctAnswer];
      }

      let savedQuestion;
      if (questionId) {
        savedQuestion = await client.updateQuizQuestion(
          questionId,
          questionData
        );
        if (savedQuestion) {
          dispatch(editQuestion(savedQuestion));
          alert("Question updated successfully!");
        }
      } else {
        savedQuestion = await client.addNeWQuizQuestion(qid, questionData);
        if (savedQuestion) {
          dispatch(addQuestion(savedQuestion));
          alert("New question created successfully!");
        }
      }

      if (savedQuestion) {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`);
      } else {
        throw new Error("Failed to save question");
      }
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Error saving question. Please try again.");
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
