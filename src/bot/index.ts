import { Bot } from 'grammy'

import { configService } from '../config/index.js'
import { ContextType } from '../types/index.js'

const { BOT_TOKEN } = configService.get('BOT_TOKEN')

export const bot = new Bot<ContextType>(BOT_TOKEN)
