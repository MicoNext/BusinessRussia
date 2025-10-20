import type { IPaginate } from "./types"

export interface PaginationOptions {
  page?: number
  limit?: number
}

export interface PaginationResult<T> {
  data: T[]
  pagination: IPaginate
}

export async function paginate<T>(
  model: any,
  filter: any = {},
  sort: any = { createdAt: -1 },
  options: PaginationOptions = {}
): Promise<PaginationResult<T>> {
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(100, Math.max(1, options.limit || 10))
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    model.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit),
    model.countDocuments(filter)
  ])

  const totalPages = Math.ceil(total / limit)
  const hasNext = page < totalPages
  const hasPrev = page > 1

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
      nextPage: hasNext ? page + 1 : null,
      prevPage: hasPrev ? page - 1 : null
    }
  }
}