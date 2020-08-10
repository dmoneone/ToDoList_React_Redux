import { GlobalState } from "../redux_store";

export const getAuthStatus = (state: GlobalState) => state.authReducer.isAuth