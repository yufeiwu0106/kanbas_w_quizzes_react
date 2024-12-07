import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;


export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials
      .get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
  };
  