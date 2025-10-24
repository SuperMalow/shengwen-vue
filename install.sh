#!/bin/bash

echo "🚀 正在安装Vue项目模板CLI工具..."

# 获取脚本所在目录
CLI_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI_SCRIPT="$CLI_DIR/vue-template-cli.js"

# 创建可执行文件
cat > "$CLI_DIR/create-vue" << EOF
#!/bin/bash
node "$CLI_SCRIPT" "\$@"
EOF

chmod +x "$CLI_DIR/create-vue"

# 创建符号链接到/usr/local/bin（需要sudo权限）
if command -v sudo >/dev/null 2>&1; then
    echo "📝 正在创建全局命令..."
    sudo ln -sf "$CLI_DIR/create-vue" /usr/local/bin/create-vue
    echo "✅ 安装完成！现在可以使用 'create-vue <项目名称>' 命令创建项目"
else
    echo "📝 请手动将以下路径添加到PATH环境变量中："
    echo "export PATH=\"\$PATH:$CLI_DIR\""
    echo ""
    echo "或者直接使用以下命令创建项目："
    echo "node \"$CLI_SCRIPT\" <项目名称>"
fi

echo "🎉 安装完成！"
