import { container } from "tsyringe"
import "reflect-metadata"
import "../shared/container/index"

//controllers
import { ChatController } from "./chat.controller"

export const chatController = container.resolve(ChatController)
