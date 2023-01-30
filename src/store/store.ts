import {configureStore, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import questionsSlice from "./features/questionsSlice";
import authSlice from "./features/authSlice";
import supplierSlice from "./features/supplierSlice";
import complitedSlice from "./features/complitedSlice";
import newSupplierSlice from "./features/newSupplierSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        questions: questionsSlice,
        supplier: supplierSlice,
        complited: complitedSlice,
        newSupplier: newSupplierSlice,
    },
});

//type StoreType = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()