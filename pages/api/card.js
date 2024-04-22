import { ImageResponse } from '@vercel/og'
// import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const colors = {}

/** @type {(buffer: ArrayBuffer) => string} */
function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/* @type {(req: NextRequest) => Promise<ImageResponse>} */
export default async function (req) {
  const fontSerif = await fetch(
    new URL(
      '../../public/fonts/ABCGramercy-Medium-Trial.otf',
      import.meta.url,
    ).toString(),
  ).then(res => res.arrayBuffer())
  const fontSans = await fetch(
    new URL(
      '../../public/fonts/Mona-Sans-Regular.otf',
      import.meta.url,
    ).toString(),
  ).then(res => res.arrayBuffer())
  const username = process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER ?? 'lachlanjc'
  const avatarResponse = await fetch(`https://github.com/${username}.png`)
  const avatarImageType = avatarResponse.headers.get('content-type')
  const avatar = arrayBufferToBase64(await avatarResponse.arrayBuffer())

  try {
    const { searchParams } = new URL(req.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title').slice(0, 100)
      : 'Coursework'
    const theme = searchParams.has('theme')
      ? searchParams.get('theme')
      : 'light'
    const caption = searchParams.has('caption')
      ? searchParams.get('caption').slice(0, 100)
      : undefined

    const colors =
      theme === 'dark'
        ? {
            bg: '#170026',
            text: '#c975ff',
            primary: '#c975ff',
            secondary: '#867392',
          }
        : {
            text: '#291d30',
            primary: '#8900e1',
            secondary: '#7e6c88',
            bg: '#faf7fd',
          }

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: colors.bg,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            fontFamily: '"Mona Sans", system-ui, sans-serif',
            letterSpacing: '-.01em',
            padding: 100,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontSize: '100px',
            }}
          >
            <img
              src={`data:${avatarImageType};base64,${avatar}`}
              width={125}
              height={125}
              style={{
                borderRadius: 75,
                margin: 0,
                marginRight: 50,
              }}
            />
            <span style={{ color: colors.secondary }}>{username}/</span>
            <span style={{ color: colors.primary }}>edu</span>
          </div>
          <div
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                margin: '-0.5em 0 0.25em',
                lineHeight: 0.875,
                whiteSpace: 'pre-wrap',
                fontFamily: '"Gramercy", Georgia, serif',
                letterSpacing: '-0.01em',
                fontSize:
                  title.length > 24 ? 200 : title.length < 14 ? 300 : 250,
                color: colors.primary,
                textWrap: 'balance',
              }}
            >
              {title}
            </div>
            {caption && (
              <div
                style={{
                  color: colors.secondary,
                  letterSpacing: 0,
                  fontSize: '100px',
                }}
              >
                {caption}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 2400,
        height: 1256,
        // debug: true,
        fonts: [
          {
            name: 'Mona Sans',
            data: fontSans,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Gramercy',
            data: fontSerif,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    )
  } catch (e) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    })
  }
}
