import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Tag, Input, Select, Pagination, Avatar, Divider, Skeleton } from 'antd';
import {
    SearchOutlined,
    CalendarOutlined,
    UserOutlined,
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    BookOutlined,
    TrophyOutlined,
    StarOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';
import './index.scss';
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';
import mascot2 from '../../assets/Mascot/Asset 1longlanh.png';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);

    const blogPosts = [
        {
            id: 1,
            title: "10 mẹo học phát âm tiếng Việt hiệu quả",
            excerpt: "Khám phá những bí quyết vàng để phát âm tiếng Việt chuẩn xác, giúp bạn tự tin giao tiếp với người bản xứ.",
            content: "Học phát âm tiếng Việt có thể là một thách thức lớn đối với người nước ngoài...",
            author: "Nguyễn Thị Minh",
            authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            publishDate: "2024-01-15",
            readTime: "5 phút",
            category: "Phát âm",
            tags: ["Phát âm", "Mẹo học", "Giao tiếp"],
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: 1250,
            likes: 89,
            comments: 23,
            featured: true,
            difficulty: "Cơ bản",
            estimatedReadTime: "5-7 phút",
            lastUpdated: "2024-01-20",
            relatedPosts: [2, 3],
            authorBio: "Chuyên gia ngôn ngữ với 10+ năm kinh nghiệm",
            shareCount: 45
        },
        {
            id: 2,
            title: "Ngữ pháp tiếng Việt cơ bản cho người mới bắt đầu",
            excerpt: "Hướng dẫn chi tiết về các cấu trúc ngữ pháp cơ bản nhất trong tiếng Việt, giúp bạn xây dựng nền tảng vững chắc.",
            content: "Ngữ pháp tiếng Việt có những đặc điểm riêng biệt so với các ngôn ngữ khác...",
            author: "Trần Văn Hùng",
            authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            publishDate: "2024-01-12",
            readTime: "8 phút",
            category: "Ngữ pháp",
            tags: ["Ngữ pháp", "Cơ bản", "Học tập"],
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: 980,
            likes: 67,
            comments: 15,
            featured: false,
            difficulty: "Cơ bản",
            estimatedReadTime: "8-10 phút",
            lastUpdated: "2024-01-18",
            relatedPosts: [1, 4],
            authorBio: "Giáo viên tiếng Việt với 12+ năm kinh nghiệm",
            shareCount: 32
        },
        {
            id: 3,
            title: "Văn hóa Việt Nam qua ngôn ngữ",
            excerpt: "Tìm hiểu về văn hóa Việt Nam thông qua cách sử dụng ngôn ngữ, giúp bạn hiểu sâu hơn về đất nước và con người Việt Nam.",
            content: "Ngôn ngữ không chỉ là công cụ giao tiếp mà còn phản ánh văn hóa của một dân tộc...",
            author: "Lê Thị Mai",
            authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            publishDate: "2024-01-10",
            readTime: "6 phút",
            category: "Văn hóa",
            tags: ["Văn hóa", "Ngôn ngữ", "Việt Nam"],
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: 756,
            likes: 45,
            comments: 12,
            featured: false
        },
        {
            id: 4,
            title: "Cách học từ vựng tiếng Việt hiệu quả",
            excerpt: "Chia sẻ các phương pháp học từ vựng tiếng Việt hiệu quả, giúp bạn mở rộng vốn từ một cách nhanh chóng và bền vững.",
            content: "Từ vựng là nền tảng quan trọng trong việc học bất kỳ ngôn ngữ nào...",
            author: "David Johnson",
            authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            publishDate: "2024-01-08",
            readTime: "7 phút",
            category: "Từ vựng",
            tags: ["Từ vựng", "Phương pháp", "Học tập"],
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: 1100,
            likes: 78,
            comments: 19,
            featured: true
        },
        {
            id: 5,
            title: "Giao tiếp tiếng Việt trong công việc",
            excerpt: "Hướng dẫn sử dụng tiếng Việt trong môi trường công việc, từ email đến thuyết trình, giúp bạn tự tin hơn trong sự nghiệp.",
            content: "Giao tiếp hiệu quả trong công việc là kỹ năng quan trọng...",
            author: "Sarah Chen",
            authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            publishDate: "2024-01-05",
            readTime: "9 phút",
            category: "Giao tiếp",
            tags: ["Giao tiếp", "Công việc", "Kỹ năng"],
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: 890,
            likes: 56,
            comments: 8,
            featured: false
        },
        {
            id: 6,
            title: "Luyện thi chứng chỉ tiếng Việt quốc tế",
            excerpt: "Chia sẻ kinh nghiệm và chiến lược để vượt qua các kỳ thi chứng chỉ tiếng Việt quốc tế một cách thành công.",
            content: "Các chứng chỉ tiếng Việt quốc tế ngày càng được công nhận rộng rãi...",
            author: "Michael Brown",
            authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            publishDate: "2024-01-03",
            readTime: "10 phút",
            category: "Thi cử",
            tags: ["Thi cử", "Chứng chỉ", "Quốc tế"],
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: 1200,
            likes: 92,
            comments: 25,
            featured: true
        }
    ];

    const categories = [
        { value: 'all', label: 'Tất cả' },
        { value: 'Phát âm', label: 'Phát âm' },
        { value: 'Ngữ pháp', label: 'Ngữ pháp' },
        { value: 'Từ vựng', label: 'Từ vựng' },
        { value: 'Giao tiếp', label: 'Giao tiếp' },
        { value: 'Văn hóa', label: 'Văn hóa' },
        { value: 'Thi cử', label: 'Thi cử' }
    ];

    const featuredPosts = blogPosts.filter(post => post.featured);
    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const postsPerPage = 6;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);
    // const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Simulate loading when changing pages or categories
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [currentPage, selectedCategory]);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            const progressBar = document.querySelector('.scroll-progress .progress-bar');

            // Update scroll progress
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollPercent = scrolled / (docHeight - winHeight);
            if (progressBar) {
                progressBar.style.width = `${scrollPercent * 100}%`;
            }

            // Parallax effect for hero background
            parallaxElements.forEach((element) => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Skeleton loading component for blog cards
    const BlogCardSkeleton = () => (
        <Card className="post-card skeleton-card">
            <Skeleton.Image style={{ width: '100%', height: 180 }} />
            <div style={{ padding: 20 }}>
                <Skeleton active paragraph={{ rows: 3 }} />
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton.Avatar size="small" />
                    <Skeleton.Button size="small" />
                </div>
            </div>
        </Card>
    );

    return (
        <div className="blog-page">
            {/* Scroll Progress Indicator */}
            <div className="scroll-progress">
                <div className="progress-bar"></div>
            </div>

            {/* Floating Action Button */}
            <div className="floating-actions">
                {/* <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<SearchOutlined />}
                    className="fab search-fab"
                    title="Tìm kiếm nhanh"
                />
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<BookOutlined />}
                    className="fab bookmark-fab"
                    title="Bài viết đã lưu"
                /> */}
                {/* <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon="↑"
                    className="fab back-to-top-fab"
                    title="Về đầu trang"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                /> */}
            </div>
            {/* Hero Section */}
            <div className="blog-hero">
                <div className="hero-background parallax-element" data-speed="0.3">
                    <div className="floating-shapes parallax-element" data-speed="0.5">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                        <div className="shape shape-5"></div>
                    </div>
                    <div className="hero-pattern parallax-element" data-speed="0.2"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-icon">
                            <BookOutlined />
                        </div>
                        <Title level={1} className="hero-title animate-fade-in">
                            Blog học tiếng Việt
                        </Title>
                        <Paragraph className="hero-subtitle animate-fade-in-delay">
                            Khám phá những bài viết hữu ích, mẹo học tập và câu chuyện thành công từ cộng đồng học tiếng Việt
                        </Paragraph>
                        <div className="hero-stats animate-fade-in-delay-2">
                            <div className="stat-item">
                                <BookOutlined />
                                <span>{blogPosts.length}+ Bài viết</span>
                            </div>
                            <div className="stat-item">
                                <TrophyOutlined />
                                <span>{featuredPosts.length} Nổi bật</span>
                            </div>
                            <div className="stat-item">
                                <PlayCircleOutlined />
                                <span>Video hướng dẫn</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-mascot">
                        <div className="mascot-character">
                            <img
                                src={mascot1}
                                alt="Talkademy Blog Mascot"
                                className="mascot-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="search-section">
                <div className="container">
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} sm={12} md={8}>
                            <Search
                                placeholder="Tìm kiếm bài viết..."
                                enterButton={<SearchOutlined />}
                                size="large"
                                className="search-input"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Select
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                size="large"
                                className="category-select"
                                style={{ width: '100%' }}
                            >
                                {categories.map(category => (
                                    <Option key={category.value} value={category.value}>
                                        {category.label}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="blog-stats">
                                <Text>{blogPosts.length} bài viết</Text>
                                <Divider type="vertical" />
                                <Text>{featuredPosts.length} bài nổi bật</Text>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Featured Posts Section */}
            <div className="featured-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Bài viết nổi bật
                    </Title>

                    <Row gutter={[32, 32]}>
                        {featuredPosts.slice(0, 3).map((post, index) => (
                            <Col xs={24} lg={8} key={post.id}>
                                <Card className={`featured-card animate-slide-up delay-${index + 1}`} hoverable>
                                    <div className="post-image">
                                        <img src={post.image} alt={post.title} />
                                        <div className="image-overlay">
                                            <div className="overlay-content">
                                                <Button type="primary" icon={<EyeOutlined />}>
                                                    Đọc ngay
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="featured-badge pulse-animation">
                                            <StarOutlined />
                                            Nổi bật
                                        </div>
                                        <div className="reading-progress">
                                            <div className="progress-bar"></div>
                                        </div>
                                    </div>

                                    <div className="post-content">
                                        <div className="post-meta">
                                            <Tag color="blue">{post.category}</Tag>
                                            <Text className="post-date">
                                                <CalendarOutlined /> {formatDate(post.publishDate)}
                                            </Text>
                                        </div>

                                        <Title level={3} className="post-title">
                                            {post.title}
                                        </Title>

                                        <Paragraph className="post-excerpt">
                                            {post.excerpt}
                                        </Paragraph>

                                        <div className="post-footer">
                                            <div className="author-info">
                                                <Avatar size="small" src={post.authorAvatar} icon={<UserOutlined />} />
                                                <div className="author-details">
                                                    <Text className="author-name">{post.author}</Text>
                                                    <Text className="author-bio">{post.authorBio}</Text>
                                                </div>
                                            </div>

                                            <div className="post-stats">
                                                <Text><EyeOutlined /> {post.views}</Text>
                                                <Text><LikeOutlined /> {post.likes}</Text>
                                                <Text><CommentOutlined /> {post.comments}</Text>
                                                <Text>📤 {post.shareCount}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* All Posts Section */}
            <div className="posts-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Tất cả bài viết
                    </Title>

                    <Row gutter={[32, 32]}>
                        {loading ? (
                            // Show skeleton loading cards
                            Array.from({ length: 6 }).map((_, index) => (
                                <Col xs={24} sm={12} lg={8} key={`skeleton-${index}`}>
                                    <BlogCardSkeleton />
                                </Col>
                            ))
                        ) : (
                            currentPosts.map((post, index) => (
                                <Col xs={24} sm={12} lg={8} key={post.id}>
                                    <Card className={`post-card animate-fade-in-up delay-${(index % 3) + 1}`} hoverable>
                                        <div className="post-image">
                                            <img src={post.image} alt={post.title} />
                                            <div className="image-overlay">
                                                <div className="overlay-content">
                                                    <Button type="primary" ghost icon={<EyeOutlined />}>
                                                        Xem chi tiết
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="category-badge">
                                                {post.category}
                                            </div>
                                        </div>

                                        <div className="post-content">
                                            <div className="post-meta">
                                                <Tag color="blue">{post.category}</Tag>
                                                <Text className="post-date">
                                                    <CalendarOutlined /> {formatDate(post.publishDate)}
                                                </Text>
                                            </div>

                                            <Title level={4} className="post-title">
                                                {post.title}
                                            </Title>

                                            <Paragraph className="post-excerpt">
                                                {post.excerpt}
                                            </Paragraph>

                                            <div className="post-tags">
                                                {post.tags.map((tag, index) => (
                                                    <Tag key={index} size="small">{tag}</Tag>
                                                ))}
                                            </div>

                                            <div className="post-footer">
                                                <div className="author-info">
                                                    <Avatar size="small" src={post.authorAvatar} icon={<UserOutlined />} />
                                                    <Text className="author-name">{post.author}</Text>
                                                    <Text className="read-time">{post.readTime}</Text>
                                                </div>

                                                <div className="post-stats">
                                                    <Text><EyeOutlined /> {post.views}</Text>
                                                    <Text><LikeOutlined /> {post.likes}</Text>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>

                    {/* Pagination */}
                    <div className="pagination-wrapper">
                        <Pagination
                            current={currentPage}
                            total={filteredPosts.length}
                            pageSize={postsPerPage}
                            onChange={setCurrentPage}
                            showSizeChanger={false}
                            showQuickJumper
                            showTotal={(total, range) =>
                                `${range[0]}-${range[1]} của ${total} bài viết`
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="newsletter-section">
                <div className="container">
                    <Card className="newsletter-card animate-fade-in-up">
                        <div className="newsletter-background">
                            <div className="newsletter-shapes">
                                <div className="shape shape-1"></div>
                                <div className="shape shape-2"></div>
                                <div className="shape shape-3"></div>
                            </div>
                        </div>
                        <Row gutter={[48, 48]} align="middle">
                            <Col xs={24} lg={16}>
                                <div className="newsletter-content">
                                    <div className="newsletter-icon">
                                        📧
                                    </div>
                                    <Title level={2}>Đăng ký nhận tin</Title>
                                    <Paragraph>
                                        Nhận những bài viết mới nhất về học tiếng Việt trực tiếp vào hộp thư của bạn
                                    </Paragraph>
                                    <div className="newsletter-benefits">
                                        <div className="benefit-item">
                                            <span className="benefit-icon">✨</span>
                                            <span>Nội dung độc quyền</span>
                                        </div>
                                        <div className="benefit-item">
                                            <span className="benefit-icon">📚</span>
                                            <span>Tài liệu miễn phí</span>
                                        </div>
                                        <div className="benefit-item">
                                            <span className="benefit-icon">🎯</span>
                                            <span>Mẹo học hiệu quả</span>
                                        </div>
                                    </div>

                                    <div className="newsletter-form">
                                        <Input
                                            placeholder="Nhập email của bạn"
                                            size="large"
                                            className="email-input"
                                        />
                                        <Button type="primary" size="large" className="subscribe-btn">
                                            Đăng ký ngay
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} lg={8}>
                                <div className="newsletter-mascot">
                                    <img
                                        src={mascot2}
                                        alt="Talkademy Newsletter Mascot"
                                        className="newsletter-mascot-image"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Blog;
