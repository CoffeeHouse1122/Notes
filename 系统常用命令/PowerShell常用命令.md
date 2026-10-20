# PowerShell 常用命令

> 面向 Windows PowerShell 5.1 和 Windows 上的 PowerShell 7。先用 `$PSVersionTable.PSVersion` 确认版本；`Get-NetTCPConnection`、`Test-NetConnection` 等 Windows 模块命令不能视为跨平台命令。代码块是独立示例，文件、目录、进程和服务需实际存在，详见 [使用说明](./README.md)。

## 基础操作

查看当前所在目录，类似 cmd 中的 `cd`。

```powershell
Get-Location
```

切换到指定目录，常用别名是 `cd`。

```powershell
Set-Location F:\Mine\z-hero
```

列出当前目录下的文件和文件夹，常用别名是 `ls` 或 `dir`。

```powershell
Get-ChildItem
```

列出当前目录下的所有内容，包括隐藏文件。

```powershell
Get-ChildItem -Force
```

递归列出当前目录及子目录中的所有内容。

```powershell
Get-ChildItem -Recurse
```

清空终端屏幕，常用别名是 `cls` 或 `clear`。

```powershell
Clear-Host
```

## 文件和目录

创建一个名为 `logs` 的文件夹。

```powershell
New-Item -ItemType Directory -Path .\logs
```

创建一个名为 `app.log` 的空文件。

```powershell
New-Item -ItemType File -Path .\app.log
```

复制文件到指定位置；源文件和 `backup` 父目录需存在，已有目标文件可能被覆盖。

```powershell
Copy-Item .\app.log .\backup\app.log
```

移动文件或重命名文件。

```powershell
Move-Item .\app.log .\logs\app.log
```

删除指定文件，通常不进入回收站。可先添加 `-WhatIf` 预览支持该选项的修改命令。

```powershell
Remove-Item .\app.log
```

递归删除目录及其中的所有内容，使用前要确认路径正确。

```powershell
Remove-Item .\logs -Recurse
```

查看文本文件内容。

```powershell
Get-Content .\README.md
```

查看文件最后 50 行，适合看日志。

```powershell
Get-Content .\app.log -Tail 50
```

在文件中搜索匹配 `error` 的行，默认忽略大小写且模式为正则表达式；需要区分大小写用 `-CaseSensitive`，按字面文本搜索用 `-SimpleMatch`。

```powershell
Select-String -Path .\*.log -Pattern "error"
```

## 进程和端口

查看当前系统中的进程。

```powershell
Get-Process
```

查看名为 `python` 的进程。

```powershell
Get-Process -Name python
```

根据真实进程 ID 停止进程，程序不一定有机会正常清理。先核对进程；系统服务优先使用服务管理命令停止。

```powershell
Stop-Process -Id 1234
```

停止所有名为 `python` 的进程。

```powershell
Stop-Process -Name python
```

查看本机 TCP `8067` 端口的连接或监听记录，不包括 UDP；没有匹配对象时可能报告找不到对象。仅查监听可加 `-State Listen`。

```powershell
Get-NetTCPConnection -LocalPort 8067
```

查看占用 `8067` 端口的连接状态和进程 ID。

```powershell
Get-NetTCPConnection -LocalPort 8067 | Select-Object LocalAddress,LocalPort,State,OwningProcess
```

根据端口占用信息直接查看对应进程。

```powershell
Get-NetTCPConnection -LocalPort 8067 | ForEach-Object { Get-Process -Id $_.OwningProcess }
```

## 网络请求

测试本机 `8067` 端口是否可以连接。

```powershell
Test-NetConnection 127.0.0.1 -Port 8067
```

发送 HTTP 请求并查看响应信息。

```powershell
Invoke-WebRequest http://127.0.0.1:8067
```

发送 HTTP 请求并将 JSON 响应转换为 PowerShell 对象。本例假定 FastAPI 启用了默认 `/openapi.json` 路由；其默认 `/docs` 返回 HTML 页面。其他项目请换成实际返回 JSON 的 API 地址。

```powershell
Invoke-RestMethod http://127.0.0.1:8067/openapi.json
```

## 环境变量

查看当前会话中的 `Path` 环境变量。

```powershell
$env:Path
```

设置当前进程及之后启动的子进程可继承的环境变量，不会修改已运行服务或永久保存到系统设置。

```powershell
$env:MY_ENV = "dev"
```

删除当前会话中的环境变量。

```powershell
Remove-Item Env:\MY_ENV
```

## Python 项目

查看 Python 版本。

```powershell
python --version
```

在当前目录创建 Python 虚拟环境。

```powershell
python -m venv .venv
```

激活当前目录下的 Python 虚拟环境。

```powershell
.\.venv\Scripts\Activate.ps1
```

激活虚拟环境后，根据已有的 `requirements.txt` 安装依赖，确保使用当前 Python 的 pip。

```powershell
python -m pip install -r requirements.txt
```

运行 Python 脚本。

```powershell
python .\app.py
```

运行当前目录下的 PowerShell 脚本。

```powershell
.\run.ps1
```

启动 Windows PowerShell 子进程，在该进程设置 Bypass 并运行脚本，不永久修改系统策略；组织的组策略优先级更高，仍可能阻止执行。只在确认脚本来源和内容后按需使用。PowerShell 7 的启动程序是 `pwsh`，不是 `powershell`。

```powershell
powershell -ExecutionPolicy Bypass -File .\run.ps1
```

## Git

查看 Git 工作区状态。

```powershell
git status
```

暂存当前目录下的所有改动。

```powershell
git add .
```

提交暂存区改动。

```powershell
git commit -m "update notes"
```

获取远程提交并按 Git 配置合并或变基到当前分支，可能发生冲突；先检查工作区状态。

```powershell
git pull
```

推送本地提交到远程仓库。

```powershell
git push
```

## 帮助、命令识别与版本

`Get-Help` 查看参数和示例；本地帮助不完整时可加 `-Online` 打开官方帮助。`Get-Command` 判断名称解析到别名、函数、cmdlet 还是外部程序。

Windows PowerShell 5.1 中 `curl` 通常是 `Invoke-WebRequest` 的别名，要使用 curl 原生参数可明确写 `curl.exe`。`ls` 是 `Get-ChildItem` 的别名，不支持直接照搬 `ls -la`。示例中的外部程序如 Git、Python 和 OpenSSH 需要安装并可通过 PATH 找到。

```powershell
$PSVersionTable.PSVersion
Get-Help Get-ChildItem -Examples
Get-Help Get-ChildItem -Full
Get-Command curl -All
Get-Alias ls
Get-Command git
```

## 路径、引号与变量

单引号不展开变量，双引号允许变量展开。`-LiteralPath` 将 `[]` 等字符作为路径本身处理，`-Path` 在支持通配符的命令中可能将其解释为模式。普通变量 `$logPath` 与环境变量 `$env:APP_ENV` 不同。

带空格的外部程序路径需要调用运算符，例如 `& 'C:\Program Files\Git\cmd\git.exe' --version`，前提是程序实际安装在该路径。路径加引号本身只产生字符串，不会执行程序。

```powershell
Set-Location -LiteralPath 'F:\My Project'
Get-Item -LiteralPath '.\report[1].txt'
$logPath = '.\app.log'
Get-Content -LiteralPath $logPath -Tail 20
"当前目录：$PWD"
'字面文本：$PWD'
```

## 对象管道、筛选和统计

PowerShell cmdlet 之间通常传递对象，而不只是文本。`$_` 表示当前管道对象；`Where-Object` 筛选，`Select-Object` 选择属性或数量，`Sort-Object` 排序，`Measure-Object` 统计。

`Get-Process` 的 `CPU` 是累计处理器时间（秒），不是当前 CPU 百分比。`Length` 是文件字节数。`-Wait` 持续等待新增内容，用 `Ctrl+C` 停止，不会结束产生日志的应用。

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name, Id, CPU
Get-ChildItem -File | Where-Object { $_.Length -gt 1MB } | Select-Object Name, Length
Get-Content -LiteralPath '.\app.log' | Measure-Object -Line
Get-Content -LiteralPath '.\app.log' -Tail 50 -Wait
```

## 输出文件、状态和条件执行

`Out-File` 默认覆盖，`-Append` 追加。`>` 和 `>>` 也可重定向，但不同 PowerShell 版本对编码和外部程序输出的处理不同；5.1 的 `Out-File` 默认 UTF-16LE，7 的默认是 UTF-8 无 BOM。显式指定 `utf8` 可明确使用 UTF-8，但 5.1 会加 BOM，7 默认不加。表格格式的输出适合人阅读，保留结构化记录优先用 `Export-Csv` 或 `ConvertTo-Json`。

```powershell
Get-ChildItem | Out-File -FilePath '.\files.txt' -Encoding utf8
Get-Date | Out-File -FilePath '.\run.log' -Encoding utf8 -Append
Get-Process | Export-Csv -LiteralPath '.\processes.csv' -NoTypeInformation -Encoding UTF8
```

`$LASTEXITCODE` 对应最近执行的外部程序或相关脚本退出码；cmdlet 成功状态可立即用 `$?` 查看，不能把旧的外部程序退出码当成 cmdlet 的结果。`&&`、`||` 仅 PowerShell 7 起支持，5.1 可使用 `if`。PowerShell 的 `;` 只是分隔命令，不表示前一条成功后才执行。

```powershell
git status
$gitExitCode = $LASTEXITCODE
if ($gitExitCode -ne 0) {
    Write-Error 'git status 执行失败，请检查仓库路径。'
}
```

`try/catch` 捕获终止错误；`-ErrorAction Stop` 可将该 cmdlet 的非终止错误转为可捕获的错误。外部程序的非零退出码需单独判断。

```powershell
try {
    Get-Content -LiteralPath '.\app.log' -ErrorAction Stop
} catch {
    Write-Error "读取失败：$($_.Exception.Message)"
}
```

## 执行策略与脚本

脚本被阻止时，先看错误提示和各作用域策略。不要把执行策略问题误认为 Python 环境损坏；不激活虚拟环境也可以用 `& '.\.venv\Scripts\python.exe' app.py` 调用其解释器。

`.\run.ps1` 在当前 PowerShell 中调用脚本，`powershell -File .\run.ps1` 使用 Windows PowerShell 新进程，`pwsh -File .\run.ps1` 使用已安装的 PowerShell 7 新进程。脚本的参数可用 `param([string]$LogPath = '.\app.log')` 声明，调用时传入 `-LogPath`；循环使用 `foreach ($item in $items) { ... }`，这里的省略号代表需要编写的脚本内容。

```powershell
Get-ExecutionPolicy -List
```

## 服务管理与远程操作

将服务名替换为 `Get-Service` 输出的 `Name`，不是随意填写进程名。`Running` 表示运行，`Stopped` 表示停止；修改服务状态通常需要管理员权限。停止服务会影响实际业务。

```powershell
Get-Service -Name '实际服务名'
Start-Service -Name '实际服务名'
Stop-Service -Name '实际服务名'
Restart-Service -Name '实际服务名'
```

需要 Windows OpenSSH 客户端和可访问的远端 SSH 服务；远端目录应存在且可写。SSH 登录后执行的是远端 Shell 的命令，用 `exit` 返回本地 PowerShell。详细参数见 [Linux 文档中的远程连接与文件传输](./Linux常用命令.md#远程连接与文件传输)。

```powershell
ssh user@server.example.com
scp .\app.tar.gz user@server.example.com:/srv/uploads/
```

## 参考文档

- [PowerShell 管道](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipelines)
- [PowerShell 重定向与编码差异](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_redirection)
- [执行策略与作用域](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
- [PowerShell 7 的条件管道运算符](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipeline_chain_operators)
- [FastAPI 文档页面与 OpenAPI](https://fastapi.tiangolo.com/reference/openapi/docs/)
