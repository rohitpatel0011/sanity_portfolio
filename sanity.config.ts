import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'sanity-nextjs-portfolio',
  title: 'sanity protfolio',
  projectId: 'ha2z8oet',
  dataset: 'production',
  basePath:'/studio',
  plugins: [structureTool(), visionTool(),],
  schema: {
    types: schemaTypes,
  },
})
