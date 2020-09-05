import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/index.js',
  plugins: [
    globals(),
    minifyHTML({
      options: {
        minifyOptions: {
          keepClosingSlash: true
        },
      },
    }),
    resolve(),
    terser(),
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'app'
  },
  onwarn: (msg, warn) => {
    if (!/Circular/.test(msg)) {
      warn(msg)
    }
  }
};
