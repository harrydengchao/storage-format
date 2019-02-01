import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  legacy: true,
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    uglify({
      ie8: true
    })
  ]
}
