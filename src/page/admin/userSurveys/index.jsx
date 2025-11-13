import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Spin, Alert } from "antd";
import api from "../../../config/api";
import "./index.scss";

const columns = [
  { title: "ID", dataIndex: "id", key: "id", width: 80 },
  { title: "Người dùng", dataIndex: ["user", "username"], key: "user" },
  {
    title: "Khảo sát",
    dataIndex: "categories",
    key: "categories",
    render: (cats) =>
      Array.isArray(cats) && cats.length
        ? cats.map((c) => c.name).join(", ")
        : "-",
  },
  { title: "Nguồn", dataIndex: "discoverSource", key: "discoverSource" },
  { title: "Tự đánh giá", dataIndex: "selfAssessment", key: "selfAssessment" },
  { title: "Mục tiêu", dataIndex: "trainingGoal", key: "trainingGoal" },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (v) => (v ? new Date(v).toLocaleString() : "-"),
  },
];

const UserSurveysPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchSurveys = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/user-surveys");
      const payload = res?.data?.data ?? res?.data ?? [];
      // normalize to array
      setData(Array.isArray(payload) ? payload : payload.items || []);
    } catch (err) {
      console.error("Fetch user surveys error", err);
      setError(
        err?.response?.data?.message || err.message || "Lấy dữ liệu thất bại"
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const onView = (record) => {
    setSelected(record);
    setModalOpen(true);
  };

  return (
    <div className="admin-user-surveys-page">
      <h2 className="page-title">Quản lý khảo sát người dùng</h2>

      {loading && (
        <div className="center">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert type="error" message={error} style={{ marginBottom: 16 }} />
      )}

      {!loading && !error && (
        <Card className="surveys-card">
          <div className="surveys-toolbar">
            <Button type="primary" onClick={fetchSurveys}>
              Tải lại
            </Button>
          </div>

          <Table
            dataSource={data}
            columns={columns}
            rowKey={(r) => r.id}
            pagination={{ pageSize: 10 }}
            onRow={(record) => ({
              onDoubleClick: () => onView(record),
            })}
            footer={() => `Tổng: ${data.length} bản ghi`}
            locale={{ emptyText: "Không có khảo sát" }}
          />
        </Card>
      )}

      <Modal
        title={`Chi tiết khảo sát ${selected?.id ?? ""}`}
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={800}
      >
        {selected ? (
          <div className="survey-detail">
            <p>
              <strong>Người dùng:</strong>{" "}
              {selected.user?.username || selected.user?.email || "-"}
            </p>
            <p>
              <strong>Tiêu đề:</strong> {selected.surveyTitle || "-"}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selected.status || "-"}
            </p>
            <p>
              <strong>Nội dung:</strong>
            </p>
            <pre className="survey-content">
              {JSON.stringify(
                selected.answers || selected.payload || selected,
                null,
                2
              )}
            </pre>
          </div>
        ) : (
          <Spin />
        )}
      </Modal>
    </div>
  );
};

export default UserSurveysPage;
