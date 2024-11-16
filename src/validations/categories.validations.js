import { z } from 'zod'

export const categoryCheck = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(100, 'Name must be less than 100 characters'),
    description: z
        .string()
        .min(1, 'description is required')
        .max(250, 'Tag must be less than 200 characters'),
    tag: z
        .string()
        .min(1, 'tag is required')
        .max(200, 'Tag must be less than 200 characters'),
})

// const data = {
//     name: 'dsadsa',
//     description: 'sdsadas',
//     tag: 'asdasdadsasd',
// }

// try {
//     const a = categoryCheck.parse(data)
//     console.log(a)
// } catch (error) {
//     console.log(error.errors[0].message);

// }
