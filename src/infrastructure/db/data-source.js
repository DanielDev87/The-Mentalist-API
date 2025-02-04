require("dotenv").config();
const { DataSource } = require("typeorm");
const Character = require("../../domain/Character");
const Chapter = require("../../domain/Chapter");
const Team = require("../../domain/Team");
const Actor = require("../../domain/Actor");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "mentalist_db",
    synchronize: true,
    logging: false,
    entities: [Character, Team, Chapter, Actor],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.error("Error trying connect to Database: ", error);
    });


module.exports = AppDataSource;