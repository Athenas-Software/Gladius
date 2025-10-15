import { inject, injectable } from "tsyringe"
import { ChatService } from "../services/chat.service"
import { Request, Response } from "express"
import { io } from "../socket"

@injectable()
class ChatController {

    constructor(
        @inject("ChatService")
        private chatService: ChatService
    ) { }

    createMessage = async (request: Request, response: Response): Promise<void> => {

        let url = atob((request.headers.urlapi || '') as string)
        const sub = request.headers.sub as string

        const res = await this.chatService.createMessage(request.body, url, sub)

        response.send(res).status(201)
    }

}

export { ChatController }
