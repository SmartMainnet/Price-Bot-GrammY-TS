import axios from 'axios'

import { configService } from '../config/index.js'

const { GECKOTERMINAL_URL, TONAPI_URL } = configService.get(
  'GECKOTERMINAL_URL',
  'TONAPI_URL'
)

export const geckoterminal = axios.create({
  baseURL: GECKOTERMINAL_URL,
})

export const tonapi = axios.create({
  baseURL: TONAPI_URL,
})
