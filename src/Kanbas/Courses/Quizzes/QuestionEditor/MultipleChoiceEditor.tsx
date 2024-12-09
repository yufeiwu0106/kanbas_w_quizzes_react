import React from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
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
  handleCorrectAnswerChange: (choice: string) => void;
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
        className="choice d-flex align-items-center mb-2"
        key={index}
        onClick={() => setSelectedChoiceIndex(index)}
        style={{ cursor: "pointer" }}
      >
        <div className="me-2">
          <input
            type="radio"
            id={`MC${index + 1}`}
            name="correctAnswer"
            checked={choice.isCorrect}
            onChange={() => handleCorrectAnswerChange(choice.text)}
            className="form-check-input"
          />
        </div>
        <input
          type="text"
          id={`option${index + 1}`}
          value={choice.text}
          className="form-control flex-fill"
          onChange={(e) => handleChoicesChange(index, e)}
          placeholder={`Option ${index + 1}`}
        />
        {selectedChoiceIndex === index && (
          <div className="d-flex ms-2">
            <button className="btn p-0">
              <GrEdit style={{ marginLeft: "4px" }} />
            </button>
            <button
              className="btn p-0 ms-2"
              onClick={() => handleDeleteChoice(index)}
            >
              <RiDeleteBin6Line style={{ marginLeft: "-4px" }} />
            </button>
          </div>
        )}
      </div>
    ))}
    <button
      className="btn btn-link p-0 float-end text-danger"
      onClick={handleAddChoice}
    >
      + Add Another Answer
    </button>
  </>
);

export default MultipleChoiceEditor;
