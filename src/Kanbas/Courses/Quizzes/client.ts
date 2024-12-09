import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const RECORDS_API = `${REMOTE_SERVER}/api/records`;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  console.log("Fetching questions for quizId:", quizId);
  console.log("Fetching from URL:", `${QUIZZES_API}/${quizId}/questions`);
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, newQuiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    newQuiz
  );
  return response.data;
};

export const updateQuiz = async (quizId: string, updatedQuiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}`,
    updatedQuiz
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const findRecordsForQuizAndUser = async (
  quizId: string,
  userId: string
) => {
  try {
    // Construct the API endpoint URL with quizId and userId
    const response = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/records/quiz/${quizId}/user/${userId}`
    );
    return response.data; // Return the records data from the backend
  } catch (error) {
    console.error("Error fetching records for quiz and user:", error);
  }
};

// Function to fetch the last record for a specific quiz and user
export const findLastRecordForQuizAndUser = async (
  quizId: string,
  userId: string
) => {
  try {
    // Send a GET request to the backend API to fetch the last record
    const response = await axios.get(
      `${RECORDS_API}/quiz/${quizId}/user/${userId}/last`
    );

    // Return the data (most recent record)
    return response.data;
  } catch (error) {
    console.error("Error fetching the last record for quiz and user:", error);
    // Optionally handle errors like showing a message to the user
    throw new Error("Failed to fetch the last record.");
  }
};

// Function to submit a quiz
export const submitQuiz = async (quizId: string, userId: string, record: any) => {
  console.log("API URL:", `${RECORDS_API}`);
  console.log("Submitting quiz with record:", record);
  const response = await axiosWithCredentials.post(
    `${RECORDS_API}`,
    record
  );
  return response.data;
};

