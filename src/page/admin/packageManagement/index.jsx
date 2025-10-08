import { useEffect, useState } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Tag } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import DashboardTemplate from "../../../components/dashboard-template";
import api from "../../../config/api";
import { toast } from "react-toastify";

function PackageManagement() {
    const [form] = Form.useForm();
    const [packages, setPackages] = useState([]);
    const [totalPackages, setTotalPackages] = useState(0);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Hàm fetch có phân trang
    const fetchPackages = async (page = 1, size = 10) => {
        try {
            const res = await api.get("packages", {
                params: { pageNumber: page, pageSize: size },
            });
            const total = res.data?.totalCount || res.data?.data?.length || res.data?.length || 0;
            setTotalPackages(total);

            if (Array.isArray(res.data)) {
                setPackages(res.data);
            } else if (Array.isArray(res.data.data)) {
                setPackages(res.data.data);
            } else if (res.data.data && Array.isArray(res.data.data.data)) {
                setPackages(res.data.data.data);
            } else {
                setPackages([]);
            }
        } catch (error) {
            console.error("Error fetching packages:", error);
            setPackages([]);
            toast.error("Không thể tải danh sách gói dịch vụ");
        }
    };

    useEffect(() => {
        fetchPackages(current, pageSize);
    }, [current, pageSize]);

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
            title: "Tên gói",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            width: 120,
            render: (price) => {
                if (price === 0) return <Tag color="green">Miễn phí</Tag>;
                return <Tag color="blue">{price?.toLocaleString('vi-VN')} VNĐ</Tag>;
            },
            sorter: (a, b) => (a.price || 0) - (b.price || 0),
        },
        {
            title: "Thời hạn",
            dataIndex: "durationDays",
            key: "durationDays",
            width: 120,
            render: (days, record) => {
                if (record.isUnlimited) {
                    return <Tag color="purple">Không giới hạn</Tag>;
                }
                return <Tag color="orange">{days} ngày</Tag>;
            },
        },
        {
            title: "Cấp độ",
            dataIndex: "level",
            key: "level",
            width: 120,
            render: (level) => {
                const colorMap = {
                    "BASIC": "green",
                    "PREMIUM": "gold",
                    "ADVANCED": "red"
                };
                return <Tag color={colorMap[level]}>{level}</Tag>;
            },
        },
        {
            title: "Tính năng",
            dataIndex: "features",
            key: "features",
            render: (features) => {
                if (!Array.isArray(features) || features.length === 0) return "N/A";
                return (
                    <div>
                        {features.slice(0, 2).map((feature, index) => (
                            <Tag key={index} size="small" style={{ marginBottom: 2 }}>
                                {feature}
                            </Tag>
                        ))}
                        {features.length > 2 && (
                            <Tag size="small" color="default">
                                +{features.length - 2} khác
                            </Tag>
                        )}
                    </div>
                );
            },
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (text) => text ? text.substring(0, 50) + (text.length > 50 ? "..." : "") : "N/A"
        },
    ];

    const formItems = (
        <>
            <Form.Item
                name="title"
                label="Tên gói"
                rules={[
                    { required: true, message: "Vui lòng nhập tên gói" },
                    { min: 2, message: "Tên gói phải có ít nhất 2 ký tự" },
                    { max: 100, message: "Tên gói không được quá 100 ký tự" }
                ]}
            >
                <Input placeholder="Nhập tên gói dịch vụ..." />
            </Form.Item>

            <Form.Item
                name="price"
                label="Giá (VNĐ)"
                rules={[
                    { required: true, message: "Vui lòng nhập giá" },
                    { type: "number", min: 0, message: "Giá phải lớn hơn hoặc bằng 0" }
                ]}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Nhập giá gói dịch vụ..."
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>

            <Form.Item
                name="isUnlimited"
                label="Không giới hạn thời gian"
                valuePropName="checked"
                initialValue={false}
            >
                <Switch />
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues.isUnlimited !== currentValues.isUnlimited
                }
            >
                {({ getFieldValue }) => {
                    const isUnlimited = getFieldValue('isUnlimited');
                    return !isUnlimited ? (
                        <Form.Item
                            name="durationDays"
                            label="Số ngày"
                            rules={[
                                { required: true, message: "Vui lòng nhập số ngày" },
                                { type: "number", min: 1, message: "Số ngày phải lớn hơn 0" }
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                placeholder="Nhập số ngày..."
                                min={1}
                            />
                        </Form.Item>
                    ) : null;
                }}
            </Form.Item>

            <Form.Item
                name="level"
                label="Cấp độ"
                rules={[{ required: true, message: "Vui lòng chọn cấp độ" }]}
            >
                <Select placeholder="Chọn cấp độ gói">
                    <Select.Option value="BASIC">BASIC</Select.Option>
                    <Select.Option value="PREMIUM">PREMIUM</Select.Option>
                    <Select.Option value="ADVANCED">ADVANCED</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="features"
                label="Tính năng"
                rules={[
                    { required: true, message: "Vui lòng nhập ít nhất một tính năng" },
                    { type: "array", min: 1, message: "Vui lòng nhập ít nhất một tính năng" }
                ]}
            >
                <Form.List name="features">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                                    <Form.Item
                                        {...restField}
                                        name={name}
                                        rules={[{ required: true, message: 'Nhập tính năng' }]}
                                        style={{ flex: 1, marginRight: 8 }}
                                    >
                                        <Input placeholder="Nhập tính năng..." />
                                    </Form.Item>
                                    <Button
                                        type="text"
                                        icon={<MinusCircleOutlined />}
                                        onClick={() => remove(name)}
                                        danger
                                    />
                                </div>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    style={{ width: '100%' }}
                                >
                                    Thêm tính năng
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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
                    placeholder="Nhập mô tả gói dịch vụ..."
                    showCount
                    maxLength={500}
                />
            </Form.Item>
        </>
    );

    const pagination = {
        current,
        pageSize,
        total: totalPackages,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
        },
        showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} gói dịch vụ`,
    };

    return (
        <div>
            <DashboardTemplate
                columns={columns}
                formItems={formItems}
                apiURI={"packages"}
                title="Package Management"
                showEditDelete={true}
                dataSource={packages}
                form={form}
                pagination={pagination}
                enableBulk={false}
            />
        </div>
    );
}

export default PackageManagement;
