import { GlobalState } from "../redux_store";

export const getSuccessfullResetMsg = (state: GlobalState) => state.authReducer.successfullResetMsg