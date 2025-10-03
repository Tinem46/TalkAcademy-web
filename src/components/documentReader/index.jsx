import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Input, Slider, Tooltip, Progress, Drawer, message } from 'antd';
import {
    LeftOutlined,
    RightOutlined,
    SearchOutlined,
    BookOutlined,
    SettingOutlined,
    StarOutlined,
    StarFilled,
    FullscreenOutlined,
    DownloadOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    addBookmark,
    removeBookmarkByPage,
    selectBookmarksByDocument,
    selectBookmarkByPage,
    loadBookmarksFromStorage
} from '../../redux/slices/bookmarkSlice';
import { saveBookmarksToStorage } from '../../utils/bookmarkStorage';
import './index.scss';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const DocumentReader = ({ document, onClose }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [fontSize, setFontSize] = useState(16);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    // Redux selectors
    const bookmarks = useSelector(selectBookmarksByDocument(document.id));
    const currentBookmark = useSelector(selectBookmarkByPage(document.id, currentPage));

    // Load bookmarks from localStorage on component mount
    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem('talkademy_bookmarks') || '[]');
        dispatch(loadBookmarksFromStorage(savedBookmarks));
    }, [dispatch]);

    const documentDatabase = {
        1: {
            title: "Học tiếng Việt cơ bản",
            author: "Talkademy Team",
            totalPages: 8,
            content: [
                {
                    page: 1,
                    title: "Giới thiệu",
                    text: `Chào mừng bạn đến với Talkademy! Đây là khóa học tiếng Việt cơ bản được thiết kế đặc biệt để giúp bạn tự tin giao tiếp bằng tiếng Việt. Chúng tôi sẽ cùng nhau khám phá những điều thú vị về ngôn ngữ và văn hóa Việt Nam.`
                },
                {
                    page: 2,
                    title: "Bảng chữ cái tiếng Việt",
                    text: `Tiếng Việt có 29 chữ cái: A, Ă, Â, B, C, D, Đ, E, Ê, G, H, I, K, L, M, N, O, Ô, Ơ, P, Q, R, S, T, U, Ư, V, X, Y. Mỗi chữ cái đều có cách phát âm riêng và quan trọng trong việc hình thành từ vựng.`
                },
                {
                    page: 3,
                    title: "Thanh điệu",
                    text: `Tiếng Việt có 6 thanh điệu: ngang, huyền, hỏi, ngã, sắc, nặng. Thanh điệu là yếu tố quan trọng nhất trong tiếng Việt, quyết định ý nghĩa của từ. Ví dụ: "ma" (ma quỷ), "má" (mẹ), "mà" (nhưng), "mả" (mồ mả), "mã" (mã số), "mạ" (cây mạ).`
                },
                {
                    page: 4,
                    title: "Từ vựng cơ bản",
                    text: `Hãy bắt đầu với những từ vựng cơ bản nhất: Xin chào (Hello), Cảm ơn (Thank you), Xin lỗi (Sorry), Tạm biệt (Goodbye), Tôi (I), Bạn (You), Tên (Name), Tuổi (Age), Quốc tịch (Nationality).`
                },
                {
                    page: 5,
                    title: "Ngữ pháp cơ bản",
                    text: `Cấu trúc câu tiếng Việt: Chủ ngữ + Động từ + Tân ngữ. Ví dụ: "Tôi học tiếng Việt" (I study Vietnamese). Tiếng Việt không có thì động từ phức tạp như tiếng Anh, thay vào đó sử dụng các từ chỉ thời gian.`
                },
                {
                    page: 6,
                    title: "Phát âm",
                    text: `Phát âm tiếng Việt cần chú ý đến thanh điệu và âm tiết. Mỗi âm tiết được phát âm rõ ràng và có thanh điệu riêng. Luyện tập phát âm thường xuyên sẽ giúp bạn nói tiếng Việt tự nhiên hơn.`
                },
                {
                    page: 7,
                    title: "Giao tiếp hàng ngày",
                    text: `Những câu giao tiếp cơ bản: "Bạn có khỏe không?" (How are you?), "Tôi khỏe, cảm ơn bạn" (I'm fine, thank you), "Bạn tên gì?" (What's your name?), "Tôi tên là..." (My name is...).`
                },
                {
                    page: 8,
                    title: "Kết luận",
                    text: `Chúc mừng bạn đã hoàn thành bài học đầu tiên! Hãy tiếp tục luyện tập và khám phá thêm nhiều bài học thú vị khác trên Talkademy. Nhớ rằng, học ngôn ngữ cần sự kiên trì và luyện tập thường xuyên.`
                }
            ]
        },
        2: {
            title: "Ngữ pháp tiếng Việt nâng cao",
            author: "Talkademy Team",
            totalPages: 10,
            content: [
                {
                    page: 1,
                    title: "Giới thiệu",
                    text: `Khóa học này sẽ giúp bạn nắm vững các quy tắc ngữ pháp tiếng Việt từ cơ bản đến nâng cao. Chúng ta sẽ học về cấu trúc câu, từ loại, và cách sử dụng chúng trong giao tiếp thực tế.`
                },
                {
                    page: 2,
                    title: "Danh từ",
                    text: `Danh từ trong tiếng Việt có thể đứng độc lập hoặc kết hợp với các từ khác. Danh từ có thể chỉ người, vật, sự việc, khái niệm. Ví dụ: nhà (house), người (person), tình yêu (love), hạnh phúc (happiness).`
                },
                {
                    page: 3,
                    title: "Động từ",
                    text: `Động từ diễn tả hành động, trạng thái. Tiếng Việt có động từ đơn và động từ ghép. Ví dụ: đi (go), đến (come), học (study), làm việc (work), yêu thương (love).`
                },
                {
                    page: 4,
                    title: "Tính từ",
                    text: `Tính từ mô tả đặc điểm, tính chất của danh từ. Ví dụ: đẹp (beautiful), xấu (ugly), to (big), nhỏ (small), nhanh (fast), chậm (slow). Tính từ có thể đứng trước hoặc sau danh từ.`
                },
                {
                    page: 5,
                    title: "Đại từ",
                    text: `Đại từ thay thế cho danh từ để tránh lặp lại. Bao gồm: đại từ nhân xưng (tôi, bạn, anh ấy), đại từ chỉ định (này, đó, kia), đại từ nghi vấn (ai, gì, đâu).`
                },
                {
                    page: 6,
                    title: "Giới từ",
                    text: `Giới từ chỉ mối quan hệ giữa các từ trong câu. Ví dụ: ở (at), trong (in), trên (on), dưới (under), với (with), cho (for), về (about).`
                },
                {
                    page: 7,
                    title: "Liên từ",
                    text: `Liên từ nối các từ, cụm từ, câu với nhau. Ví dụ: và (and), hoặc (or), nhưng (but), vì (because), nếu (if), khi (when).`
                },
                {
                    page: 8,
                    title: "Trạng từ",
                    text: `Trạng từ bổ nghĩa cho động từ, tính từ, hoặc cả câu. Ví dụ: rất (very), quá (too), luôn (always), thường (often), không (not).`
                },
                {
                    page: 9,
                    title: "Cấu trúc câu phức",
                    text: `Câu phức gồm nhiều mệnh đề được nối với nhau bằng liên từ. Ví dụ: "Tôi học tiếng Việt vì tôi muốn giao tiếp với người Việt Nam" (I study Vietnamese because I want to communicate with Vietnamese people).`
                },
                {
                    page: 10,
                    title: "Kết luận",
                    text: `Ngữ pháp là nền tảng quan trọng để nói tiếng Việt chính xác. Hãy luyện tập thường xuyên và áp dụng vào giao tiếp thực tế để cải thiện kỹ năng của bạn.`
                }
            ]
        },
        3: {
            title: "Văn hóa Việt Nam",
            author: "Talkademy Team",
            totalPages: 8,
            content: [
                {
                    page: 1,
                    title: "Giới thiệu",
                    text: `Việt Nam có nền văn hóa đa dạng và phong phú với lịch sử hàng nghìn năm. Hiểu biết về văn hóa sẽ giúp bạn giao tiếp hiệu quả hơn với người Việt Nam.`
                },
                {
                    page: 2,
                    title: "Lễ hội truyền thống",
                    text: `Tết Nguyên Đán là lễ hội quan trọng nhất trong năm, kéo dài từ 23 tháng Chạp đến mùng 7 tháng Giêng. Các lễ hội khác: Trung Thu, Giỗ Tổ Hùng Vương, Quốc Khánh 2/9.`
                },
                {
                    page: 3,
                    title: "Ẩm thực",
                    text: `Ẩm thực Việt Nam nổi tiếng với phở, bánh mì, chả cá, nem nướng. Mỗi vùng miền có đặc sản riêng: miền Bắc có phở, miền Trung có bún bò Huế, miền Nam có hủ tiếu.`
                },
                {
                    page: 4,
                    title: "Gia đình và xã hội",
                    text: `Gia đình là giá trị cốt lõi trong văn hóa Việt Nam. Người Việt coi trọng lễ nghĩa, hiếu thảo với cha mẹ, tôn trọng người lớn tuổi.`
                },
                {
                    page: 5,
                    title: "Tôn giáo và tín ngưỡng",
                    text: `Việt Nam có nhiều tôn giáo: Phật giáo, Công giáo, Cao Đài, Hòa Hảo. Thờ cúng tổ tiên là tập tục phổ biến trong các gia đình Việt Nam.`
                },
                {
                    page: 6,
                    title: "Nghệ thuật truyền thống",
                    text: `Nghệ thuật Việt Nam bao gồm: ca trù, chèo, tuồng, cải lương, múa rối nước. Các nhạc cụ truyền thống: đàn bầu, đàn tranh, sáo trúc.`
                },
                {
                    page: 7,
                    title: "Kiến trúc",
                    text: `Kiến trúc Việt Nam kết hợp giữa truyền thống và hiện đại. Các công trình nổi tiếng: chùa Một Cột, Văn Miếu, nhà thờ Đức Bà, cầu Long Biên.`
                },
                {
                    page: 8,
                    title: "Kết luận",
                    text: `Văn hóa Việt Nam rất đa dạng và thú vị. Hiểu biết về văn hóa sẽ giúp bạn hòa nhập tốt hơn và giao tiếp hiệu quả với người Việt Nam.`
                }
            ]
        }
    };

    // Get document content by ID
    const documentContent = documentDatabase[document.id] || documentDatabase[1];

    const handleSearch = (value) => {
        if (!value.trim()) {
            setSearchResults([]);
            return;
        }

        const results = [];
        documentContent.content.forEach((page, pageIndex) => {
            const text = page.text.toLowerCase();
            const searchValue = value.toLowerCase();
            let index = text.indexOf(searchValue);

            while (index !== -1) {
                results.push({
                    page: pageIndex,
                    position: index,
                    context: page.text.substring(Math.max(0, index - 50), index + searchValue.length + 50)
                });
                index = text.indexOf(searchValue, index + 1);
            }
        });

        setSearchResults(results);
        setCurrentSearchIndex(0);
        if (results.length > 0) {
            setCurrentPage(results[0].page);
        }
    };

    const goToNextSearch = () => {
        if (searchResults.length > 0) {
            const nextIndex = (currentSearchIndex + 1) % searchResults.length;
            setCurrentSearchIndex(nextIndex);
            setCurrentPage(searchResults[nextIndex].page);
        }
    };

    const goToPrevSearch = () => {
        if (searchResults.length > 0) {
            const prevIndex = currentSearchIndex === 0 ? searchResults.length - 1 : currentSearchIndex - 1;
            setCurrentSearchIndex(prevIndex);
            setCurrentPage(searchResults[prevIndex].page);
        }
    };

    const handleAddBookmark = () => {
        if (!currentBookmark) {
            const bookmarkData = {
                documentId: document.id,
                page: currentPage,
                title: documentContent.content[currentPage]?.title || `Trang ${currentPage + 1}`,
                timestamp: new Date().toLocaleString()
            };

            dispatch(addBookmark(bookmarkData));

            // Save to localStorage
            const allBookmarks = JSON.parse(localStorage.getItem('talkademy_bookmarks') || '[]');
            allBookmarks.push({
                id: `${document.id}-${currentPage}`,
                ...bookmarkData
            });
            localStorage.setItem('talkademy_bookmarks', JSON.stringify(allBookmarks));

            message.success(`Đã thêm bookmark: ${bookmarkData.title}`);
        } else {
            message.warning('Trang này đã được bookmark rồi');
        }
    };

    const handleRemoveBookmark = () => {
        if (currentBookmark) {
            dispatch(removeBookmarkByPage({ documentId: document.id, page: currentPage }));

            // Remove from localStorage
            const allBookmarks = JSON.parse(localStorage.getItem('talkademy_bookmarks') || '[]');
            const updatedBookmarks = allBookmarks.filter(
                bookmark => bookmark.id !== `${document.id}-${currentPage}`
            );
            localStorage.setItem('talkademy_bookmarks', JSON.stringify(updatedBookmarks));

            message.success('Đã xóa bookmark');
        }
    };

    const goToBookmark = (bookmark) => {
        setCurrentPage(bookmark.page);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft' && currentPage > 0) {
                setCurrentPage(currentPage - 1);
            } else if (e.key === 'ArrowRight' && currentPage < documentContent.content.length - 1) {
                setCurrentPage(currentPage + 1);
            } else if (e.key === 'Escape') {
                setIsFullscreen(false);
            }
        };

        // Check if document exists before adding event listener
        if (typeof document !== 'undefined' && document.addEventListener) {
            document.addEventListener('keydown', handleKeyPress);
            return () => document.removeEventListener('keydown', handleKeyPress);
        }
    }, [currentPage, documentContent.content.length]);

    const currentContent = documentContent.content[currentPage];
    const progress = ((currentPage + 1) / documentContent.content.length) * 100;

    return (
        <div className={`document-reader ${isFullscreen ? 'fullscreen' : ''}`}>
            {/* Header */}
            <div className="reader-header">
                <div className="header-left">
                    <Button icon={<LeftOutlined />} onClick={onClose}>
                        Quay lại
                    </Button>
                    <Title level={4} className="document-title">
                        {documentContent.title}
                    </Title>
                </div>

                <div className="header-right">
                    <Search
                        placeholder="Tìm kiếm trong tài liệu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onSearch={handleSearch}
                        style={{ width: 200 }}
                        enterButton={<SearchOutlined />}
                    />

                    <Tooltip title={currentBookmark ? "Xóa bookmark" : "Thêm bookmark"}>
                        <Button
                            icon={currentBookmark ? <StarFilled /> : <StarOutlined />}
                            onClick={currentBookmark ? handleRemoveBookmark : handleAddBookmark}
                            type={currentBookmark ? "primary" : "default"}
                            style={currentBookmark ? {
                                backgroundColor: '#ffd700',
                                borderColor: '#ffd700',
                                color: '#000'
                            } : {}}
                        />
                    </Tooltip>

                    <Tooltip title="Xem Bookmarks">
                        <Button icon={<BookOutlined />} onClick={() => setShowControls(!showControls)} />
                    </Tooltip>

                    <Tooltip title="Toàn màn hình">
                        <Button icon={<FullscreenOutlined />} onClick={toggleFullscreen} />
                    </Tooltip>

                    <Tooltip title="Tải xuống">
                        <Button icon={<DownloadOutlined />} />
                    </Tooltip>
                </div>
            </div>

            {/* Progress Bar */}
            <Progress percent={progress} showInfo={false} strokeColor="#4A90E2" />

            {/* Main Content */}
            <div className="reader-content">
                <div className="content-wrapper">
                    <Card className="page-card">
                        <div className="page-header">
                            <Title level={3}>{currentContent?.title}</Title>
                            <Text type="secondary">Trang {currentPage + 1} / {documentContent.content.length}</Text>
                        </div>

                        <div
                            className="page-content"
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            <Paragraph>
                                {currentContent?.text}
                            </Paragraph>
                        </div>
                    </Card>
                </div>

                {/* Navigation */}
                <div className="navigation">
                    <Button
                        icon={<LeftOutlined />}
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                    >
                        Trang trước
                    </Button>

                    <div className="page-info">
                        {currentPage + 1} / {documentContent.content.length}
                    </div>

                    <Button
                        icon={<RightOutlined />}
                        onClick={() => setCurrentPage(Math.min(documentContent.content.length - 1, currentPage + 1))}
                        disabled={currentPage === documentContent.content.length - 1}
                    >
                        Trang sau
                    </Button>
                </div>
            </div>

            {/* Controls Panel */}
            <div className="controls-panel">
                <div className="control-group">
                    <Text strong>Font size: {fontSize}px</Text>
                    <Slider
                        min={12}
                        max={24}
                        value={fontSize}
                        onChange={(value) => setFontSize(value)}
                        style={{ width: 150 }}
                        tooltip={{ formatter: (value) => `${value}px` }}
                    />
                </div>

                {searchResults.length > 0 && (
                    <div className="search-results">
                        <Text strong>Tìm thấy {searchResults.length} kết quả</Text>
                        <div className="search-navigation">
                            <Button size="small" onClick={goToPrevSearch}>
                                <LeftOutlined />
                            </Button>
                            <Text>{currentSearchIndex + 1} / {searchResults.length}</Text>
                            <Button size="small" onClick={goToNextSearch}>
                                <RightOutlined />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bookmarks Drawer */}
            <Drawer
                title="Bookmarks"
                placement="right"
                onClose={() => setShowControls(false)}
                open={showControls}
                width={300}
            >
                <div className="bookmarks-list">
                    {bookmarks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                            <Text type="secondary">Chưa có bookmark nào</Text>
                        </div>
                    ) : (
                        bookmarks.map((bookmark, index) => (
                            <Card
                                key={bookmark.id}
                                size="small"
                                className="bookmark-item"
                                actions={[
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(removeBookmarkByPage({ documentId: document.id, page: bookmark.page }));

                                            // Remove from localStorage
                                            const allBookmarks = JSON.parse(localStorage.getItem('talkademy_bookmarks') || '[]');
                                            const updatedBookmarks = allBookmarks.filter(b => b.id !== bookmark.id);
                                            localStorage.setItem('talkademy_bookmarks', JSON.stringify(updatedBookmarks));

                                            message.success('Đã xóa bookmark');
                                        }}
                                        danger
                                    />
                                ]}
                            >
                                <div onClick={() => goToBookmark(bookmark)} style={{ cursor: 'pointer' }}>
                                    <Text strong>{bookmark.title}</Text>
                                    <br />
                                    <Text type="secondary">Trang {bookmark.page + 1}</Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: '12px' }}>{bookmark.timestamp}</Text>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </Drawer>
        </div>
    );
};

export default DocumentReader;