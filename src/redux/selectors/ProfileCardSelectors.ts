import { GlobalState } from "../redux_store";

export const getProfile = (state: GlobalState) => state.profileReducer.user