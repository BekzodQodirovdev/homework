import { z } from 'zod'

export const productCheck = z.object({
    category: z.number().min(1, 'category is required'),
    title: z
        .string()
        .min(1, 'title is required')
        .max(250, 'title must be less than 200 characters'),
    picture: z
        .string()
        .min(1, 'picture is required')
        .max(200, 'picture must be less than 200 characters'),
    summary: z.string().min(1, 'summary is required'),
    description: z.string().min(1, 'description is required'),
    price: z.number().min(1, 'price is required'),
    discount_type: z.string().min(1, 'discount_type is required'),
    discount_value: z.number().min(1, 'discount_value is required'),
    tags: z.number().min(1, 'tags is required'),
})
