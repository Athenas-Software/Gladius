import express, { Router } from "express"
import path from "path"
import { chat } from "./chat.routes"

const router = Router()

router.use('/chat', chat)

export { router }