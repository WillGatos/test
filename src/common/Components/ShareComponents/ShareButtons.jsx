import React from 'react'
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

  import {
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";

function ShareButtons({quote, currentUrl, url, hashtag }) {
  return (
    <>
    {console.log(`${currentUrl}/${url}`)}
    <FacebookShareButton
              quote={`Encontré esto. No están para ir??${quote}`}
              url={`${currentUrl}/${url}`}
              >
                  <FacebookIcon/>
              </FacebookShareButton>

              <WhatsappShareButton
              title ={`Encontré esto. No están para ir??${quote}`}
              url={`${currentUrl}/${url}`}
              >
                  <WhatsappIcon/>
              </WhatsappShareButton>

              <TelegramShareButton
              title={`Encontré esto. No están para ir??${quote}`}
              url={`${currentUrl}/${url}`}
              >
                  <TelegramIcon/>
              </TelegramShareButton>

              <TwitterShareButton
              title ={`Encontré esto. Quieren perdérselo??${quote}`}
              url={`${currentUrl}/${url}`}
              hashtags={hashtag}
              >
                  <TwitterIcon/>
              </TwitterShareButton>
    </>
  )
}

export default ShareButtons