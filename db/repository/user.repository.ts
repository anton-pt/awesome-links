import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

export const makeUserRepository = async (dataSource: DataSource) =>
  dataSource.getRepository(User).extend({
    async findById(id: number, relations?: "links"[]) {
      return this.findOne({ where: { id }, relations: relations });
    },
  });

export type UserRepository = Awaited<ReturnType<typeof makeUserRepository>>;
