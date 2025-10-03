import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookmarks: [],
    loading: false,
    error: null
};

const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addBookmark: (state, action) => {
            const { documentId, page, title, timestamp } = action.payload;
            const bookmarkId = `${documentId}-${page}`;

            // Kiểm tra xem bookmark đã tồn tại chưa
            const existingBookmark = state.bookmarks.find(
                bookmark => bookmark.id === bookmarkId
            );

            if (!existingBookmark) {
                state.bookmarks.push({
                    id: bookmarkId,
                    documentId,
                    page,
                    title,
                    timestamp
                });
            }
        },

        removeBookmark: (state, action) => {
            const bookmarkId = action.payload;
            state.bookmarks = state.bookmarks.filter(
                bookmark => bookmark.id !== bookmarkId
            );
        },

        removeBookmarkByPage: (state, action) => {
            const { documentId, page } = action.payload;
            const bookmarkId = `${documentId}-${page}`;
            state.bookmarks = state.bookmarks.filter(
                bookmark => bookmark.id !== bookmarkId
            );
        },

        clearAllBookmarks: (state) => {
            state.bookmarks = [];
        },

        loadBookmarksFromStorage: (state, action) => {
            state.bookmarks = action.payload || [];
        }
    }
});

export const {
    addBookmark,
    removeBookmark,
    removeBookmarkByPage,
    clearAllBookmarks,
    loadBookmarksFromStorage
} = bookmarkSlice.actions;

// Selectors
export const selectAllBookmarks = (state) => state.bookmarks.bookmarks;
export const selectBookmarksByDocument = (documentId) => (state) =>
    state.bookmarks.bookmarks.filter(bookmark => bookmark.documentId === documentId);
export const selectBookmarkByPage = (documentId, page) => (state) =>
    state.bookmarks.bookmarks.find(
        bookmark => bookmark.documentId === documentId && bookmark.page === page
    );

export default bookmarkSlice.reducer;
