module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-var-requires": "off", // 允许 require() 导入
    "@typescript-eslint/no-require-imports": "off", // 允许 require 导入
    "@typescript-eslint/no-explicit-any": "off", // 允许使用 any
    "@typescript-eslint/no-unsafe-assignment": "off", // 允许 any 类型的赋值
    "@typescript-eslint/no-unsafe-call": "off", // 允许调用 any 类型的函数
    "@typescript-eslint/no-unsafe-member-access": "off", // 允许访问 any 类型的属性
    "react-hooks/exhaustive-deps": "off", // 将 error 改为 warn
    "tailwindcss/classnames-order": "off", // 关闭 ESLint 的类名排序规则
  },
  settings: {
    next: {
      rootDir: true,
    },
    react: {
      version: "detect",
    },
  },
};
