import { DotenvParseOutput, config } from 'dotenv'

interface IConfig {
  [key: string]: string
}

interface IConfigService {
  get(...keys: string[]): IConfig
}

class ConfigService implements IConfigService {
  private config: DotenvParseOutput

  constructor() {
    const { error, parsed } = config()

    if (error) {
      throw new Error('Not found file: .env')
    }

    if (!parsed) {
      throw new Error('Empty file: .env')
    }

    this.config = parsed
  }

  get(...keys: string[]): IConfig {
    const res: IConfig = {}

    for (const key of keys) {
      const value = this.config[key]

      if (!value) {
        throw new Error(`Not found key: ${key}`)
      }

      res[key] = value
    }

    return res
  }
}

export const configService = new ConfigService()
