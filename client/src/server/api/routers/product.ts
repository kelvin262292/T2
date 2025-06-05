import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

// Helper function to parse features from JSON string
const parseFeatures = (features: string | null): string[] => {
  if (!features) return [];
  try {
    return JSON.parse(features) as string[];
  } catch {
    return [];
  }
};

// Helper function to transform database product to API format
const transformProduct = (product: any) => ({
  ...product,
  features: parseFeatures(product.features)
});

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return products.map(transformProduct);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const product = await db.product.findUnique({
        where: { id: input.id }
      });
      if (!product) {
        throw new Error("Product not found");
      }
      return transformProduct(product);
    }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      const products = await db.product.findMany({
        where: { category: input.category },
        orderBy: { createdAt: 'desc' }
      });
      return products.map(transformProduct);
    }),

  getFeatured: publicProcedure.query(async () => {
    const products = await db.product.findMany({
      where: { 
        rating: { gte: 4.5 }
      },
      orderBy: { rating: 'desc' }
    });
    return products.map(transformProduct);
  }),

  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const searchTerm = input.query.toLowerCase();
      const products = await db.product.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { category: { contains: searchTerm, mode: 'insensitive' } }
          ]
        },
        orderBy: { createdAt: 'desc' }
      });
      return products.map(transformProduct);
    }),

  getCategories: publicProcedure.query(async () => {
    const products = await db.product.findMany({
      select: { category: true },
      distinct: ['category']
    });
    return products.map(p => p.category);
  }),
});