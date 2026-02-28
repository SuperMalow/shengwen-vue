#!/bin/bash

echo "准备发布到npm..."

echo "1. 检查npm登录状态"
npm whoami
if [ $? -ne 0 ]; then
    echo "请先登录npm: npm login"
    exit 1
fi

echo "2. 更新版本号"
npm version patch

echo "3. 发布到npm"
npm publish

echo "4. 推送到git仓库"
git add .
git commit -m "发布新版本"
git push

echo "发布完成！"
