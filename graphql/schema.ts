import SchemaBuilder from "@pothos/core";
import RelayPlugin, {
  resolveCursorConnection,
  ResolveCursorConnectionArgs,
} from "@pothos/plugin-relay";

import { connectToDB } from "../db/datasource";
import { Link } from "../db/entities/link.entity";
import { User } from "../db/entities/user.entity";

const builder = new SchemaBuilder({
  plugins: [RelayPlugin],
});

const UserRef = builder.objectRef<User>("User");

const RoleEnum = builder.enumType("Role", {
  values: ["USER", "ADMIN"] as const,
});

UserRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    role: t.expose("role", {
      type: RoleEnum,
    }),
    links: t.field({
      type: [LinkRef],
      resolve: async (user) => {
        return await user.links;
      },
    }),
  }),
});

const LinkRef = builder.objectRef<Link>("Link");

builder.node(LinkRef, {
  id: { resolve: (link) => link.id, parse: (id) => parseInt(id) },
  loadOne: async (id) => {
    const db = await connectToDB();
    return await db.linkRepository.findById(id);
  },
  fields: (t) => ({
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    url: t.exposeString("url"),
    imageUrl: t.exposeString("imageUrl"),
    category: t.exposeString("category"),
  }),
});

builder.queryType({
  fields: (t) => ({
    link: t.field({
      type: LinkRef,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_, { id }) => {
        const db = await connectToDB();
        return await db.linkRepository.findById(parseInt(id));
      },
    }),
    links: t.connection(
      {
        type: LinkRef,
        resolve: (parent, args) =>
          resolveCursorConnection(
            {
              args,
              toCursor: (link) => link.id.toString(),
            },
            // Manually defining the arg type here is required
            // so that typescript can correctly infer the return value
            async ({
              before,
              after,
              limit,
              inverted,
            }: ResolveCursorConnectionArgs) => {
              const db = await connectToDB();
              return await db.linkRepository.findPaginated(
                before,
                after,
                limit,
                inverted
              );
            }
          ),
      },
      {
        name: "LinkConnection",
      }
    ),
    user: t.field({
      type: UserRef,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_, { id }) => {
        const db = await connectToDB();
        return await db.userRepository.findById(parseInt(id));
      },
    }),
    users: t.field({
      type: [UserRef],
      resolve: async () => {
        const db = await connectToDB();
        return await db.userRepository.find();
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createUser: t.field({
      type: UserRef,
      args: {
        email: t.arg.string({ required: true }),
        role: t.arg({
          type: RoleEnum,
          required: true,
        }),
      },
      resolve: async (_, { email, role }) => {
        const db = await connectToDB();
        const user = db.userRepository.create({ email, role });
        await db.userRepository.save(user);
        return user;
      },
    }),
    createLink: t.field({
      type: LinkRef,
      args: {
        title: t.arg.string({ required: true }),
        description: t.arg.string({ required: true }),
        url: t.arg.string({ required: true }),
        imageUrl: t.arg.string({ required: true }),
        category: t.arg.string({ required: true }),
      },
      resolve: async (_, { title, description, url, imageUrl, category }) => {
        const db = await connectToDB();
        const link = db.linkRepository.create({
          title,
          description,
          url,
          imageUrl,
          category,
        });
        await db.linkRepository.save(link);
        return link;
      },
    }),
    addLinkToUser: t.field({
      type: UserRef,
      args: {
        userId: t.arg.id({ required: true }),
        linkId: t.arg.id({ required: true }),
      },
      resolve: async (_, { userId, linkId }) => {
        const db = await connectToDB();
        const user = await db.userRepository.findById(parseInt(userId), [
          "links",
        ]);
        const link = await db.linkRepository.findById(parseInt(linkId));
        if (!user || !link) {
          throw new Error("User or link not found");
        }
        user.links = Promise.resolve([...(await user.links), link]);
        await db.userRepository.save(user);
        return user;
      },
    }),
  }),
});

export const schema = builder.toSchema();
