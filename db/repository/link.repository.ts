import { And, DataSource, FindOperator, LessThan, MoreThan } from "typeorm";
import { Link } from "../entities/link.entity";

export const makeLinkRepository = async (dataSource: DataSource) =>
  dataSource.getRepository(Link).extend({
    async findById(id: string, relations?: "users"[]) {
      return this.findOne({ where: { id }, relations: relations });
    },

    async findPaginated(
      before: [Date, string] | undefined,
      after: [Date, string] | undefined,
      limit: number,
      inverted: boolean,
      relations?: "users"[]
    ) {
      const query = this.createQueryBuilder("link");
      if (before) {
        query
          .andWhere("link.createdDate < :before", { before: before[0] })
          .orWhere("link.createdDate = :before AND link.id < :beforeId", {
            before: before[0],
            beforeId: before[1],
          });
      }

      if (after) {
        query
          .andWhere("link.createdDate > :after", { after: after[0] })
          .orWhere("link.createdDate = :after AND link.id > :afterId", {
            after: after[0],
            afterId: after[1],
          });
      }

      query
        .orderBy("link.createdDate", inverted ? "DESC" : "ASC")
        .addOrderBy("link.id", inverted ? "DESC" : "ASC")
        .take(limit);

      if (relations?.includes("users")) {
        query.leftJoinAndSelect("link.users", "users");
      }

      return query.getMany();
    },
  });

export type LinkRepository = Awaited<ReturnType<typeof makeLinkRepository>>;
