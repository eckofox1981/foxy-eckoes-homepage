import { create } from "zustand";

const toastStore = (set: any) => ({
  toast: {
    title: "",
    text: "",
    color: "var(--background-primary)",
    display: "hidden",
  },
  showToast: (title: string, text: string, color: string) =>
    set({
      toast: {
        title: title,
        text: text,
        color: color,
        display: "",
      },
    }),
  hideToast: () =>
    set({
      toast: {
        title: "",
        text: "",
        color: "",
        display: "hidden",
      },
    }),
});

export const useToastStore = create(toastStore);
