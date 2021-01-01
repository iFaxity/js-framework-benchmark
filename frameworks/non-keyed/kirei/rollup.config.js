import { terser } from 'rollup-plugin-terser';
//import minifyHTML from 'rollup-plugin-minify-html-template-literals';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: `src/main.js`,
  output: { file: `dist/main.js`, format: 'iife', name: 'kirei' },
  plugins: [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    //minifyHTML(),
    terser({ warnings: true })
  ],
  onwarn: (msg, warn) => {
    if (!/Circular/.test(msg)) {
      warn(msg)
    }
  }
};
