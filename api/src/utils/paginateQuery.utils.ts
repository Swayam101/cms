import { Model, Document, FilterQuery, SortOrder } from "mongoose";
import { PaginateResult } from "../interface/paging.interface";

export default async function paginate<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T> = {},
  page: number = 1,
  limit: number = 10,
  sort: Record<string, SortOrder> = {}
): Promise<PaginateResult<T>> {
  try {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const totalDocuments = await model.countDocuments(filter).exec();
    const totalPages = Math.ceil(totalDocuments / limit);

    if (page > totalPages && totalDocuments > 0) {
      throw new Error(`invalid pagination request`);
    }

    const skip = (page - 1) * limit;

    const results = await model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      page,
      limit,
      totalPages,
      totalDocuments,
      results,
      currentItemCount: results.length,
    };
  } catch (error) {
    throw new Error("pagination error : " + (error as Error).message);
  }
}
