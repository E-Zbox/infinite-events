import "reflect-metadata";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
// .
import { IAdminContext } from ".";
// typeDefs
import {
  TCategory,
  TCategoriesResponse,
  AddCategoryInput,
} from "@/typeDefs/category";
import { TEvent } from "@/typeDefs/event";
// utils/models
import { createCategories, getCategories } from "@/utils/models/category";
import { ICategory } from "@/models/Category";
import { getEvents } from "@/utils/models/event";
import { getEventCategories } from "@/utils/models/eventCategory";
import { AdminError } from "@/utils/errors";

@Resolver((of) => TCategory)
class CategoryResolver {
  @FieldResolver(() => [TEvent!]!)
  async events(@Root() root: ICategory) {
    const { _id: categoryId } = root;

    const eventCategories = await getEventCategories([{ categoryId }]);

    const eventIds = eventCategories.data.map(({ eventId }) => ({
      _id: eventId,
    }));

    if (eventIds.length > 0) {
      const { data } = await getEvents(eventIds);

      return data;
    }

    return [];
  }

  @Query((returns) => TCategoriesResponse)
  async getCategories() {
    return await getCategories([]);
  }

  @Mutation((returns) => TCategoriesResponse)
  async createCategories(
    @Arg("newCategories", () => [AddCategoryInput!]!)
    newCategories: AddCategoryInput[],
    @Ctx() context: IAdminContext
  ) {
    const { admin } = context;

    if (!admin) {
      throw new AdminError("Only admin can perform operation!");
    }
    return await createCategories(newCategories);
  }
}

export default CategoryResolver;
