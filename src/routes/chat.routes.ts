import { Router } from "express"
import { chatController } from "../controllers"
import { validateBody } from "../middlewares/body.validator.middleware"
import { ChatDTOSchema } from "../schemas/chat.schema"
import { multiPartBody } from "../middlewares/multi.part.middleware"

const chat = Router()

chat.post('/message', validateBody(ChatDTOSchema), chatController.createMessage)
chat.post('/webhook-sendgrid', ...multiPartBody, chatController.webhookSendgrid)

export { chat }
