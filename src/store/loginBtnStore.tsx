import { create } from "zustand";

const loginBtnStore = (set: any) => ({
  loginBtn: {
    text: "Login",
    link: "/login",
  },
  setToLogin: () =>
    set({
      loginBtn: {
        text: "Login",
        link: "/login",
      },
    }),
  setToAccount: () =>
    set({
      loginBtn: {
        text: "Account",
        link: "/account",
      },
    }),
});

export const useLoginBtnStore = create(loginBtnStore);
