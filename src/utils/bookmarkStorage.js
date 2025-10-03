const BOOKMARK_STORAGE_KEY = 'talkademy_bookmarks';

export const saveBookmarksToStorage = (bookmarks) => {
    try {
        localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Lỗi khi lưu bookmarks:', error);
    }
};

export const loadBookmarksFromStorage = () => {
    try {
        const bookmarks = localStorage.getItem(BOOKMARK_STORAGE_KEY);
        return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
        console.error('Lỗi khi tải bookmarks:', error);
        return [];
    }
};

export const clearBookmarksFromStorage = () => {
    try {
        localStorage.removeItem(BOOKMARK_STORAGE_KEY);
    } catch (error) {
        console.error('Lỗi khi xóa bookmarks:', error);
    }
};
