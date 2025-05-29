import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 3001

const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

let accessToken = ''

async function refreshAccessToken() {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
  accessToken = response.data.access_token
}

app.get('/now-playing', async (req, res) => {
  try {
    if (!accessToken) await refreshAccessToken()
    const nowPlaying = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    res.json(nowPlaying.data)
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch now playing' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
