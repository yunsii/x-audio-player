'use client'

import { useState } from 'react'

import { useNativeDir } from './hooks/useNativeDir'

export default function Home() {
  const { files, pickDir, error } = useNativeDir()
  const [current, setCurrent] = useState(-1)

  return (
    <main>
      <button
        type='button'
        onClick={() => {
          pickDir()
        }}
      >
        Pick a directory
      </button>
      {error && <div className='text-red-400'>{error}</div>}
      <ul>
        {files.map((item, index) => {
          return (
            <li
              key={item.relativePath}
              className='cursor-pointer'
              onClick={() => {
                setCurrent(index)
              }}
            >
              {item.relativePath}
            </li>
          )
        })}
      </ul>
      <audio src={current >= 0 ? URL.createObjectURL(files[current]) : undefined} autoPlay controls />
    </main>
  )
}
