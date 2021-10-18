import create from "zustand";

const useStore = create((set) => ({
  itemExist: {},
  continentFilter: [],
  settingFilter: [],
  updateSettingFilter: (value) => {
    set((state) => {
      if (state.settingFilter.includes(value)) {
        return {
          settingFilter: state.settingFilter.filter((f) => f !== value),
        };
      } else {
        return { settingFilter: [...state.settingFilter, value] };
      }
    });
  },
  updateContinentFilter: (value) => {
    set((state) => {
      if (state.continentFilter.includes(value)) {
        return {
          continentFilter: state.continentFilter.filter((f) => f !== value),
        };
      } else {
        return { continentFilter: [...state.continentFilter, value] };
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
