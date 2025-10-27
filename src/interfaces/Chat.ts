export interface IChat {
    createMessage(data: IChatDTO, baseUrl: string, sub: string): Promise<string>
    webhookSendgrid(data: ISendGridDTO): Promise<string>
}

export interface IChatDTO {
    message: string
    assunto?: string
    usoreg?: number
    tipo: number
    codigochat: number
}

export interface ISendGridDTO {
    email: string
    subject: string
}
