# create-vue-simplify

一个基于 Vue 3 + Vite + Element Plus + Tailwind CSS 的现代化项目模板生成器。

## 特性

- 🚀 **Vue 3** - 使用最新的 Vue 3 Composition API
- ⚡ **Vite** - 快速的构建工具和开发服务器
- 🎨 **Element Plus** - 企业级 UI 组件库
- 🎯 **Tailwind CSS** - 实用优先的 CSS 框架
- 🎨 **Daisy UI** - 个性化 UI 组件库
- 📦 **Pinia** - 现代化的状态管理
- 🛣️ **Vue Router** - 官方路由管理器
- 🌐 **Axios** - HTTP 客户端
- 📝 **TypeScript 支持** - 可选的 TypeScript 支持
- 🔧 **ESLint & Prettier** - 代码检查和格式化

## 快速开始

### 方式一：使用 npx（推荐）

```bash
npx create-shengwen-vue my-project
```

### 方式二：使用 npm init

```bash
npm init shengwen-vue my-project
```

### 方式三：全局安装

```bash
npm install -g shengwen-vue
create-shengwen-vue my-project
```

## 使用方法

### 交互式创建

```bash
npx create-shengwen-vue
```

然后按照提示输入项目信息：

- 项目名称
- 项目描述
- 作者名称

### 直接创建

```bash
npx create-shengwen-vue my-awesome-project
```

## 项目结构

生成的项目包含以下结构：

```
my-project/
├── public/
│   └── logo.jpg
├── src/
│   ├── api/
│   │   ├── account.js
│   │   └── http.js
│   ├── assets/
│   ├── components/
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── index.js
│   ├── views/
│   │   └── Home.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 开发命令

创建项目后，进入项目目录并安装依赖：

```bash
cd my-project
npm install
```

然后启动开发服务器：

```bash
npm run dev
```

其他可用命令：

- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 代码检查
- `npm run format` - 代码格式化

## 技术栈

- **Vue 3.5+** - 渐进式 JavaScript 框架
- **Vite 6+** - 下一代前端构建工具
- **Element Plus 2.11+** - Vue 3 组件库
- **Tailwind CSS 4+** - 实用优先的 CSS 框架
- **Pinia 3+** - Vue 状态管理
- **Vue Router 4+** - Vue 官方路由
- **Axios 1.12+** - HTTP 客户端

## 许可证

MIT License

## 更新日志

### v1.0.0

- 初始版本发布
- 支持 Vue 3 + Vite + Element Plus + Pinia + Tailwind CSS
- 交互式和直接创建模式
- 完整的项目模板
