import { createStore } from "redux";
import { reducer } from "./reducer";

// const persistConfig = {
//   key: "realtimePatientPortal",
//   storage: AsyncStorage,
//   stateReconciler: hardSet,
//   version: 6, // Add a version which will correspond to the number declared in your migrate
//   migrate: createMigrate(migrations, { debug: false }),
//   blacklist: ["videoCall"], // will not be persisted
// };

export const store = createStore(reducer);
