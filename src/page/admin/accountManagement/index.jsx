import { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import {
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import DashboardTemplate from "../../../components/dashboard-template";
import api from "../../../config/api";
import { toast } from "react-toastify";

function AccountManagement() {
  const [form] = Form.useForm();
  const [setFileList] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // BỔ SUNG
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Hàm fetch có phân trang
  const fetchUsers = async (page = 1, size = 30) => {
    try {
      const res = await api.get("Accounts", {
        params: { pageNumber: page, pageSize: size },
      });

      console.log("API Response:", res.data);

      // Handle different response structures
      let usersData = [];
      let totalCount = 0;

      if (Array.isArray(res.data)) {
        usersData = res.data;
        totalCount = res.data.length;
      } else if (res.data && Array.isArray(res.data.data)) {
        usersData = res.data.data;
        totalCount = res.data.totalCount || res.data.data.length;
      } else if (res.data && res.data.data && Array.isArray(res.data.data.data)) {
        usersData = res.data.data.data;
        totalCount = res.data.data.totalCount || res.data.data.data.length;
      }

      setUsers(usersData);
      setTotalUsers(totalCount);

      console.log("Processed users:", usersData);
      console.log("Total count:", totalCount);

    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
      setUsers([]);
      setTotalUsers(0);
    }
  };

  useEffect(() => {
    fetchUsers(current, pageSize);
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type) => (
        <span style={{
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: type === "TRIAL" ? "#e6f7ff" : "#f6ffed",
          color: type === "TRIAL" ? "#1890ff" : "#52c41a",
          fontWeight: "500",
          fontSize: "12px"
        }}>
          {type}
        </span>
      ),
      filters: [
        { text: "TRIAL", value: "TRIAL" },
        { text: "PREMIUM", value: "PREMIUM" },
        { text: "BASIC", value: "BASIC" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Trial Expires At",
      dataIndex: "trialExpiresAt",
      key: "trialExpiresAt",
      width: 180,
      render: (date) => {
        if (!date) return "N/A";
        const expiryDate = new Date(date);
        const now = new Date();
        const isExpired = expiryDate < now;
        const isExpiringSoon = expiryDate < new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days

        return (
          <span style={{
            color: isExpired ? "#ff4d4f" : isExpiringSoon ? "#faad14" : "#52c41a",
            fontWeight: isExpired || isExpiringSoon ? "bold" : "normal"
          }}>
            {expiryDate.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            {isExpired && " (Expired)"}
            {isExpiringSoon && !isExpired && " (Expiring Soon)"}
          </span>
        );
      },
    },
    {
      title: "User ID",
      dataIndex: ["user", "id"],
      key: "userId",
      width: 80,
      sorter: (a, b) => (a.user?.id || 0) - (b.user?.id || 0),
    },
    {
      title: "Username",
      dataIndex: ["user", "username"],
      key: "username",
      sorter: (a, b) => (a.user?.username || "").localeCompare(b.user?.username || ""),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
      sorter: (a, b) => (a.user?.email || "").localeCompare(b.user?.email || ""),
    },
    {
      title: "Role",
      dataIndex: ["user", "role"],
      key: "role",
      width: 120,
      render: (role) => (
        <span style={{
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: role === "ADMIN" ? "#ff4d4f" : role === "STAFF" ? "#1890ff" : "#52c41a",
          color: "white",
          fontSize: "12px",
          fontWeight: "500"
        }}>
          {role}
        </span>
      ),
      filters: [
        { text: "ADMIN", value: "ADMIN" },
        { text: "STAFF", value: "STAFF" },
        { text: "CUSTOMER", value: "CUSTOMER" },
      ],
      onFilter: (value, record) => record.user?.role === value,
    },
    {
      title: "Google ID",
      dataIndex: ["user", "googleId"],
      key: "googleId",
      width: 120,
      render: (googleId) => googleId || "N/A",
    },
    {
      title: "Avatar",
      dataIndex: ["user", "avatar"],
      key: "avatar",
      width: 80,
      render: (avatar) => avatar ? "Yes" : "No",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        name="type"
        label="Account Type"
        rules={[{ required: true, message: "Please select account type" }]}
        initialValue="TRIAL"
      >
        <Select placeholder="Select account type">
          <Select.Option value="TRIAL">Trial</Select.Option>
          <Select.Option value="PREMIUM">Premium</Select.Option>
          <Select.Option value="BASIC">Basic</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="trialExpiresAt"
        label="Trial Expires At"
        rules={[{ required: true, message: "Please select trial expiration date" }]}
      >
        <Input type="datetime-local" />
      </Form.Item>
      <Form.Item
        name={["user", "username"]}
        label="Username"
        rules={[
          { required: true, message: "Please enter username" },
          { min: 3, message: "Username must be at least 3 characters" },
          { max: 20, message: "Username must be at most 20 characters" },
        ]}
      >
        <Input placeholder="Enter username" />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: "email", message: "Email is not valid" },
        ]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>
      <Form.Item
        name={["user", "password"]}
        label="Password"
        rules={[
          { required: true, message: "Please enter password" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>
      <Form.Item
        name={["user", "role"]}
        label="Role"
        rules={[{ required: true, message: "Please select role" }]}
        initialValue="CUSTOMER"
      >
        <Select placeholder="Select user role">
          <Select.Option value="CUSTOMER">Customer</Select.Option>
          <Select.Option value="ADMIN">Admin</Select.Option>
          <Select.Option value="STAFF">Staff</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["user", "googleId"]}
        label="Google ID"
      >
        <Input placeholder="Optional Google ID" />
      </Form.Item>
    </>
  );

  // Extend trial for an account
  // const extendTrial = async (id, days = 7) => {
  //   try {
  //     const res = await api.put(`/accounts/${id}/extend-trial`, { days });
  //     toast.success(`Trial extended by ${days} days!`);
  //     fetchUsers(current, pageSize);
  //     console.log(res.data);
  //   } catch (error) {
  //     toast.error("Failed to extend trial!");
  //     console.error(error);
  //   }
  // };

  // // Convert trial to premium
  // const convertToPremium = async (id) => {
  //   try {
  //     const res = await api.put(`/accounts/${id}/convert-to-premium`);
  //     toast.success("Account converted to premium!");
  //     fetchUsers(current, pageSize);
  //     console.log(res.data);
  //   } catch (error) {
  //     toast.error("Failed to convert to premium!");
  //     console.error(error);
  //   }
  // };

  // // Delete single account
  // const deleteAccount = async (id) => {
  //   try {
  //     await api.delete(`/accounts/${id}`);
  //     toast.success("Account deleted successfully!");
  //     fetchUsers(current, pageSize);
  //   } catch (error) {
  //     toast.error("Failed to delete account!");
  //     console.error(error);
  //   }
  // };


  // Update user role (for future use)
  // const updateUserRole = async (id, newRole) => {
  //   try {
  //     const res = await api.put(`/auth/users/${id}/role`, { role: newRole });
  //     toast.success("User role updated successfully!");
  //     fetchUsers(current, pageSize);
  //     console.log(res.data);
  //   } catch (error) {
  //     toast.error("Failed to update user role!");
  //     console.error(error);
  //   }
  // };

  // Custom actions Table
  // const customActions = [
  //   {
  //     label: (
  //       <span>
  //         ⏰ Extend Trial
  //       </span>
  //     ),
  //     condition: (record) => record.type === "TRIAL",
  //     action: async (id) => {
  //       await extendTrial(id, 7);
  //     },
  //     color: "#1890ff",
  //   },
  //   {
  //     label: (
  //       <span>
  //         ⭐ Convert to Premium
  //       </span>
  //     ),
  //     condition: (record) => record.type === "TRIAL",
  //     action: async (id) => {
  //       await convertToPremium(id);
  //     },
  //     color: "#722ed1",
  //   },
  //   {
  //     label: (
  //       <span>
  //         <DeleteOutlined /> Delete
  //       </span>
  //     ),
  //     condition: () => true,
  //     action: async (id) => {
  //       await deleteAccount(id);
  //     },
  //     color: "#ff4d4f",
  //   },
  // ];

  const pagination = {
    current,
    pageSize,
    total: totalUsers,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100"],
    onChange: (page, size) => {
      setCurrent(page);
      setPageSize(size);
    },
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} of ${total} accounts`,
  };
  return (
    <div>
      <DashboardTemplate
        columns={columns}
        formItems={formItems}
        apiURI={"accounts"}
        title="Account Management"
        // customActions={customActions}
        showEditDelete={true}
        hideEdit={true}
        dataSource={users}
        form={form}
        resetImage={() => setFileList([])}
        pagination={pagination}
        enableBulk={false}
      />
    </div>
  );
}

export default AccountManagement;
