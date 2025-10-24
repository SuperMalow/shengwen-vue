#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

// 动态导入 inquirer，处理版本兼容性问题
let inquirer;
try {
  inquirer = require("inquirer");
} catch (error) {
  console.error(chalk.red("❌ 无法加载 inquirer 模块，请确保已正确安装依赖"));
  console.error(chalk.yellow("💡 尝试运行: npm install"));
  process.exit(1);
}

// 获取命令行参数
const args = process.argv.slice(2);
const projectName = args[0];

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
async function copyDirectory(src, dest) {
  await fs.copy(src, dest);
}

// 替换文件中的模板变量
async function replaceTemplateVariables(filePath, variables) {
  let content = await fs.readFile(filePath, "utf8");

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    content = content.replace(regex, value);
  }

  await fs.writeFile(filePath, content);
}

// 主函数
async function main() {
  console.log("");
  console.log(chalk.cyan("🚀 Vue项目模板生成器"));
  console.log("");

  let finalProjectName = projectName;
  let projectDescription = "基于Vue 3 + Vite + Element Plus的项目";
  let author = "Developer";

  if (!projectName) {
    // 交互模式
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "📝 请输入项目名称:",
          validate: (input) => {
            const error = validateProjectName(input);
            return error ? error : true;
          },
        },
        {
          type: "input",
          name: "projectDescription",
          message: "📄 请输入项目描述 (可选):",
          default: "基于Vue 3 + Vite + Element Plus的项目",
        },
        {
          type: "input",
          name: "author",
          message: "👤 请输入作者名称 (可选):",
          default: "Developer",
        },
      ]);

      finalProjectName = answers.projectName;
      projectDescription = answers.projectDescription;
      author = answers.author;
    } catch (error) {
      console.error(chalk.red("❌ 交互模式出现错误，请使用以下方式创建项目:"));
      console.error(chalk.yellow("💡 npm init shengwen-vue <项目名称>"));
      console.error(chalk.yellow("💡 或 npx create-shengwen-vue <项目名称>"));
      process.exit(1);
    }
  } else {
    // 直接模式
    const error = validateProjectName(projectName);
    if (error) {
      console.error(chalk.red(`❌ ${error}`));
      process.exit(1);
    }
  }

  console.log("");
  console.log(chalk.yellow("📋 项目信息:"));
  console.log(`   项目名称: ${finalProjectName}`);
  console.log(`   项目描述: ${projectDescription}`);
  console.log(`   作者: ${author}`);
  console.log("");

  if (!projectName) {
    try {
      const { confirm } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "✅ 确认创建项目?",
          default: true,
        },
      ]);

      if (!confirm) {
        console.log(chalk.yellow("❌ 已取消创建项目"));
        return;
      }
    } catch (error) {
      console.log(chalk.yellow("⚠️  无法显示确认提示，继续创建项目..."));
    }
  }

  const templateDir = path.join(__dirname, "..", "template");
  const targetDir = path.join(process.cwd(), finalProjectName);

  try {
    console.log(chalk.blue("📁 正在复制模板文件..."));
    await copyDirectory(templateDir, targetDir);

    console.log(chalk.blue("📝 正在更新项目配置..."));

    // 更新package.json
    const packageJsonPath = path.join(targetDir, "package.json");
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = finalProjectName;
    packageJson.description = projectDescription;
    packageJson.author = author;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    // 更新README.md
    const readmePath = path.join(targetDir, "README.md");
    await replaceTemplateVariables(readmePath, {
      projectName: finalProjectName,
      projectDescription,
    });

    console.log("");
    console.log(chalk.green("✅ 项目创建成功！"));
    console.log("");
    console.log(chalk.cyan("📋 下一步:"));
    console.log(`   cd ${finalProjectName}`);
    console.log("   npm install");
    console.log("   npm run dev");
    console.log("");
    console.log(chalk.magenta("🎉 开始你的Vue开发之旅吧！"));
  } catch (error) {
    console.error(chalk.red(`❌ 创建项目时出错: ${error.message}`));
    process.exit(1);
  }
}

// 运行主函数
main().catch(console.error);
