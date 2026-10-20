# 系统常用命令

这里集中整理 Windows、Linux、macOS 常用命令，方便按系统或命令环境快速查阅。

本文档用于实际工作时查询，不是按顺序执行的脚本。每个代码块都是独立示例；先确认当前环境、路径、文件和服务是否满足条件，再选用需要的命令。

## 文档目录

| 文档 | 说明 |
| --- | --- |
| [cmd 常用命令](./cmd常用命令.md) | Windows 传统命令提示符常用命令 |
| [PowerShell 常用命令](./PowerShell常用命令.md) | Windows PowerShell 常用命令 |
| [Linux 常用命令](./Linux常用命令.md) | Linux shell 常用命令，也适用于 WSL 中的大部分场景 |
| [mac 常用命令](./mac常用命令.md) | macOS 终端常用命令 |

## 简单区分

- CMD：Windows 传统命令行，适合基础文件、网络、进程等操作。
- PowerShell：Windows 更现代的命令环境，适合系统管理和自动化脚本。
- Linux：Linux/WSL 常用命令，常见 shell 包括 bash、zsh。
- macOS：基于 Unix 的 macOS 终端命令，很多命令与 Linux 类似，但系统管理命令有所不同。

## 常见使用场景

- Windows 基础操作：优先查看 [cmd 常用命令](./cmd常用命令.md)。
- Windows 自动化和系统管理：优先查看 [PowerShell 常用命令](./PowerShell常用命令.md)。
- WSL、服务器、容器环境：优先查看 [Linux 常用命令](./Linux常用命令.md)。
- Mac 电脑终端操作：优先查看 [mac 常用命令](./mac常用命令.md)。

## 文档边界与工具归类

本目录按操作系统和 Shell 组织基础操作，不表示所有列出的程序都是系统自带命令。

| 类型 | 示例 | 归类方式 |
| --- | --- | --- |
| Shell 内建命令或语法 | `cd`、Bash 的 `export`、管道、重定向 | 放在相应 Shell 文档 |
| 系统管理与基础工具 | `ls`、`ps`、`systemctl`、`Get-Process` | 放在对应系统文档，并注明适用环境 |
| 独立软件工具 | Docker、Git、Python、MySQL | 完整说明放在独立专题目录 |

Docker 的 `docker` 是客户端工具，可从不同 Shell 调用；管理容器还需要连接可用的 Docker 引擎。Docker 和 Docker Compose 文档已整理到 [软件工具命令](../软件工具命令/README.md)，按软件区分管理操作。现有 `../git/`、`../mysql/` 也是独立专题目录。

本目录中的 Git、Python 内容仅保留常用调用方式和虚拟环境激活等 Shell 差异，不作为这些工具的完整教程。

## 使用前先确认环境

| 环境 | 查看方式 | 注意事项 |
| --- | --- | --- |
| Windows PowerShell / PowerShell 7 | `$PSVersionTable.PSVersion` | `powershell.exe` 与 `pwsh.exe` 是不同版本入口；部分语法和默认编码不同 |
| CMD | `ver` | 使用 `%变量名%`，不能照搬 PowerShell 的 `$env:变量名` |
| Linux 中的 Bash | `echo "$BASH_VERSION"`，在 Bash 中执行 | 本目录 Linux 脚本按 Bash 编写；发行版决定包管理器 |
| macOS 中的 Zsh | `echo "$ZSH_VERSION"`，在 Zsh 中执行 | 系统工具的参数可能不同于 Linux；Bash 脚本明确用 `bash` 执行 |

Windows Terminal 是终端窗口，实际语法由标签页里运行的 Shell 决定。WSL 中运行 Linux 命令，Windows PowerShell/CMD 中运行各自的命令；不要把它们的路径和参数混用。

## 路径、参数和占位内容

- 命令通常由“命令名 + 选项 + 参数”组成，例如 `tail -n 50 app.log` 中，`-n 50` 指定行数，`app.log` 是文件参数。
- `.` 表示当前目录，`..` 表示上级目录。相对路径取决于当前目录，运行前可用 `pwd`、`Get-Location` 或 CMD 的 `cd` 确认位置。
- Linux/macOS 的绝对路径从 `/` 开始；Windows 示例使用盘符路径。Bash/Zsh 的 `~` 表示家目录，CMD 中请使用 `%USERPROFILE%`。
- 路径包含空格时加引号。例如 Bash 的 `cd "/path/my project"`、PowerShell 的 `Set-Location 'F:\My Project'`、CMD 的 `cd /d "F:\My Project"`。
- `user`、`server.example.com`、`PID`、`1234`、`8067`、`/path/to/dir` 都是示例值。按实际用户名、服务器、进程、端口和路径替换；不要原样结束示例 PID。
- `app.log`、`requirements.txt`、脚本、源目录和目标父目录必须真实存在。复制文件不会自动创建缺失的多级目标目录。
- `*` 通常用于匹配多个字符，`?` 通常匹配单个字符；但由 Shell 展开还是由命令解释，取决于环境和命令。`find . -name '*.log'` 中引号让模式交给 `find`。
- `https://example.com/file.zip` 是地址示例，不保证提供可下载的文件；访问本机 `8067` 端口前，需要实际有服务监听该端口。

## 帮助与退出

| 目的 | Linux / macOS | PowerShell | CMD |
| --- | --- | --- | --- |
| 查看帮助 | `man ls`；GNU 工具常用 `ls --help`，macOS 工具不保证支持 | `Get-Help Get-ChildItem -Examples` | `help`、`dir /?` |
| 查找命令 | `command -v git` | `Get-Command git` | `where git`，适用于外部程序 |
| 查看版本 | 按工具使用 `--version` 等参数 | `$PSVersionTable.PSVersion` | `ver` |
| 停止当前前台操作 | 通常按 `Ctrl+C` | 通常按 `Ctrl+C` | 通常按 `Ctrl+C` |
| 退出 Shell | `exit` | `exit` | `exit` |

`less`、`man` 和常见的 `top` 界面可按 `q` 退出。`tail -f` 和 `journalctl -f` 用 `Ctrl+C` 停止跟踪，停止查看日志不会停止服务。SSH 登录后执行 `exit` 返回本地 Shell。

## 读懂输出和错误

- 无输出不等于失败，创建、复制、修改权限等命令成功时经常不输出文字。
- `No such file or directory` / “找不到路径”：检查当前位置、文件是否存在，以及占位路径是否已替换。
- `command not found` / “无法识别”：检查工具是否安装、是否在 `PATH` 中、是否使用了正确的 Shell。
- `Permission denied` / “拒绝访问”：检查对象权限和操作需求，再决定是否需要 `sudo` 或管理员终端。
- `Connection refused`：检查目标地址、监听端口和服务状态；连接超时还需要检查网络路线和防火墙。错误信息本身不能唯一确定原因。
- 外部程序通常以退出码 `0` 表示成功，其他值含义由工具定义。例如 `grep` 返回 `1` 是未匹配到内容，大于 `1` 表示错误。
- Bash/Zsh 用 `echo $?`，CMD 用单独下一行的 `echo %ERRORLEVEL%`，PowerShell 对外部程序用 `$LASTEXITCODE`；都要在目标命令之后立即查看，避免被后续命令覆盖。

## 会修改系统或数据的操作

删除、覆盖写入、结束进程、停止服务、修改权限、安装卸载、关机和重启都会改变实际状态。它们是按需查询的操作，不要把整份文档一次性粘贴执行。

特别注意：`rm`、`del`、`Remove-Item` 通常不进入回收站；`>` 会覆盖目标文件；`kill -9` 等强制停止方式不允许程序正常清理；按进程名停止可能同时影响多个服务。执行前确认对象，更新服务前明确配置、数据备份和回滚方式。

## 参考文档

- [Bash 官方手册](https://www.gnu.org/s/bash/manual/bash.html)
- [PowerShell 文档](https://learn.microsoft.com/en-us/powershell/)
- [Docker CLI 文档](https://docs.docker.com/reference/cli/docker/)
