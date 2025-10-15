export interface IChat {
    createMessage(data: IChatDTO, baseUrl: string, sub: string): Promise<number>
}

export interface IChatDTO {
    message: string
    assunto?: string
    usoreg?: number
    tipo: number
    codigochat: number
}
