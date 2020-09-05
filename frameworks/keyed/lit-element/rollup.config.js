import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: `src/main.ts`,
<<<<<<< HEAD
  output: { file: `dist/main.js`, format: 'iife', name: 'litElement' },
=======
  output: { file: `dist/main.js`, format: 'iife', name: 'app' },
>>>>>>> 52f4a2ecfed93542ca9e458e9647034a2682bfa2
  plugins: [
    resolve(),
    minifyHTML(),
    typescript({ typescript: require('typescript'), clean: true }),
    terser({ warnings: true, mangle: { module: true } }),
  ],
};
