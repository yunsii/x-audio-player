import { useState } from 'react'

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

  const pickDir = async () => {
    const dirHandle = await window.showDirectoryPicker()

    for await (const fileHandle of getFilesRecursively(dirHandle)) {
      setFiles((prev) => {
        return [...prev, fileHandle]
      })
    }
  }

  return { files, pickDir }
}
