import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // enrollments: enrollments,
    enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },

        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: enrollment._id,
                user: enrollment.user,
                course: enrollment.course
            }

            console.log("newEnrollment: ", newEnrollment);

            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },

        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter(
                (e: any) => e._id != enrollmentId
            )

            console.log("enrollments: ", state.enrollments)
        },
    }
});

export const { setEnrollments, addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;