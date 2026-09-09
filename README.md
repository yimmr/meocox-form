# @meocox/form (packages/meocox-form)

> 配置化动态表单前端引擎公共包，为 Meocox 生态提供 JSON Schema 驱动的高灵活性表单渲染能力。

## 特性
- 基于 React 18+ 与 TypeScript
- 底层依赖 `@meocox/ui` 原子组件
- JSON Schema 配置驱动，动态渲染复杂表单结构
- 支持自定义字段拓展与校验规则

## 安装
在 Monorepo 内：
```bash
pnpm add @meocox/form --filter <target>
```
作为独立 npm 包：
```bash
npm install @meocox/form
```

## 使用示例
```tsx
import { FormEngine } from "@meocox/form";

const schema = {
  id: "user-settings",
  title: "个人资料设置",
  fields: [
    { name: "username", label: "用户名", type: "text", required: true },
    { name: "bio", label: "个人简介", type: "textarea" }
  ]
};

export function SettingPage() {
  return <FormEngine schema={schema} onSubmit={(values) => console.log(values)} />;
}
```
