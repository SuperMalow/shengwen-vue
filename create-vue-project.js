#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// 获取命令行参数
const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.error("❌ 请提供项目名称");
  console.log("用法: node create-vue-project.js <项目名称>");
  process.exit(1);
}

// 验证项目名称
if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
  console.error("❌ 项目名称只能包含字母、数字、连字符和下划线");
  process.exit(1);
}

const templateDir = path.join(__dirname, "template");
const targetDir = path.join(process.cwd(), projectName);

// 检查目标目录是否已存在
if (fs.existsSync(targetDir)) {
  console.error(`❌ 目录 "${projectName}" 已存在`);
  process.exit(1);
}

console.log(`🚀 正在创建Vue项目: ${projectName}`);

try {
  // 复制模板文件
  console.log("📁 复制模板文件...");
  execSync(`xcopy "${templateDir}\\*" "${targetDir}\\" /E /I /Y`, {
    stdio: "inherit",
  });

  // 进入项目目录
  process.chdir(targetDir);

  // 更新package.json中的项目名称
  console.log("📝 更新项目配置...");
  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // 更新README.md中的项目名称
  const readmePath = path.join(targetDir, "README.md");
  let readmeContent = fs.readFileSync(readmePath, "utf8");
  readmeContent = readmeContent.replace(/\{\{projectName\}\}/g, projectName);
  fs.writeFileSync(readmePath, readmeContent);

  console.log("✅ 项目创建成功！");
  console.log("");
  console.log("📋 下一步:");
  console.log(`   cd ${projectName}`);
  console.log("   npm install");
  console.log("   npm run dev");
  console.log("");
  console.log("🎉 开始你的Vue开发之旅吧！");
} catch (error) {
  console.error("❌ 创建项目时出错:", error.message);
  process.exit(1);
}
