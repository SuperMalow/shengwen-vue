# 发布指南

## 发布到 npm 的步骤

### 1. 准备工作

确保你已经：

- 注册了 npm 账号
- 安装了 Node.js 和 npm
- 在项目根目录下

### 2. 登录 npm

```bash
npm login
```

输入你的 npm 用户名、密码和邮箱。

### 3. 检查包信息

```bash
npm whoami  # 检查登录状态
npm pack    # 预览将要发布的文件
```

### 4. 发布到 npm

#### 方式一：使用发布脚本（推荐）

**Windows:**

```bash
publish.bat
```

**Linux/Mac:**

```bash
chmod +x publish.sh
./publish.sh
```

#### 方式二：手动发布

```bash
# 更新版本号
npm version patch  # 或 minor, major

# 发布到npm
npm publish

# 推送到git（如果有git仓库）
git add .
git commit -m "发布新版本"
git push
```

### 5. 验证发布

发布成功后，可以通过以下方式验证：

```bash
# 全局安装测试
npm install -g shengwen-vue

# 创建测试项目
create-shengwen-vue test-project

# 或者使用npx
npx create-shengwen-vue test-project
```

## 使用方式

发布成功后，用户可以通过以下方式使用：

### 方式一：npx（推荐）

```bash
npx create-shengwen-vue my-project
```

### 方式二：npm init

```bash
npm init shengwen-vue my-project
```

### 方式三：全局安装

```bash
npm install -g shengwen-vue
create-shengwen-vue my-project
```

## 注意事项

1. **包名唯一性**: 确保包名`shengwen-vue`在 npm 上是唯一的
2. **版本管理**: 每次发布前记得更新版本号
3. **文件包含**: 检查`.npmignore`文件，确保只发布必要的文件
4. **依赖管理**: 确保所有依赖都在`package.json`中正确声明

## 更新包

如果需要更新包：

1. 修改代码
2. 更新版本号：`npm version patch/minor/major`
3. 重新发布：`npm publish`
4. 推送到 git：`git push && git push --tags`

## 回滚版本

如果发布有问题，可以：

1. 使用`npm unpublish`回滚（24 小时内）
2. 或者发布新版本修复问题

## 常见问题

### Q: 发布时提示包名已存在

A: 需要修改`package.json`中的`name`字段为唯一的名称

### Q: 权限不足

A: 确保你已经登录 npm 并且有发布权限

### Q: 版本号冲突

A: 使用`npm version`命令更新版本号，不要手动修改
