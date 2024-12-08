import React from "react";
import Editor from "react-simple-wysiwyg";
import { TbArrowBigRight } from "react-icons/tb";

interface TrueFalseEditorProps {
  currQuestion: any;
  setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
}

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({
  currQuestion,
  setCurrQuestion,
}) => (
  <>
    <hr />
    <p style={{ fontSize: "0.9rem" }}>
      Enter your question text, then select if True or False is the correct
      answer.
    </p>
    <b>Question:</b>
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
    <div
      className={`form-check ${
        currQuestion.answers["1"] === "True"
          ? "text-success font-weight-bold"
          : ""
      }`}
    >
      <input
        type="radio"
        id="TF1"
        name="TF"
        className="form-check-input"
        checked={currQuestion.answers["1"] === "True"}
        onChange={() =>
          setCurrQuestion({ ...currQuestion, answers: { "1": "True" } })
        }
        style={{ display: "none" }}
      />
      <label
        className="form-check-label d-flex align-items-center"
        htmlFor="TF1"
      >
        {currQuestion.answers["1"] === "True" && (
          <TbArrowBigRight
            className="text-success me-2"
            style={{ fontSize: "28px" }}
          />
        )}
        True
      </label>
    </div>
    <div
      className={`form-check ${
        currQuestion.answers["1"] === "False"
          ? "text-success font-weight-bold"
          : ""
      }`}
    >
      <input
        type="radio"
        id="TF2"
        name="TF"
        className="form-check-input"
        checked={currQuestion.answers["1"] === "False"}
        onChange={() =>
          setCurrQuestion({ ...currQuestion, answers: { "1": "False" } })
        }
        style={{ display: "none" }}
      />
      <label
        className="form-check-label d-flex align-items-center"
        htmlFor="TF2"
      >
        {currQuestion.answers["1"] === "False" && (
          <TbArrowBigRight
            className="text-success me-2"
            style={{ fontSize: "28px" }}
          />
        )}
        False
      </label>
    </div>
  </>
);

export default TrueFalseEditor;
