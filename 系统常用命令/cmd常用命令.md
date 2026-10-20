# cmd 常用命令

> 适用于 Windows 的 `cmd.exe`，不能在 PowerShell 中原样套用所有语法。代码块是独立示例，文件、目录、PID 和服务需按实际场景准备或替换，详见 [使用说明](./README.md)。Git、Python、curl 和 OpenSSH 等外部程序需安装并可通过 PATH 找到。

## 基础操作

查看当前所在目录。

```cmd
cd
```

切换到指定目录，`/d` 用于跨盘符切换。

```cmd
cd /d F:\Mine\z-hero
```

列出当前目录下的文件和文件夹。

```cmd
dir
```

列出当前目录下的所有内容，包括隐藏文件。

```cmd
dir /a
```

递归列出当前目录及子目录中的内容。

```cmd
dir /s
```

清空命令行窗口。

```cmd
cls
```

退出当前 CMD 进程；在批处理脚本中仅返回调用方通常应使用 `exit /b`，否则可能连调用脚本的窗口一起退出。

```cmd
exit
```

## 文件和目录

创建一个名为 `logs` 的文件夹。

```cmd
mkdir logs
```

删除空文件夹。

```cmd
rmdir logs
```

删除文件夹及其中所有内容，执行前会提示确认。

```cmd
rmdir /s logs
```

静默删除文件夹及其中所有内容，使用前要确认路径正确。

```cmd
rmdir /s /q logs
```

复制文件到指定位置；源文件和 `backup` 父目录需存在。目标文件已存在时可能提示覆盖，具体受选项及批处理环境影响。

```cmd
copy app.log backup\app.log
```

移动文件或重命名文件。

```cmd
move app.log logs\app.log
```

删除指定文件，通常不进入回收站；需要确认时可用 `del /p app.log`。

```cmd
del app.log
```

查看文本文件内容。

```cmd
type README.md
```

分页查看文本文件内容。

```cmd
more README.md
```

在日志文件中搜索 `error`，`/i` 表示忽略大小写。

```cmd
findstr /i "error" *.log
```

## 进程和端口

查看当前系统中的进程列表。

```cmd
tasklist
```

筛选进程列表中包含 `python` 的行。

```cmd
tasklist | findstr python
```

根据进程 ID 结束进程。

```cmd
taskkill /pid 1234
```

根据进程 ID 强制结束进程。

```cmd
taskkill /pid 1234 /f
```

强制结束所有 `python.exe` 进程。

```cmd
taskkill /im python.exe /f
```

粗略筛选含 `:8067` 的网络记录，最后一列是进程 ID。它可能匹配远端地址或 `80670` 等端口，必须核对 Local Address、端口和 State；不是精确的本机端口查询。

```cmd
netstat -ano | findstr :8067
```

查看所有处于监听状态的端口。

```cmd
netstat -ano | findstr LISTENING
```

## 网络请求

测试本机网络连通性。

```cmd
ping 127.0.0.1
```

发送 HTTP 请求并查看响应内容。

```cmd
curl http://127.0.0.1:8067
```

发送 HEAD 请求并查看响应头，接口可能不支持 HEAD；要查看 GET 响应头和正文可用 `curl -i URL`。

```cmd
curl -I http://127.0.0.1:8067
```

发送 POST 请求。

```cmd
curl -X POST http://127.0.0.1:8067
```

## 环境变量

查看当前会话中的所有环境变量。

```cmd
set
```

查看 `PATH` 环境变量。

```cmd
echo %PATH%
```

设置当前 cmd 会话中的环境变量，关闭窗口后失效。

```cmd
set "MY_ENV=dev"
```

删除当前会话中的环境变量。

```cmd
set "MY_ENV="
```

## Python 项目

查看 Python 版本。

```cmd
python --version
```

在当前目录创建 Python 虚拟环境。

```cmd
python -m venv .venv
```

激活当前目录下的 Python 虚拟环境。

```cmd
.venv\Scripts\activate.bat
```

激活虚拟环境后，根据已有的 `requirements.txt` 安装依赖。

```cmd
python -m pip install -r requirements.txt
```

运行 Python 脚本。

```cmd
python app.py
```

在新的 Windows PowerShell 进程中运行已确认内容的脚本，Bypass 只针对该进程，不永久改变策略，也不能覆盖组织组策略。常规调用可先使用 `powershell -File run.ps1`；PowerShell 7 使用 `pwsh`。

```cmd
powershell -ExecutionPolicy Bypass -File run.ps1
```

## Git

查看 Git 工作区状态。

```cmd
git status
```

暂存当前目录下的所有改动。

```cmd
git add .
```

提交暂存区改动。

```cmd
git commit -m "update notes"
```

获取远程提交并按 Git 配置合并或变基到当前分支，可能发生冲突；先检查工作区状态。

```cmd
git pull
```

推送本地提交到远程仓库。

```cmd
git push
```

## 帮助、路径和命令识别

`/?` 常用于 Windows 命令帮助，外部工具按自身文档使用 `--help` 等选项。`where` 查找外部程序，不能用来判断所有 CMD 内建命令。双引号用于包含空格的路径；单引号不是 CMD 的通用引用符。`cd /d` 同时切换盘符和目录。

```cmd
help
dir /?
copy /?
where python
ver
cd /d "F:\My Project"
```

## 管道、重定向与条件

`|` 传递文本输出，`>` 覆盖文件，`>>` 追加，`2>` 重定向错误输出，`> run.log 2>&1` 合并标准输出与错误。`&&` 表示左侧成功才执行右侧，`||` 表示左侧失败才执行右侧，单个 `&` 无论左侧是否成功都继续执行。不要用 `>` 覆盖正在作为输入读取的文件。

```cmd
type app.log | findstr /i "error"
dir > files.txt
dir >> files.txt
dir "F:\Missing Directory" 2> errors.txt
python app.py > run.log 2>&1
cd /d "F:\My Project" && dir
```

退出码应在程序执行后的单独下一行立即查看。通常 `0` 表示成功，其他值需查对应程序说明。CMD 在括号块内可能提前展开 `%变量%`，不要把下面的写法直接挪入复杂批处理块并假定每次都会重新取值。

```cmd
python app.py
echo %ERRORLEVEL%
```

## 批处理基础与退出

批处理文件通常使用 `.bat` 或 `.cmd`。`@echo off` 隐藏命令本身的回显，`REM` 写注释，`%1` 是第一个参数，`%~1` 去掉参数外层引号，`%~dp0` 表示脚本自身所在目录；它与当前工作目录不一定相同。

此片段用于说明条件、参数和退出码，实际运行会安装依赖，应在目标项目和对应 Python 环境下使用。批处理内调用另一个 `.bat` 并希望返回继续执行时用 `call`，例如 `call .venv\Scripts\activate.bat`；直接在交互式 CMD 中激活则不必加 `call`。

```bat
@echo off
if not exist "requirements.txt" (
    echo requirements.txt not found
    exit /b 1
)
python -m pip install -r requirements.txt
exit /b %ERRORLEVEL%
```

当前操作一般可按 `Ctrl+C` 中断，批处理可能进一步询问是否终止。`more` 分页时空格翻页、回车前进一行、`q` 退出。

`for` 的循环变量在命令提示符中写 `%f`，在批处理文件中写 `%%f`。例如只列出当前目录日志文件：

```cmd
for %f in (*.log) do @echo %f
```

## 远程连接

安装 OpenSSH 客户端后可在 CMD 调用。远端地址、用户和路径需要替换，目标目录需可写；进入远端 Linux 后使用远端 Shell 语法，执行 `exit` 返回本地 CMD。

```cmd
ssh user@server.example.com
scp app.tar.gz user@server.example.com:/srv/uploads/
```

## 参考文档

- [Windows 命令参考](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)
- [CMD 语法与选项](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd)
