import React, { useState } from 'react'
import { Play, Pause, RefreshCw } from 'lucide-react'

function App() {
  const [duration, setDuration] = useState<number>(5)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<number>(0)

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      setRemainingTime(duration * 60)
      startCountdown()
    }
  }

  const startCountdown = () => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          clearInterval(interval)
          setIsPlaying(false)
          return 0
        }
      })
    }, 1000)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Meditation Timer</h1>
        <div className="mb-6">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            Meditation Duration (minutes):
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="1"
          />
        </div>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-indigo-600">
            {isPlaying ? formatTime(remainingTime) : formatTime(duration * 60)}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handlePlayPause}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isPlaying ? (
              <>
                <Pause className="inline-block mr-2" size={20} />
                Pause
              </>
            ) : (
              <>
                <Play className="inline-block mr-2" size={20} />
                Start
              </>
            )}
          </button>
          {isPlaying && (
            <button
              onClick={() => {
                setIsPlaying(false)
                setRemainingTime(duration * 60)
              }}
              className="ml-4 bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <RefreshCw className="inline-block mr-2" size={20} />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App