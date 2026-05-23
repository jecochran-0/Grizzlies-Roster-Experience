'use client'

import { useState } from 'react'
import type { PlayerDetail, Video } from '@/lib/types'

interface PlayerHighlightsProps {
  player: PlayerDetail
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false)

  const videoUrl =
    video.videoAssets?.['1280']?.video ??
    video.videoAssets?.['960']?.video ??
    video.videoAssets?.['320']?.video

  const thumbnail =
    video.featuredImage ||
    video.videoAssets?.['960']?.thumbnail ||
    video.videoAssets?.['320']?.thumbnail

  const duration = video.videoDurationSeconds

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="relative aspect-video bg-black/40">
        {playing && videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            controls
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            {thumbnail && (
              <img
                src={thumbnail}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <button
              onClick={() => videoUrl ? setPlaying(true) : window.open(video.permalink, '_blank')}
              className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/15"
              aria-label={`Play ${video.title}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-midnight shadow-lg transition-transform hover:scale-105">
                <PlayIcon />
              </span>
            </button>
            {duration > 0 && (
              <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs font-bold text-white">
                {formatDuration(duration)}
              </span>
            )}
          </>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-bold leading-snug text-white line-clamp-2">{video.title}</p>
      </div>
    </article>
  )
}

export default function PlayerHighlights({ player }: PlayerHighlightsProps) {
  const videos = (player.latestVideos ?? []).slice(0, 3)

  if (videos.length === 0) return null

  const first2 = videos.slice(0, 2)
  const third = videos[2]

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-black uppercase text-white">Highlights</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {first2.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
          {third && (
            <div className="hidden md:block">
              <VideoCard video={third} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
