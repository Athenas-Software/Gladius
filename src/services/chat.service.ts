import { IChat, IChatDTO, ISendGridDTO } from "../interfaces/Chat"
import { createApiClient } from "../api"
import { io } from "../socket"
import { Warning } from "../errors"
import { chatMessageErrors, chatMessageSuccess } from "../shared/helper/error.messages"
import { extractPlainTextFromMime, extractTrackingFromSubject } from "../shared/helper/sendgrid"
import { simpleParser, Attachment } from "mailparser";

class ChatService implements IChat {

  createMessage = async (data: IChatDTO, baseUrl: string, sub: string): Promise<string> => {

    try {

      const request = createApiClient(baseUrl, sub)

      await request.post('Tarefas/Chat/message', data)

      io.emit('chat_message', data)

      return chatMessageSuccess['MESSAGE_SENT']
    } catch (error) {
      throw new Warning(chatMessageErrors['MESSAGE_NOT_SEND'], 400);
    }
  }

  webhookSendgrid = async (data: ISendGridDTO): Promise<string> => {

    try {

      const parsed = await simpleParser(data.email);

      const header = extractTrackingFromSubject(data.subject)

      const message = extractPlainTextFromMime(data.email)

      if (header.subdomain && header.codigoChat) {
        const request = createApiClient(process.env.URLAPI || '', header.subdomain)

        await request.post('Tarefas/Chat/message', {
          codigoChat: parseInt(header.codigoChat),
          assunto: data.subject,
          message,
          tipo: 4,
          usoreg: 1
        })

        io.emit('chat_message', {
          codigoChat: parseInt(header.codigoChat)
        })

        return chatMessageSuccess['MESSAGE_SENT']
      }

      return chatMessageErrors['MESSAGE_NOT_SEND']
    } catch (error) {
      throw new Warning(chatMessageErrors['MESSAGE_NOT_SEND'], 400);
    }
  }

}

export { ChatService }
