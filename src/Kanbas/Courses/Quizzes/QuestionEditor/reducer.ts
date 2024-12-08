import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [] as any[],
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      state.questions = [...state.questions, question];
    },
    deleteQuestion: (state, { payload: qsid }) => {
      state.questions = state.questions.filter((a) => a._id !== qsid);
    },
    editQuestion: (state, { payload: updatedQuestion }) => {
      state.questions = state.questions.map((a) =>
        a._id === updatedQuestion._id ? updatedQuestion : a
      );
    },
  },
});

export const { setQuestion, addQuestion, deleteQuestion, editQuestion } =
  questionSlice.actions;
export default questionSlice.reducer;
