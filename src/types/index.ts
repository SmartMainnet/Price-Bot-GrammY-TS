import { Context, Api } from 'grammy'

interface IConfig {
  [key: string]: any
}

export type ContextType = Context & IConfig

export type BotApiType = { api: Api }
