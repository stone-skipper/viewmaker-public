import create from "zustand";

export const usePhotoStore = create((set) => ({
  bears: 0,
  photoHistory: [],
  currentPhoto: 0,
  addPhoto: (add) =>
    set((state) => ({ photoHistory: [...state.photoHistory, add] })),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));
