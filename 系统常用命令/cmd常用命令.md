# cmd 常用命令

## 基础操作

```cmd
cd
```
查看当前所在目录。

```cmd
cd /d F:\Mine\z-hero
```
切换到指定目录，`/d` 用于跨盘符切换。

```cmd
dir
```
列出当前目录下的文件和文件夹。

```cmd
dir /a
```
列出当前目录下的所有内容，包括隐藏文件。

```cmd
dir /s
```
递归列出当前目录及子目录中的内容。

```cmd
cls
```
清空命令行窗口。

```cmd
exit
```
退出当前 cmd 窗口或脚本。

## 文件和目录

```cmd
mkdir logs
```
创建一个名为 `logs` 的文件夹。

```cmd
rmdir logs
```
删除空文件夹。

```cmd
rmdir /s logs
```
删除文件夹及其中所有内容，执行前会提示确认。

```cmd
rmdir /s /q logs
```
静默删除文件夹及其中所有内容，使用前要确认路径正确。

```cmd
copy app.log backup\app.log
```
复制文件到指定位置。

```cmd
move app.log logs\app.log
```
移动文件或重命名文件。

```cmd
del app.log
```
删除指定文件。

```cmd
type README.md
```
查看文本文件内容。

```cmd
more README.md
```
分页查看文本文件内容。

```cmd
findstr /i "error" *.log
```
在日志文件中搜索 `error`，`/i` 表示忽略大小写。

## 进程和端口

```cmd
tasklist
```
查看当前系统中的进程列表。

```cmd
tasklist | findstr python
```
筛选进程列表中包含 `python` 的行。

```cmd
taskkill /pid 1234
```
根据进程 ID 结束进程。

```cmd
taskkill /pid 1234 /f
```
根据进程 ID 强制结束进程。

```cmd
taskkill /im python.exe /f
```
强制结束所有 `python.exe` 进程。

```cmd
netstat -ano | findstr :8067
```
查看 `8067` 端口是否被占用，并显示对应进程 ID。

```cmd
netstat -ano | findstr LISTENING
```
查看所有处于监听状态的端口。

## 网络请求

```cmd
ping 127.0.0.1
```
测试本机网络连通性。

```cmd
curl http://127.0.0.1:8067
```
发送 HTTP 请求并查看响应内容。

```cmd
curl -I http://127.0.0.1:8067
```
只查看 HTTP 响应头。

```cmd
curl -X POST http://127.0.0.1:8067
```
发送 POST 请求。

## 环境变量

```cmd
set
```
查看当前会话中的所有环境变量。

```cmd
echo %PATH%
```
查看 `PATH` 环境变量。

```cmd
set MY_ENV=dev
```
设置当前 cmd 会话中的环境变量，关闭窗口后失效。

```cmd
set MY_ENV=
```
删除当前会话中的环境变量。

## Python 项目

```cmd
python --version
```
查看 Python 版本。

```cmd
python -m venv .venv
```
在当前目录创建 Python 虚拟环境。

```cmd
.venv\Scripts\activate.bat
```
激活当前目录下的 Python 虚拟环境。

```cmd
pip install -r requirements.txt
```
根据 `requirements.txt` 安装依赖。

```cmd
python app.py
```
运行 Python 脚本。

```cmd
powershell -ExecutionPolicy Bypass -File run.ps1
```
从 cmd 中运行 PowerShell 脚本。

## Git

```cmd
git status
```
查看 Git 工作区状态。

```cmd
git add .
```
暂存当前目录下的所有改动。

```cmd
git commit -m "update notes"
```
提交暂存区改动。

```cmd
git pull
```
拉取远程仓库的最新代码。

```cmd
git push
```
推送本地提交到远程仓库。
