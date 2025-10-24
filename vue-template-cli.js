#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 颜色输出
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 询问用户输入
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// 验证项目名称
function validateProjectName(name) {
  if (!name || name.trim() === "") {
    return "项目名称不能为空";
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    return "项目名称只能包含字母、数字、连字符和下划线";
  }
  if (fs.existsSync(path.join(process.cwd(), name))) {
    return `目录 "${name}" 已存在`;
  }
  return null;
}

// 复制目录
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 替换文件中的模板变量
function replaceTemplateVariables(filePath, variables) {
  let content = fs.readFileSync(filePath, "utf8");

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    content = content.replace(regex, value);
  }

  fs.writeFileSync(filePath, content);
}

// 主函数
async function main() {
  console.log("");
  colorLog("cyan", "🚀 Vue项目模板生成器");
  console.log("");

  // 获取项目名称
  let projectName;
  while (true) {
    projectName = await askQuestion("📝 请输入项目名称: ");
    const error = validateProjectName(projectName);
    if (!error) break;
    colorLog("red", `❌ ${error}`);
  }

  // 获取项目描述
  const projectDescription =
    (await askQuestion("📄 请输入项目描述 (可选): ")) ||
    "基于Vue 3 + Vite + Element Plus的项目";

  // 获取作者信息
  const author =
    (await askQuestion("👤 请输入作者名称 (可选): ")) || "Developer";

  console.log("");
  colorLog("yellow", "📋 项目信息:");
  console.log(`   项目名称: ${projectName}`);
  console.log(`   项目描述: ${projectDescription}`);
  console.log(`   作者: ${author}`);
  console.log("");

  const confirm = await askQuestion("✅ 确认创建项目? (y/N): ");
  if (confirm.toLowerCase() !== "y" && confirm.toLowerCase() !== "yes") {
    colorLog("yellow", "❌ 已取消创建项目");
    rl.close();
    return;
  }

  const templateDir = path.join(__dirname, "template");
  const targetDir = path.join(process.cwd(), projectName);

  try {
    colorLog("blue", "📁 正在复制模板文件...");
    copyDirectory(templateDir, targetDir);

    colorLog("blue", "📝 正在更新项目配置...");

    // 更新package.json
    const packageJsonPath = path.join(targetDir, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = projectName;
    packageJson.description = projectDescription;
    packageJson.author = author;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // 更新README.md
    const readmePath = path.join(targetDir, "README.md");
    replaceTemplateVariables(readmePath, {
      projectName,
      projectDescription,
    });

    console.log("");
    colorLog("green", "✅ 项目创建成功！");
    console.log("");
    colorLog("cyan", "📋 下一步:");
    console.log(`   cd ${projectName}`);
    console.log("   npm install");
    console.log("   npm run dev");
    console.log("");
    colorLog("magenta", "🎉 开始你的Vue开发之旅吧！");
  } catch (error) {
    colorLog("red", `❌ 创建项目时出错: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 处理命令行参数
const args = process.argv.slice(2);
if (args.length > 0) {
  // 直接模式
  const projectName = args[0];
  const error = validateProjectName(projectName);
  if (error) {
    colorLog("red", `❌ ${error}`);
    process.exit(1);
  }

  const templateDir = path.join(__dirname, "template");
  const targetDir = path.join(process.cwd(), projectName);

  try {
    colorLog("blue", `🚀 正在创建Vue项目: ${projectName}`);
    copyDirectory(templateDir, targetDir);

    const packageJsonPath = path.join(targetDir, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const readmePath = path.join(targetDir, "README.md");
    replaceTemplateVariables(readmePath, { projectName });

    colorLog("green", "✅ 项目创建成功！");
    console.log(`   cd ${projectName}`);
    console.log("   npm install");
    console.log("   npm run dev");
  } catch (error) {
    colorLog("red", `❌ 创建项目时出错: ${error.message}`);
    process.exit(1);
  }
} else {
  // 交互模式
  main().catch(console.error);
}
