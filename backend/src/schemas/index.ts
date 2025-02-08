import { buildSchemaSync } from "type-graphql";
// resolvers
import CategoryResolver from "@/resolvers/categoryResolver";
import EventResolver from "@/resolvers/eventResolver";
import UserResolver from "@/resolvers/userResolver";

export default buildSchemaSync({
  resolvers: [CategoryResolver, EventResolver, UserResolver],
});
