import React from "react";
import Editor from "react-simple-wysiwyg";
import { RiDeleteBin6Line } from "react-icons/ri";

interface FillInBlanksEditorProps {
  currQuestion: any;
  setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
}

const FillInBlanksEditor: React.FC<FillInBlanksEditorProps> = ({
  currQuestion,
  setCurrQuestion,
}) => {
  // Add a new blank answer to the list
  const handleAddAnswer = () => {
    const currentAnswers = currQuestion.correctAnswers || [
      currQuestion.correctAnswer || "",
    ];
    setCurrQuestion({
      ...currQuestion,
      correctAnswers: [...currentAnswers, ""],
    });
  };

  // Handle answer input changes
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [
      ...(currQuestion.correctAnswers || [currQuestion.correctAnswer || ""]),
    ];
    newAnswers[index] = value;
    setCurrQuestion({
      ...currQuestion,
      correctAnswers: newAnswers,
      correctAnswer: newAnswers[0], // Ensure backward compatibility
    });
  };

  // Delete a specific answer from the list
  const handleDeleteAnswer = (index: number) => {
    const newAnswers = [...(currQuestion.correctAnswers || [])];
    newAnswers.splice(index, 1);
    setCurrQuestion({
      ...currQuestion,
      correctAnswers: newAnswers,
      correctAnswer: newAnswers[0], // Update primary answer
    });
  };

  return (
    <>
      <hr />
      <p style={{ fontSize: "0.9rem" }}>
        Enter your question text, then provide the correct answers that should
        fill in the blank. Add multiple answers if needed.
      </p>

      {/* Question Editor */}
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

      {/* Correct Answers Input */}
      <div className="mb-3">
        <b>Correct Answers:</b>
        {(
          currQuestion.correctAnswers || [currQuestion.correctAnswer || ""]
        ).map((answer: string, index: number) => (
          <div key={index} className="d-flex align-items-center mt-2">
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Enter correct answer ${index + 1}`}
            />
            {index > 0 && (
              <button
                className="btn btn-link text-danger ms-2"
                onClick={() => handleDeleteAnswer(index)}
              >
                <RiDeleteBin6Line />
              </button>
            )}
          </div>
        ))}
        <button
          className="btn btn-link p-0 float-end text-danger mt-2"
          onClick={handleAddAnswer}
        >
          + Add Another Answer
        </button>
      </div>
    </>
  );
};

export default FillInBlanksEditor;
