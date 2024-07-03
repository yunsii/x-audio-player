import { useEffect, useState } from 'react'

export interface NativeFile extends File {
  relativePath: string
}

async function* getFilesRecursively(entry: FileSystemDirectoryHandle | FileSystemFileHandle, parentDirs: string[] = []): AsyncGenerator<NativeFile, void, unknown> {
  if (entry.kind === 'file') {
    const file = (await entry.getFile()) as NativeFile
    if (file !== null) {
      file.relativePath = `${parentDirs.join('/')}/${entry.name}`
      yield file
    }
  }
  else if (entry.kind === 'directory') {
    for await (const handle of entry.values()) {
      yield * getFilesRecursively(handle, [...parentDirs, entry.name])
    }
  }
}

export function useNativeDir() {
  const [files, setFiles] = useState<NativeFile[]>([])
  const [usable, setUsable] = useState(true)

  useEffect(() => {
    if ('showDirectoryPicker' in window && 'showOpenFilePicker' in window) {
      return
    }
    setUsable(false)
  }, [])

  const pickDir = async () => {
    const dirHandle = await window.showDirectoryPicker({
      id: 'x-audio-player',
      startIn: 'music',
    })

    for await (const fileHandle of getFilesRecursively(dirHandle)) {
      setFiles((prev) => {
        if (['audio/'].some((item) => fileHandle.type.startsWith(item)) || ['.lrc'].some((item) => fileHandle.name.endsWith(item))) {
          return [...prev, fileHandle]
        }
        return prev
      })
    }
  }

  return { files, pickDir, usable }
}
