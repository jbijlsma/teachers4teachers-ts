import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const users = [
  {
    email: "ywidjaja@mis-munich.de",
    password: "password",
    fullName: "Yenni Widjaja",
    title: "Math teacher",
    photo: "assets/demo/images/avatar/ionibowcher.png",
  },
  {
    email: "pgray@mis-munich.de",
    password: "password",
    fullName: "Mr. Gray",
    title: "Math teacher",
    photo: "assets/demo/images/avatar/ivanmagalhaes.png",
  },
];

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    id: new Date().toISOString(),
    email: "",
    fullName: "",
    title: "",
    photo: "",
    isLoggedIn: false,
    loginError: "",
    grade: "",
  },
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.email = user.email;
        state.fullName = user.fullName;
        state.photo = user.photo;
        state.title = user.title;
        state.isLoggedIn = true;
      } else {
        state.id = new Date().toISOString();
        state.loginError = "Invalid email and / or password";
        state.isLoggedIn = false;
      }
    },
    logout(state) {
      state.loginError = "";
      state.isLoggedIn = false;
      state.email = "";
      state.title = "";
    },
  },
});

export const { login, logout } = sessionSlice.actions;

const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    lessons: [
      {
        id: 1,
        title: "Population Modelling",
        shortDescription:
          "One complete online project-based task (Population Modelling) is created with “Nearpod” by Yenni Widjaja. The package was tried with Grade 10 Maths students in November (3 teachers trialed the online package)",
        teacherInfo: "",
        image: "T1 Population Modelling.png",
        subject: "Math",
        grade: "10",
        mypLevel: "Standard",
        link: "https://app.nearpod.com/presentation?pin=72DQ8",
        authorEmail: "yenni@mis.de",
        rating: 4,
        isFeatured: true,
      },
      {
        id: 2,
        title: "3D Printed Housing",
        shortDescription:
          "Another project was done by Yenni Widjaja in Grade 9 Maths Standard (3D Printed House). An online version of it is currently being made using a different authoring tool called 'isEazy'",
        teacherInfo: "",
        image: "T1 3D Printed House Project.png",
        subject: "Math",
        grade: "9",
        mypLevel: "Standard",
        link: "https://iseazy.com/dl/3d1d52c4a08b4424b0e2f0e0539c80e1#/cover",
        authorEmail: "yenni@mis.de",
        rating: 3,
        isFeatured: false,
      },
      {
        id: 3,
        title: "Tides Modelling",
        shortDescription:
          "Peter Gray and Carole Senior have made a package with Nearpod and this project will be tried later in January 2022 with Grade 10 Maths Extended students",
        teacherInfo: "",
        image: "T2 Tides Modelling.png",
        subject: "Math",
        grade: "10",
        mypLevel: "Extended",
        link: "https://app.nearpod.com/presentation?pin=7AP6Z",
        authorEmail: "peter@mis.de",
        rating: 4,
        isFeatured: false,
      },
      {
        id: 4,
        title: "Hypothesis Testing",
        shortDescription:
          "Peter Gray is currently working on a Statistics package",
        teacherInfo: "",
        image: "T2 Hypothesis Testing.png",
        subject: "Math",
        grade: "10",
        mypLevel: "Extended",
        link: "https://app.nearpod.com/presentation?pin=51590AE07C11A1FF0A8C6D5FF937C25A-1",
        authorEmail: "peter@mis.de",
        rating: 5,
        isFeatured: true,
      },
    ],
  },
  reducers: {
    uploadLesson(state, action: PayloadAction<{ title: string }>) {},
  },
});

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    lessons: lessonsSlice.reducer,
  },
});

export default store;
