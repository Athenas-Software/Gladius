import { z } from 'zod'

export const ChatDTOSchema = z.object({
    message: z.string(),
    assunto: z.string().optional(),
    usoreg: z.number().optional(),
    tipo: z.number(),
    codigochat: z.number(),
});

export type ChatDTOSchema = z.infer<typeof ChatDTOSchema>;
