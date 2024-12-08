import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Editor from "react-simple-wysiwyg";
import { GrEdit } from "react-icons/gr";

interface MultipleChoiceEditorProps {
  currQuestion: any;
  setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
  choices: string[];
  setChoices: React.Dispatch<React.SetStateAction<string[]>>;
  handleChoicesChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleCorrectAnswerChange: (choice: string, isCorrect: boolean) => void;
  handleAddChoice: () => void;
  handleDeleteChoice: (index: number) => void;
  selectedChoiceIndex: number | null;
  setSelectedChoiceIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
  currQuestion,
  setCurrQuestion,
  choices,
  setChoices,
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
      Enter your question and multiple answers, then select the correct answers.
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
        <input
          type="checkbox"
          checked={currQuestion.options?.some(
            (opt: any) => opt.text === choice && opt.isCorrect
          )}
          onChange={(e) => handleCorrectAnswerChange(choice, e.target.checked)}
          className="me-2"
        />
        <input
          type="text"
          id={`option${index + 1}`}
          value={choice}
          className="form-control flex-fill"
          onChange={(e) => handleChoicesChange(index, e)}
          placeholder={`Option ${index + 1}`}
        />
        {selectedChoiceIndex === index && (
          <div className="d-flex ms-2">
            <button className="btn p-0">
              <GrEdit />
            </button>
            <button
              className="btn p-0 ms-2"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteChoice(index);
              }}
            >
              <RiDeleteBin6Line />
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
