export default {
  host: "127.0.0.1",
  port: process.env.PORT || 4000,
  dbUri: process.env.DB_URI || "mongodb://localhost/mapsapp",
};
