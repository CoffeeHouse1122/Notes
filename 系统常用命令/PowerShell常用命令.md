# PowerShell 常用命令

## 基础操作

```powershell
Get-Location
```
查看当前所在目录，类似 cmd 中的 `cd`。

```powershell
Set-Location F:\Mine\z-hero
```
切换到指定目录，常用别名是 `cd`。

```powershell
Get-ChildItem
```
列出当前目录下的文件和文件夹，常用别名是 `ls` 或 `dir`。

```powershell
Get-ChildItem -Force
```
列出当前目录下的所有内容，包括隐藏文件。

```powershell
Get-ChildItem -Recurse
```
递归列出当前目录及子目录中的所有内容。

```powershell
Clear-Host
```
清空终端屏幕，常用别名是 `cls` 或 `clear`。

## 文件和目录

```powershell
New-Item -ItemType Directory -Path .\logs
```
创建一个名为 `logs` 的文件夹。

```powershell
New-Item -ItemType File -Path .\app.log
```
创建一个名为 `app.log` 的空文件。

```powershell
Copy-Item .\app.log .\backup\app.log
```
复制文件到指定位置。

```powershell
Move-Item .\app.log .\logs\app.log
```
移动文件或重命名文件。

```powershell
Remove-Item .\app.log
```
删除指定文件。

```powershell
Remove-Item .\logs -Recurse
```
递归删除目录及其中的所有内容，使用前要确认路径正确。

```powershell
Get-Content .\README.md
```
查看文本文件内容。

```powershell
Get-Content .\app.log -Tail 50
```
查看文件最后 50 行，适合看日志。

```powershell
Select-String -Path .\*.log -Pattern "error"
```
在文件中搜索包含 `error` 的行，类似 Linux 的 `grep`。

## 进程和端口

```powershell
Get-Process
```
查看当前系统中的进程。

```powershell
Get-Process -Name python
```
查看名为 `python` 的进程。

```powershell
Stop-Process -Id 1234
```
根据进程 ID 停止进程。

```powershell
Stop-Process -Name python
```
停止所有名为 `python` 的进程。

```powershell
Get-NetTCPConnection -LocalPort 8067
```
查看本机 `8067` 端口是否被占用。

```powershell
Get-NetTCPConnection -LocalPort 8067 | Select-Object LocalAddress,LocalPort,State,OwningProcess
```
查看占用 `8067` 端口的连接状态和进程 ID。

```powershell
Get-NetTCPConnection -LocalPort 8067 | ForEach-Object { Get-Process -Id $_.OwningProcess }
```
根据端口占用信息直接查看对应进程。

## 网络请求

```powershell
Test-NetConnection 127.0.0.1 -Port 8067
```
测试本机 `8067` 端口是否可以连接。

```powershell
Invoke-WebRequest http://127.0.0.1:8067
```
发送 HTTP 请求并查看响应信息。

```powershell
Invoke-RestMethod http://127.0.0.1:8067/docs
```
发送 HTTP 请求并自动解析常见 JSON 响应，适合调用 API。

## 环境变量

```powershell
$env:Path
```
查看当前会话中的 `Path` 环境变量。

```powershell
$env:MY_ENV = "dev"
```
设置当前 PowerShell 会话中的环境变量，关闭窗口后失效。

```powershell
Remove-Item Env:\MY_ENV
```
删除当前会话中的环境变量。

## Python 项目

```powershell
python --version
```
查看 Python 版本。

```powershell
python -m venv .venv
```
在当前目录创建 Python 虚拟环境。

```powershell
.\.venv\Scripts\Activate.ps1
```
激活当前目录下的 Python 虚拟环境。

```powershell
pip install -r requirements.txt
```
根据 `requirements.txt` 安装依赖。

```powershell
python .\app.py
```
运行 Python 脚本。

```powershell
.\run.ps1
```
运行当前目录下的 PowerShell 脚本。

```powershell
powershell -ExecutionPolicy Bypass -File .\run.ps1
```
临时绕过执行策略并运行 PowerShell 脚本。

## Git

```powershell
git status
```
查看 Git 工作区状态。

```powershell
git add .
```
暂存当前目录下的所有改动。

```powershell
git commit -m "update notes"
```
提交暂存区改动。

```powershell
git pull
```
拉取远程仓库的最新代码。

```powershell
git push
```
推送本地提交到远程仓库。
