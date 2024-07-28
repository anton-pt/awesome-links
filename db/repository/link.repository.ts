import { And, DataSource, FindOperator, LessThan, MoreThan } from "typeorm";
import { Link } from "../entities/link.entity";

export const makeLinkRepository = async (dataSource: DataSource) =>
  dataSource.getRepository(Link).extend({
    async findById(id: number, relations?: "users"[]) {
      return this.findOne({ where: { id }, relations: relations });
    },

    async findPaginated(
      before: string | undefined,
      after: string | undefined,
      limit: number,
      inverted: boolean,
      relations?: "users"[]
    ) {
      let whereId: FindOperator<number> | undefined;

      if (before && after) {
        whereId = And(LessThan(parseInt(before)), MoreThan(parseInt(after)));
      } else if (before) {
        whereId = LessThan(parseInt(before));
      } else if (after) {
        whereId = MoreThan(parseInt(after));
      } else {
        whereId = undefined;
      }

      return await this.find({
        where: {
          id: whereId,
        },
        order: { id: inverted ? "DESC" : "ASC" },
        take: limit,
        relations: relations,
      });
    },
  });

export type LinkRepository = Awaited<ReturnType<typeof makeLinkRepository>>;
