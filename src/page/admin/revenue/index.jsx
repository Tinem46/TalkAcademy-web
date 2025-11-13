import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spin, Alert, Table } from "antd";
import { Column, Pie } from "@ant-design/charts";
import api from "../../../config/api";
import "./index.scss";

const currency = (v) => {
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(Number(v) || 0);
  } catch {
    return String(v);
  }
};

const RevenuePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const fetchRevenue = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/admin/revenue");
      // API may return { data: { ... } } or {...}
      const payload = res?.data?.data ?? res?.data ?? {};
      setData(payload);
    } catch (err) {
      console.error("Fetch revenue error", err);
      setError(
        err?.response?.data?.message || err.message || "Failed to load revenue"
      );
      setData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  const monthlyData = (data.revenueByMonth || []).map((m) => ({
    month: m.month,
    revenue: Number(m.totalRevenue || m.revenue || 0),
  }));

  const packageData = (data.revenueByPackage || []).map((p) => ({
    type: p.packageTitle || p.title || "Unknown",
    value: Number(p.totalRevenue || p.totalSales || 0),
  }));

  const columnConfig = {
    data: monthlyData,
    xField: "month",
    yField: "revenue",
    xAxis: { label: { autoHide: true, autoRotate: false } },
    yAxis: { label: { formatter: (v) => (v ? `${v}` : "0") } },
    tooltip: {
      formatter: (d) => ({ name: "Doanh thu", value: currency(d.revenue) }),
    },
    meta: { revenue: { alias: "Doanh thu" } },
  };

  const pieConfig = {
    appendPadding: 10,
    data: packageData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "0%",
      content: "{name}",
      style: { fontSize: 12 },
    },
  };

  const packageColumns = [
    { title: "Gói", dataIndex: "packageTitle", key: "packageTitle" },
    { title: "Tổng lượt bán", dataIndex: "totalSales", key: "totalSales" },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (v) => currency(v),
    },
  ];

  return (
    <div className="admin-revenue-page">
      <h2 className="revenue-title">Thống kê doanh thu</h2>

      {loading && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert type="error" message={error} style={{ marginBottom: 16 }} />
      )}

      {!loading && !error && (
        <div>
          <Row gutter={[16, 16]} className="revenue-summary">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card title="Tổng doanh thu" bordered className="summary-card">
                <div className="summary-value">
                  {currency(data.totalRevenue ?? 0)}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card title="Tổng gói" bordered className="summary-card">
                <div className="summary-value">{data.totalPackages ?? 0}</div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="charts-row">
            <Col xs={24} lg={14}>
              <Card
                title="Doanh thu theo tháng"
                className="chart-card"
                bodyStyle={{ overflow: "visible" }}
              >
                <div className="chart-container">
                  {monthlyData.length ? (
                    <Column {...columnConfig} />
                  ) : (
                    <div className="empty">Không có dữ liệu</div>
                  )}
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card
                title="Doanh thu theo gói"
                className="chart-card"
                bodyStyle={{ overflow: "visible" }}
              >
                <div className="chart-container">
                  {packageData.length ? (
                    <Pie {...pieConfig} />
                  ) : (
                    <div className="empty">Không có dữ liệu</div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>

          <Row className="details-row">
            <Col span={24}>
              <Card title="Chi tiết theo gói" className="details-card">
                <Table
                  dataSource={data.revenueByPackage || []}
                  columns={packageColumns}
                  rowKey={(r) => r.packageTitle || r.id}
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default RevenuePage;
