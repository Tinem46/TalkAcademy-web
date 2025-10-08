import { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import DashboardTemplate from "../../../components/dashboard-template";
import api from "../../../config/api";
import { toast } from "react-toastify";

function ReadingPassageManagement() {
    const [form] = Form.useForm();
    const [passages, setPassages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalPassages, setTotalPassages] = useState(0);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Hàm fetch categories
    const fetchCategories = async () => {
        try {
            const res = await api.get("categories");
            if (Array.isArray(res.data)) {
                setCategories(res.data);
            } else if (Array.isArray(res.data.data)) {
                setCategories(res.data.data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
            toast.error("Không thể tải danh sách danh mục");
        }
    };

    // Hàm fetch có phân trang
    const fetchPassages = async (page = 1, size = 10) => {
        try {
            const res = await api.get("reading-passage", {
                params: { pageNumber: page, pageSize: size },
            });
            const total = res.data?.totalCount || res.data?.data?.length || 0;
            setTotalPassages(total);

            if (Array.isArray(res.data)) {
                setPassages(res.data);
            } else if (Array.isArray(res.data.data)) {
                setPassages(res.data.data);
            } else if (res.data.data && Array.isArray(res.data.data.data)) {
                setPassages(res.data.data.data);
            } else {
                setPassages([]);
            }
        } catch (error) {
            console.error("Error fetching passages:", error);
            setPassages([]);
            toast.error("Không thể tải danh sách đoạn đọc");
        }
    };

    useEffect(() => {
        fetchPassages(current, pageSize);
        fetchCategories();
    }, [current, pageSize]);

    // Các cột Table
    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tiêu đề", dataIndex: "title", key: "title" },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            render: (text) => text ? text.substring(0, 100) + "..." : "N/A"
        },
        {
            title: "Cấp độ",
            dataIndex: "level",
            key: "level",
            render: (level) => {
                const levelMap = {
                    "BEGINNER": "BEGINNER",
                    "INTERMEDIATE": "INTERMEDIATE",
                    "ADVANCED": "ADVANCED"
                };
                return levelMap[level] || level || "N/A";
            }
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
            render: (category) => {
                if (category && category.name) {
                    return category.name;
                }
                return "N/A";
            }
        },
        {
            title: "Thời gian tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => {
                if (!date) return "N/A";
                return new Date(date).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => status === 1 ? "Hoạt động" : "Không hoạt động"
        },
    ];

    const formItems = (
        <>
            <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
                <Input placeholder="Nhập tiêu đề đoạn đọc..." />
            </Form.Item>
            <Form.Item
                name="content"
                label="Nội dung"
                rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
            >
                <Input.TextArea rows={6} placeholder="Nhập nội dung đoạn đọc..." />
            </Form.Item>
            <Form.Item
                name="level"
                label="Cấp độ"
                rules={[{ required: true, message: "Vui lòng chọn cấp độ" }]}
            >
                <Select placeholder="Chọn cấp độ">
                    <Select.Option value="BEGINNER">BEGINNER</Select.Option>
                    <Select.Option value="INTERMEDIATE">INTERMEDIATE</Select.Option>
                    <Select.Option value="ADVANCED">ADVANCED</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="categoryId"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            >
                <Select placeholder="Chọn danh mục">
                    {categories.map(category => (
                        <Select.Option key={category.id} value={category.id}>
                            {category.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                initialValue={1}
            >
                <Select>
                    <Select.Option value={1}>Hoạt động</Select.Option>
                    <Select.Option value={0}>Không hoạt động</Select.Option>
                </Select>
            </Form.Item>
        </>
    );


    // Custom onEdit function để xử lý dữ liệu khi edit
    const handleEdit = (record) => {
        const formData = {
            ...record,
            categoryId: record.category?.id || record.categoryId
        };
        form.setFieldsValue(formData);
    };

    const pagination = {
        current,
        pageSize,
        total: totalPassages,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
        },
    };

    return (
        <div>
            <DashboardTemplate
                columns={columns}
                formItems={formItems}
                apiURI={"reading-passage"}
                title="Reading Passages"
                showEditDelete={true}
                dataSource={passages}
                form={form}
                pagination={pagination}
                enableBulk={false}
                onEdit={handleEdit}
            />
        </div>
    );
}

export default ReadingPassageManagement;
