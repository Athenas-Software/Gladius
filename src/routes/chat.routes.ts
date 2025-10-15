import { Router } from "express"
import { chatController } from "../controllers"
import { validateBody } from "../middlewares/body.validator.middleware"
import { ChatDTOSchema } from "../schemas/chat.schema"

const chat = Router()

chat.post('/message', validateBody(ChatDTOSchema), chatController.createMessage)

export { chat }
