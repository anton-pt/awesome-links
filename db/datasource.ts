import "reflect-metadata";
import { DataSource } from "typeorm";
import { Link } from "./entities/link.entity";
import { User } from "./entities/user.entity";
import {
  makeUserRepository,
  UserRepository,
} from "./repository/user.repository";
import {
  makeLinkRepository,
  LinkRepository,
} from "./repository/link.repository";

const appDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Link, User],
  logging: true,
  logger: "advanced-console",
});

export interface Database {
  connection: DataSource;
  userRepository: UserRepository;
  linkRepository: LinkRepository;
}

let db: Promise<Database>;

export const connectToDB = async () => {
  if (db) {
    return db;
  }

  db = appDataSource.initialize().then(async (connection) => {
    const userRepository = await makeUserRepository(appDataSource);
    const linkRepository = await makeLinkRepository(appDataSource);

    return { connection, userRepository, linkRepository };
  });

  return db;
};
