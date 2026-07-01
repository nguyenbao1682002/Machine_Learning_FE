import { sleep } from '~shared/utils'
import { TextToPlay } from './types'

let textsToPlay: TextToPlay[] = []
let pushedHashes: string[] = []
let isPlaying = false
let audio: HTMLAudioElement | null

export function useSpeaker() {
  const pushTexts = (texts: TextToPlay[], hash?: string) => {
    if (hash && pushedHashes.includes(hash) === false) {
      pushedHashes.push(hash)
      textsToPlay.push(...texts)
    }
  }

  const playAll = (): void => {
    console.log('playAll: ', JSON.parse(JSON.stringify(textsToPlay)))
    if (isPlaying === false) {
      const textToPlay = textsToPlay.shift()
      if (textToPlay) {
        stopCurrentAudio()
        const url = new URL('https://p0fmhg8ipc.execute-api.ap-southeast-1.amazonaws.com/alpha/public/text-to-speech')
        url.searchParams.set('text', textToPlay)
        audio = new Audio(url.href)
        audio.onplaying = () => {
          isPlaying = true
        }
        audio.onended = () => {
          isPlaying = false
          playAll()
        }
        audio.onerror = async () => {
          isPlaying = false
          textsToPlay.unshift(textToPlay)
          await sleep(500)
          playAll()
        }
        audio.play()
      }
    }
  }

  const stopCurrentAudio = () => {
    if (audio) {
      audio.pause()
    }
  }

  const stopAndClearAll = () => {
    stopCurrentAudio()
    textsToPlay = []
  }

  const cleanAll = () => {
    stopAndClearAll()
    audio = null
    pushedHashes = []
    isPlaying = false
  }

  return { pushTexts, playAll, stopCurrentAudio, stopAndClearAll, cleanAll }
}
