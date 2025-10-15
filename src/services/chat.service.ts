import axios from "axios"
import { IChat, IChatDTO } from "../interfaces/Chat"
import { createApiClient } from "../api"

class ChatService implements IChat {

    createMessage = async (data: IChatDTO, baseUrl: string, sub: string): Promise<number> => {

        const request = createApiClient(baseUrl, sub)

        return request.post('Tarefas/Chat/message', data)
    }

}

export { ChatService }
