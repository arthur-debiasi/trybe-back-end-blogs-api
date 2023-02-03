const statusMap = {
  OK: 200,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  CREATED: 201,
};

const mapStatus = (type) => statusMap[type] || 500;

module.exports = {
  statusMap,
  mapStatus,
};