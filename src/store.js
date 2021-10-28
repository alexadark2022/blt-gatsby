import create from "zustand";

const useStore = create((set) => ({
  itemExist: {},
  allFilters: {},
  updateAllFilter: (name, value) => {
    set((state) => {
      if (state.allFilters[name]?.includes(value)) {
        let some = state.allFilters[name].filter((f) => f !== value);
        let newF = {
          ...state.allFilters,
          [name]: some,
        };
        return {
          allFilters: newF,
        };
      } else {
        const p = state.allFilters[name] ?? [];
        let newF = {
          ...state.allFilters,
          [name]: [...p, value],
        };
        return {
          allFilters: newF,
        };
      }
    });
  },
  updateItemExist: (value) => {
    set((state) => {
      return { itemExist: { ...state.itemExist, ...value } };
    });
  },
}));

export default useStore;
