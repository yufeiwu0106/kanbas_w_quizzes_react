import { createSlice } from "@reduxjs/toolkit";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";

const initialState = {
    assignments: [] as any[],
};


const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        // addOrUpdateAssignment: (state, { payload: assignment }) => {
        //     const existingAssignmentIndex = state.assignments.findIndex(
        //         (a: any) => a._id === assignment._id
        //     );

        //     if (existingAssignmentIndex !== -1) {
        //         state.assignments[existingAssignmentIndex] = {
        //             ...state.assignments[existingAssignmentIndex],
        //             ...assignment,
        //         };

        //         assignmentsClient.updateAssignment(assignment._id, assignment);
        //     } else {
        //         // add a new assignment if no existing assignement is found
        //         const { _id, ...newAssignment } = assignment

        //         // const newAssignmentWithID = coursesClient.createAssignmentForCourse(
        //         //     assignment.course, newAssignment
        //         // );

        //         state.assignments = [...state.assignments, newAssignmentWithID] as any;
        //     }
        // },

        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id != assignmentId
            )
        },


    }
});

export const { setAssignments, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;