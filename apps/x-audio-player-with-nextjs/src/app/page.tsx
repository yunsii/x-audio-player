'use client'

import { useNativeDir } from './hooks/useNativeDir'

export default function Home() {
  const { files, pickDir } = useNativeDir()

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
        {files.map((item) => {
          return (
            <li key={item.relativePath}>
              {item.relativePath}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
