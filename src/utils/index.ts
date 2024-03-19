import { InlineKeyboard } from 'grammy'

import { bot } from '../bot/index.js'
import { geckoterminal, tonapi } from '../api/index.js'
import { configService } from '../config/index.js'

const { LIQUIDITY_POOL, TOKEN_CONTRACT, CHAT_ID } = configService.get(
  'LIQUIDITY_POOL',
  'TOKEN_CONTRACT',
  'CHAT_ID'
)

export const checkPrice = async () => {
  try {
    const tonapiRes = await tonapi.get(`/jettons/${TOKEN_CONTRACT}`)
    const geckoterminalRes = await geckoterminal.get(
      `/networks/ton/pools/${LIQUIDITY_POOL}`
    )

    const { attributes } = geckoterminalRes.data.data

    const price_change = attributes.price_change_percentage.m5
    const isNegativeNumber = price_change[0] === '-'
    const regExp = /(\d)(?=(\d\d\d)+([^\d]|$))/g

    await bot.api.sendMessage(
      CHAT_ID!,
      `${
        price_change === '0' ? '⚪️' : isNegativeNumber ? '🔴' : '🟢'
      } [People](https://tonviewer.com/${TOKEN_CONTRACT}): ${Number(
        attributes.base_token_price_native_currency
      ).toFixed(4)} TON (${Number(attributes.base_token_price_usd).toFixed(2)}$) | ${
        isNegativeNumber ? '' : '+'
      }${price_change}%\n\n💎 Liquidity: ${Number(attributes.reserve_in_usd)
        .toFixed(0)
        .replace(regExp, '$1,')}$\n💰 Market Cap: ${attributes.fdv_usd.replace(
        regExp,
        '$1,'
      )}$\n👤 Holders: ${tonapiRes.data.holders_count
        .toString()
        .replace(regExp, '$1,')}`,
      {
        parse_mode: 'Markdown',
        link_preview_options: { is_disabled: true },
        reply_markup: new InlineKeyboard()
          .url(
            'Buy',
            `https://app.ston.fi/swap?referral_address=UQBBDmW8NxpCirSBW4tUF3uvpMqVRDqolW1rVDTBgGSKw9ep&ft=TON&tt=${TOKEN_CONTRACT}&fa=1&chartVisible=false`
          )
          .url('Chart', `https://www.geckoterminal.com/ton/pools/${LIQUIDITY_POOL}`),
      }
    )
  } catch (e) {
    console.log(e)
  }
}
