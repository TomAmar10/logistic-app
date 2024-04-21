import dotenv from "dotenv";
dotenv.config();

const mongo_userName = process.env.MONGO_USERNAME || "";
const mongo_password = process.env.MONGO_PASSWORD || "";
const mongo_url = `mongodb+srv://${mongo_userName}:${mongo_password}@logisticidf.aaglfkf.mongodb.net/logistic?retryWrites=true&w=majority`;
const server_port = process.env.PORT ? +process.env.PORT : 3200;

export const config = {
  mongo: {
    url: mongo_url,
  },
  server: {
    port: server_port,
  },
};
