module.exports = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  bracketSpacing: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx", "cn", "twMerge"],
  tailwindAttributes: ["className"],
  tailwindClassesOrder: false,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      options: {
        importOrder: ["^@/(.*)$", "^[./]"],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true
      }
    }
  ]
};