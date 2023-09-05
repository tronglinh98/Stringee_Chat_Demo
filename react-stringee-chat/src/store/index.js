import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat';

export default configureStore({
    reducer: {
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['your/action/type'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload'],
                // Ignore these paths in the state
                ignoredPaths: ['chat'],
            },
        }),
});