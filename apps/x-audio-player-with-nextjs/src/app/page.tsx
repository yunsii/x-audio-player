'use client'

import { useState } from 'react'
import Link from 'next/link'

import { useNativeDir } from './hooks/useNativeDir'

export default function Home() {
  const { files, pickDir, usable } = useNativeDir()
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

      {!usable && (
        <div className='text-red-500'>
          Your browser do not supported
          {' '}
          <Link href='https://caniuse.com/?search=showOpenFilePicker' className='underline'>
            Native File System API
          </Link>
          {' '}
          for now.
        </div>
      )}
    </main>
  )
}
