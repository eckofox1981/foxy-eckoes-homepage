import { create, type StateCreator } from "zustand";
import type { Event } from "../models/Event";

interface EventUpdateStore {
  eventUpdate: Event | null;
  setEventUpdate: (event: Event | null) => void;
  removeEventUpdate: () => void;
}

const eventUpdateStore: StateCreator<EventUpdateStore> = (set) => ({
  eventUpdate: null,
  setEventUpdate: (event: Event | null) => set({ eventUpdate: event }),
  removeEventUpdate: () => set({ eventUpdate: null }),
});

export const useEventUpdateStore = create(eventUpdateStore);
