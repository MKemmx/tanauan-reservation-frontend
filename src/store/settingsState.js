import create from "zustand";
import { devtools } from "zustand/middleware";

const settingsStore = (set, get) => ({
  openSideNav: true,
  openMenu: false,
  toggleSideNav: () => {
    const defaultState = get();
    set({
      openSideNav: defaultState.openSideNav ? false : true,
    });
  },
  toggleMenu: () => {
    const defaultState = get();
    set({
      ...defaultState,
      openMenu: defaultState.openMenu ? false : true,
    });
  },
});

const useSettingsState = create(
  devtools(settingsStore, {
    name: "settingsState",
  })
);

export default useSettingsState;
