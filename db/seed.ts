import { links } from "../testdata/links";
import { connectToDB } from "./datasource";

connectToDB()
  .then(async (db) => {
    console.log("Database connection established.");
    try {
      const user = db.userRepository.create({
        email: "testemail@gmail.com",
        role: "ADMIN",
      });
      const linkEntities = links.map((link) => db.linkRepository.create(link));

      await db.userRepository.save(user);
      await db.linkRepository.save(linkEntities);

      console.log("User and links were created successfully.");
    } catch (error) {
      console.error("Failed to seed data:", error);
    } finally {
      db.connection.destroy();
    }
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
