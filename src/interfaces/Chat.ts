export interface IChat {
    createMessage(data: IChatDTO, baseUrl: string, sub: string): Promise<void>
}

export interface IChatDTO {
    message: string
    assunto?: string
    usoreg?: number
    tipo: number
    codigochat: number
}
