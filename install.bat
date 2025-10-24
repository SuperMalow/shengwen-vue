@echo off
echo 🚀 正在安装Vue项目模板CLI工具...

REM 创建全局命令
set "CLI_DIR=%~dp0"
set "CLI_SCRIPT=%CLI_DIR%vue-template-cli.js"

REM 创建批处理文件
echo @echo off > "%CLI_DIR%create-vue.bat"
echo node "%CLI_SCRIPT%" %%* >> "%CLI_DIR%create-vue.bat"

REM 添加到PATH（需要管理员权限）
echo.
echo 📝 请将以下路径添加到系统PATH环境变量中：
echo %CLI_DIR%
echo.
echo 或者直接使用以下命令创建项目：
echo node "%CLI_SCRIPT%" ^<项目名称^>
echo.
echo ✅ 安装完成！

pause
