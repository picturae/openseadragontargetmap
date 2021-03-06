// rollup.config.js
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import sass from 'rollup-plugin-sass'
import resolve from '@rollup/plugin-node-resolve'

const name = 'openSeadragonDeltaEMap'

export default {
  input: `src/index.js`,
  output: [
    {
      file: `dist/${name}.js`,
      format: 'umd',
      name: name,
      sourcemap: true,
    },
    {
      file: `module/${name}.js`,
      format: 'esm',
      name: name,
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    sass({
      output: true,
    }),
    commonjs({
      // to read umd dependencies
      include: 'node_modules/**',
    }),
    terser(),
  ],
}
