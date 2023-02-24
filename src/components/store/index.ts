import { create } from "zustand";

type Position = { x: number; y: number; z: number };

interface StoreType {
  targets: { [key: string]: { position: Position } };
  updateTarget: (id: string, position: Position) => void;
  removeTarget: (id: string) => void;
}

export const useStore = create<StoreType>((set) => ({
  targets: {},
  updateTarget: (id, position) => {
    set((state) => ({
      targets: { ...state.targets, [id]: { position } },
    }));
  },
  removeTarget: (id) => {
    set((state) => {
      const { [id]: _, ...targets } = state.targets;
      return { targets };
    });
  },
}));
