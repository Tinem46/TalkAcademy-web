// Utility function to decode JWT token
export const decodeJWT = (token) => {
  try {
    if (!token) return null;

    // JWT có 3 phần được phân cách bởi dấu chấm: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Decode payload (phần thứ 2)
    const payload = parts[1];

    // Base64 decode
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    // Parse JSON
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Function to get role from access token
export const getRoleFromToken = (accessToken) => {
  const decoded = decodeJWT(accessToken);
  return decoded?.role || null;
};

// Function to get user info from access token
export const getUserFromToken = (accessToken) => {
  const decoded = decodeJWT(accessToken);
  console.log("Decoded JWT payload:", decoded); // Debug log

  // Xác định role dựa trên username hoặc email
  let role = decoded?.role;
  if (!role) {
    const username = decoded?.username?.toLowerCase();
    const email = decoded?.email?.toLowerCase();

    if (username === "admin" || email?.includes("admin")) {
      role = "ADMIN";
    } else if (username === "staff" || email?.includes("staff")) {
      role = "STAFF";
    } else {
      role = "CUSTOMER";
    }
  }

  return {
    id: decoded?.sub || decoded?.id,
    email: decoded?.email,
    username: decoded?.username,
    role: role
  };
};
