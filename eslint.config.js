import js from '@eslint/js'
import globals from 'globals'
import {defineConfig} from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: {js},
        extends: ['js/recommended'],
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'never'],
            'no-multi-spaces': 'error',
            'no-multiple-empty-lines': ['error', {max: 1}]
        }
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {globals: globals.browser}
    },
])
