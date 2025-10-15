import { container } from "tsyringe"
import "reflect-metadata"

//controllers
import { ChatService } from "../../services/chat.service"

//interfaces
import { IChat } from "../../interfaces/Chat"

container.registerSingleton<IChat>(
    "ChatService",
    ChatService
)

