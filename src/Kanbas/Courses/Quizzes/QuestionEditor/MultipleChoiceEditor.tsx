import React from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import Editor from "react-simple-wysiwyg";

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface MultipleChoiceEditorProps {
  currQuestion: any;
  setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
  choices: Choice[];
  setChoices: React.Dispatch<React.SetStateAction<Choice[]>>;
  handleChoicesChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleCorrectAnswerChange: (index: number) => void;
  handleAddChoice: () => void;
  handleDeleteChoice: (index: number) => void;
  selectedChoiceIndex: number | null;
  setSelectedChoiceIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
  currQuestion,
  setCurrQuestion,
  choices,
  handleChoicesChange,
  handleCorrectAnswerChange,
  handleAddChoice,
  handleDeleteChoice,
  selectedChoiceIndex,
  setSelectedChoiceIndex,
}) => (
  <>
    <hr />
    <p style={{ fontSize: "0.9rem" }}>
      Enter your question and multiple answers, then select the one correct
      answer.
    </p>
    <label htmlFor="questionDesc">
      <b>Question:</b>
    </label>
    <Editor
      id="questionDesc"
      value={currQuestion.question}
      onChange={(e) =>
        setCurrQuestion({ ...currQuestion, question: e.target.value })
      }
      aria-required="true"
    />
    <br />
    <b>Answers:</b>
    <br />
    {choices.map((choice, index) => (
      <div
        className={`choice d-flex align-items-center mb-2 p-2 rounded ${
          choice.isCorrect ? "bg-light" : ""
        }`}
        key={index}
        onClick={() => setSelectedChoiceIndex(index)}
        style={{ cursor: "pointer", transition: "all 0.2s ease" }}
      >
        <div
          className="me-2 d-flex align-items-center"
          onClick={(e) => {
            e.stopPropagation();
            handleCorrectAnswerChange(index);
          }}
          style={{
            cursor: "pointer",
            opacity: choice.text.trim() !== "" ? 1 : 0.5,
          }}
        >
          <div
            className={`choice-radio ${choice.isCorrect ? "selected" : ""}`}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: choice.isCorrect ? "none" : "2px solid #dee2e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            {choice.isCorrect && (
              <BsCheckCircleFill
                style={{
                  color: "#198754",
                  fontSize: "20px",
                }}
              />
            )}
          </div>
        </div>
        <div className="flex-grow-1 d-flex align-items-center">
          <input
            type="text"
            id={`option${index + 1}`}
            value={choice.text}
            className="form-control"
            onChange={(e) => handleChoicesChange(index, e)}
            placeholder={`Option ${index + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          {selectedChoiceIndex === index && (
            <div className="d-flex ms-2">
              <button
                className="btn btn-light btn-sm me-1"
                style={{ padding: "4px 8px" }}
              >
                <GrEdit size={14} />
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChoice(index);
                }}
                style={{ padding: "4px 8px" }}
              >
                <RiDeleteBin6Line size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
    <button
      className="btn btn-outline-danger btn-sm mt-2 float-end"
      onClick={handleAddChoice}
    >
      + Add Another Answer
    </button>
  </>
);

export default MultipleChoiceEditor;
