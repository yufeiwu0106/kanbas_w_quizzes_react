import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const findEnrollmentsInCourse = async (courseId: string) => {
    const response = await axios.get(`${ENROLLMENTS_API}/course/${courseId}`);
    return response.data;
}; 