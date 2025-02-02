/// <reference types="@antfu/eslint-config" />

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import janna from '@jannajs/lint/eslint'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

export default janna({
  next: {
    rootDir: ['apps/x-audio-player-with-nextjs'],
    cwd: __dirname,
  },
  tailwind: {
    dirs: ['apps/x-audio-player-with-nextjs'],
  },
})
