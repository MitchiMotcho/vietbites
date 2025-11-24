import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
// import tseslint from "typescript-eslint";

const config = [
    // Ignore build artifacts
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ],
    },

    // Next.js rules (core web vitals)
    ...nextCoreWebVitals,

    // Optional: TypeScript rules with type-checking
    // ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    //     ...cfg,
    //     languageOptions: {
    //         ...cfg.languageOptions,
    //         parser: tseslint.parser,
    //         parserOptions: {
    //             ...cfg.languageOptions?.parserOptions,
    //             // Either enable the project service (auto-detect tsconfigs)...
    //             projectService: true,
    //             // ...or explicitly set your project(s):
    //             // project: ['./tsconfig.json'],
    //             tsconfigRootDir: import.meta.dirname,
    //         },
    //     },
    // })),

    // Your project overrides
    {
        rules: {
            "@next/next/no-img-element": "off",
            "react/jsx-key": "warn",
        },
    },
];


export default config;