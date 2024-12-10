import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id != quizId);
    },

    createQuiz: (state, action) => {
      // Adds a new quiz to the quizzes array
      state.quizzes.push(action.payload);
    },

    updateQuiz: (state, action) => {
      const { _id, ...updatedData } = action.payload;
      const quizIndex = state.quizzes.findIndex((q: any) => q._id === _id);
      if (quizIndex !== -1) {
        // Update the quiz details
        state.quizzes[quizIndex] = {
          ...state.quizzes[quizIndex],
          ...updatedData,
        };
      }
    },
  },
});

export const { setQuizzes, deleteQuiz, createQuiz, updateQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
