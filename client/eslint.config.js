
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default [
    react.configs.recommended,
    reactHooks.configs.recommended,
    {
        root: true,
        env: { browser: true, es2020: true },
        ignorePatterns: ['build', 'dist', 'eslint.config.js'],
        parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        settings: { react: { version: '17.0.2' } },
        plugins: {
            "react": react,
            "react-hooks": reactHooks,
            "react-refeash": reactRefresh

        },
        rules: {
            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    }
]
