export interface ISettingsState {
  data: {
    language: string;
  };
}

export interface IChangeLanguageAction {
  payload: string;
  type: string;
}
