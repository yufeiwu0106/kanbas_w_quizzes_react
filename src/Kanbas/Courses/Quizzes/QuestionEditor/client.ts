import axios from "axios";

// Constants
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

// Fetch quiz questions by quiz ID
export const fetchQuizQuestions = async (qid: any) => {
  try {
    const response = await axios.get(
      `${REMOTE_SERVER}/api/quizzes/${qid}/questions`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

// Add a new quiz question
export const addNeWQuizQuestion = async (qid: any, question: any) => {
  try {
    const response = await axios.post(`${REMOTE_SERVER}/api/questions`, {
      ...question,
      quiz: qid,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new quiz question:", error);
    throw error;
  }
};

// Update a quiz question
export const updateQuizQuestion = async (questionId: string, question: any) => {
  try {
    const response = await axios.put(
      `${REMOTE_SERVER}/api/questions/${questionId}`,
      question
    );
    return question; // Note: returning `question` instead of `response.data`
  } catch (error) {
    console.error("Error updating quiz question:", error);
    throw error;
  }
};

// Delete a quiz question by question ID
export const deleteQuizQuestionsByQuestionID = async (questionID: any) => {
  try {
    const response = await axios.delete(
      `${REMOTE_SERVER}/api/questions/${questionID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz question:", error);
    throw error;
  }
};

// Delete a question (redundant but kept as per provided code)
export const deleteQuestion = async (questionId: string) => {
  try {
    const response = await axios.delete(
      `${REMOTE_SERVER}/api/questions/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

export const fetchOneQuestion = async (questionId: any) => {
  try {
    const response = await axios.get(
      `${REMOTE_SERVER}/api/questions/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz question:", error);
    throw error;
  }
};
