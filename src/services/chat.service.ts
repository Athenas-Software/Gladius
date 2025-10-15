import { IChat, IChatDTO } from "../interfaces/Chat"
import { createApiClient } from "../api"
import { io } from "../socket"
import { Warning } from "../errors"
import { chatMessageErrors } from "../shared/helper/error.messages"

class ChatService implements IChat {

    createMessage = async (data: IChatDTO, baseUrl: string, sub: string): Promise<void> => {

        try {
            const request = createApiClient(baseUrl, sub)

            await request.post('Tarefas/Chat/message', data)

            io.emit('chat_message', data)
        } catch (error) {
            throw new Warning(chatMessageErrors['MESSAGE_NOT_SEND'], 400);
        }
    }

}

export { ChatService }
