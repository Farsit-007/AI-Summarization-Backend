import { Prisma } from '@prisma/client';
import { articleSearchableFields, TArticleFilterOptions } from './article.constants';

export const articleFilters = (
  params?: TArticleFilterOptions
): Prisma.ArticleWhereInput | undefined => {
  if (!params) return undefined;

  const { searchTerm, tag, ...restFilters } = params;

  const andConditions: Prisma.ArticleWhereInput[] = [];

  // handle all searchTerm here by OR condition
  if (searchTerm) {
    andConditions.push({
      OR: articleSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // handle tag filter with tags array field
  if (tag) {
    andConditions.push({
      tags: {
        has: tag,
      },
    });
  }

  // handle other filters exactly
  if (Object.keys(restFilters).length > 0) {
    andConditions.push({
      AND: Object.keys(restFilters).map((key) => ({
        [key]: { equals: restFilters[key as keyof typeof restFilters] },
      })),
    });
  }

  // andConditions.push({
  //   AND: Object.keys(restFilters).map((key) => {
  //     return {
  //       [key]: { equals: restFilters[key as keyof typeof restFilters] },
  //     };
  //   }),
  // });

  const whereConditions: Prisma.ArticleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  return whereConditions;
};
