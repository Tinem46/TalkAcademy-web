import { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Table, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import DashboardTemplate from "../../../components/dashboard-template";
import api from "../../../config/api";
import { toast } from "react-toastify";

function CategoryManagement() {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [totalCategories, setTotalCategories] = useState(0);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [passagesModalVisible, setPassagesModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [passages, setPassages] = useState([]);

    // Hàm fetch có phân trang
    const fetchCategories = async (page = 1, size = 10) => {
        try {
            const res = await api.get("categories", {
                params: { pageNumber: page, pageSize: size },
            });
            const total = res.data?.totalCount || res.data?.data?.length || res.data?.length || 0;
            setTotalCategories(total);

            if (Array.isArray(res.data)) {
                setCategories(res.data);
            } else if (Array.isArray(res.data.data)) {
                setCategories(res.data.data);
            } else if (res.data.data && Array.isArray(res.data.data.data)) {
                setCategories(res.data.data.data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
            toast.error("Không thể tải danh sách danh mục");
        }
    };

    useEffect(() => {
        fetchCategories(current, pageSize);
    }, [current, pageSize]);

    // Hàm xem danh sách bài đọc của category
    const handleViewPassages = (category) => {
        setSelectedCategory(category);
        setPassages(category.passages || []);
        setPassagesModalVisible(true);
    };

    // Custom actions cho category
    const customActions = [
        {
            label: (
                <span>
                    <EyeOutlined /> Xem bài đọc
                </span>
            ),
            condition: (record) => record.passages && record.passages.length > 0,
            action: (id, record) => {
                handleViewPassages(record);
            },
            color: "#1890ff",
        },
    ];

    // Cột cho bảng bài đọc trong modal
    const passageColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            render: (text) => text ? text.substring(0, 100) + (text.length > 100 ? "..." : "") : "N/A"
        },
        {
            title: "Cấp độ",
            dataIndex: "level",
            key: "level",
            width: 120,
            render: (level) => {
                const colorMap = {
                    "BEGINNER": "green",
                    "INTERMEDIATE": "orange",
                    "ADVANCED": "red"
                };
                return <Tag color={colorMap[level]}>{level}</Tag>;
            }
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 150,
            render: (date) => {
                if (!date) return "N/A";
                return new Date(date).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            },
        },
    ];

    // Các cột Table
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (text) => text ? text.substring(0, 100) + (text.length > 100 ? "..." : "") : "N/A"
        },
        {
            title: "Số đoạn đọc",
            dataIndex: "passages",
            key: "passages",
            width: 120,
            render: (passages) => Array.isArray(passages) ? passages.length : 0
        },

    ];

    const formItems = (
        <>
            <Form.Item
                name="name"
                label="Tên danh mục"
                rules={[
                    { required: true, message: "Vui lòng nhập tên danh mục" },
                    { min: 2, message: "Tên danh mục phải có ít nhất 2 ký tự" },
                    { max: 100, message: "Tên danh mục không được quá 100 ký tự" }
                ]}
            >
                <Input placeholder="Nhập tên danh mục..." />
            </Form.Item>
            <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                    { required: true, message: "Vui lòng nhập mô tả" },
                    { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
                    { max: 500, message: "Mô tả không được quá 500 ký tự" }
                ]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Nhập mô tả danh mục..."
                    showCount
                    maxLength={500}
                />
            </Form.Item>
        </>
    );

    const pagination = {
        current,
        pageSize,
        total: totalCategories,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
        },
        showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} danh mục`,
    };

    return (
        <div>
            <DashboardTemplate
                columns={columns}
                formItems={formItems}
                apiURI={"categories"}
                title="Category Management"
                showEditDelete={true}
                customActions={customActions}
                dataSource={categories}
                form={form}
                pagination={pagination}
                enableBulk={false}
            />

            {/* Modal hiển thị danh sách bài đọc */}
            <Modal
                title={`Bài đọc trong danh mục: ${selectedCategory?.name || ""}`}
                open={passagesModalVisible}
                onCancel={() => setPassagesModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setPassagesModalVisible(false)}>
                        Đóng
                    </Button>
                ]}
                width={1000}
            >
                <div style={{ marginBottom: 16 }}>
                    <strong>Mô tả:</strong> {selectedCategory?.description || "N/A"}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <strong>Tổng số bài đọc:</strong> {passages.length}
                </div>
                <Table
                    columns={passageColumns}
                    dataSource={passages}
                    rowKey="id"
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} bài đọc`,
                    }}
                    size="small"
                />
            </Modal>
        </div>
    );
}

export default CategoryManagement;
