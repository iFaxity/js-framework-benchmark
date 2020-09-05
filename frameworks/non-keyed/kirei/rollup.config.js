import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';

export default {
  input: `src/main.js`,
  output: { file: `dist/main.js`, format: 'iife', name: 'litFx' },
  plugins: [
    globals(),
    resolve(),
    minifyHTML(),
    terser({ warnings: true }),
  ],
  onwarn: (msg, warn) => {
    if (!/Circular/.test(msg)) {
      warn(msg)
    }
  }
};
