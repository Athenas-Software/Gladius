import axios from "axios"
import { IChatDTO } from "../interfaces/Chat"

class ChatService {

    createMessage = async (data: IChatDTO, baseUrl: string): Promise<number> => {
        return await axios.post(`${baseUrl}/Tarefas/Chat/message`, data)
    }

}

export { ChatService }
