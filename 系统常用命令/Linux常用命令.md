# Linux 常用命令

> 本文的 Shell 语法和脚本以 Bash 为准；各代码块是独立示例，不应从头连续执行。路径、用户名、PID、端口与服务名请替换为实际值。先阅读 [使用说明](./README.md)。
>
> 包管理器由发行版决定；`systemctl`、`journalctl` 需要 systemd 环境。WSL 或容器中不一定运行 systemd。`curl`、`zip`、`unzip`、`rsync` 等工具可能需要另行安装，先用 `command -v 工具名` 检查。

## 基础操作

```bash
pwd
```
查看当前所在目录。

```bash
cd /home/user
```
切换到指定目录。

```bash
cd ..
```
切换到上一级目录。

```bash
cd ~
```
切换到当前用户的家目录。

```bash
ls
```
列出当前目录下的文件和文件夹。

```bash
ls -la
```
以详细格式列出所有内容，包括隐藏文件。

```bash
clear
```
清空终端屏幕。

```bash
history
```
查看当前 Bash 会话加载的命令历史；是否保存及保存范围受历史配置影响。

## 文件和目录

```bash
mkdir logs
```
创建一个名为 `logs` 的目录。

```bash
mkdir -p app/logs
```
递归创建多级目录，如果上级目录不存在会自动创建。

```bash
touch app.log
```
文件不存在时创建空文件，已存在时更新访问时间和修改时间，不清空内容。

```bash
cp app.log backup/app.log
```
复制文件到指定位置；`app.log` 和目标父目录 `backup` 必须存在，目标文件已存在时可能被覆盖。

```bash
cp -r app backup
```
递归复制目录及其中所有内容。`backup` 不存在时创建为副本目录；已是目录时通常复制到 `backup/app`。

```bash
mv app.log logs/app.log
```
移动文件，也可以用于重命名文件。

```bash
rm app.log
```
删除指定文件，通常不进入回收站；需要逐项确认时使用 `rm -i app.log`。

```bash
rm -r logs
```
递归删除目录及其中所有内容，使用前要确认路径正确。

```bash
rm -rf logs
```
强制递归删除目录，不提示确认，使用时要非常谨慎。

```bash
cat README.md
```
一次性输出文件全部内容。

```bash
less README.md
```
分页查看文件内容，适合查看大文件。

```bash
head -n 20 app.log
```
查看文件前 20 行。

```bash
tail -n 50 app.log
```
查看文件最后 50 行。

```bash
tail -f app.log
```
实时追踪文件新增内容，常用于查看日志。

```bash
find . -type f -name "*.log"
```
在当前目录及子目录中查找所有 `.log` 文件。

```bash
grep "error" app.log
```
在文件中搜索包含 `error` 的行。

```bash
grep -R "error" .
```
递归搜索当前目录中包含 `error` 的内容。

## 权限和用户

```bash
whoami
```
查看当前登录用户名。

```bash
id
```
查看当前用户的 UID、GID 和所属用户组。

```bash
sudo command
```
以目标用户身份执行命令，默认通常为 root；`command` 是占位内容，应换成实际命令。需要系统安装 `sudo` 且当前用户获得授权。

```bash
chmod +x run.sh
```
给脚本添加可执行权限。

```bash
chmod 644 file.txt
```
设置文件权限为所有者可读写，其他用户只读。

```bash
chmod 755 run.sh
```
设置脚本权限为所有者可读写执行，其他用户可读可执行。

```bash
chown user:user file.txt
```
修改文件的所有者和所属用户组。替换 `user:user` 为已有的用户和组；修改所有者通常需要 `sudo`。

## 进程和端口

```bash
ps aux
```
查看当前系统中的进程列表。

```bash
ps aux | grep python
```
按文本查找包含 `python` 的进程；也可能出现 `grep` 自己。可用 `pgrep -af python` 查看匹配命令行的进程，但它同样是模式匹配，需检查完整结果。

```bash
top
```
实时查看系统进程和资源占用。

```bash
htop
```
以交互方式查看进程和资源占用，需要系统已安装 `htop`。

```bash
kill 1234
```
向指定进程发送 SIGTERM，请求正常退出；程序可能捕获或忽略该信号，因此要再次检查进程状态。

```bash
kill -9 1234
```
发送 SIGKILL 强制结束指定进程，程序无法执行正常清理。仅在正常停止无效且确认 PID 后使用；由服务管理器托管的进程优先用对应服务停止命令。

```bash
pkill python
```
结束进程名匹配 `python` 的进程，可能一次影响多个项目；先检查匹配对象，处理单个服务时优先按服务名或 PID 操作。

```bash
ss -tulnp
```
查看监听 TCP 套接字和未连接 UDP 套接字。`-t/-u` 表示 TCP/UDP，`-l` 筛选监听类套接字，`-n` 显示数字地址和端口，`-p` 显示进程；查看其他用户的进程信息可能需要 `sudo`。

```bash
ss -lntp 'sport = :8067'
```
精确筛选本机 TCP `8067` 监听端口；UDP 可用 `ss -lnup 'sport = :8067'`。未显示 TCP 监听不代表不存在其他状态的套接字。

```bash
lsof -i :8067
```
查看占用 `8067` 端口的进程，需要系统已安装 `lsof`。

## 网络请求

```bash
ping 127.0.0.1
```
测试本机回环地址的 ICMP 响应，不验证互联网或 HTTP 服务是否可用；通常持续运行，按 `Ctrl+C` 结束。测试远端可用 `ping -c 4 server.example.com`，但不响应也可能是对方禁用了 ICMP。

```bash
curl http://127.0.0.1:8067
```
发送 HTTP 请求并输出响应内容。

```bash
curl -I http://127.0.0.1:8067
```
发送 HEAD 请求并显示响应头；部分接口不支持 HEAD。需要查看正常 GET 请求的响应头和正文时使用 `curl -i URL`。

```bash
wget https://example.com/file.zip
```
下载指定 URL 的文件。

```bash
ip addr
```
查看本机网络接口和 IP 地址。

```bash
ip route
```
查看路由表。

```bash
traceroute example.com
```
查看到目标地址经过的网络路径，需要系统已安装 `traceroute`。

## 压缩和解压

```bash
tar -czf logs.tar.gz logs
```
将 `logs` 目录打包并使用 gzip 压缩。

```bash
tar -xzf logs.tar.gz
```
解压 `.tar.gz` 文件。

```bash
zip -r logs.zip logs
```
将 `logs` 目录压缩为 zip 文件。

```bash
unzip logs.zip
```
解压 zip 文件。

## 磁盘和系统信息

```bash
df -h
```
查看磁盘分区使用情况，以易读单位显示。

```bash
du -sh logs
```
查看 `logs` 目录占用空间大小。

```bash
free -h
```
查看内存使用情况。

```bash
uname -a
```
查看系统内核和架构信息。

```bash
cat /etc/os-release
```
查看 Linux 发行版信息。

```bash
date
```
查看当前系统时间。

```bash
uptime
```
查看系统运行时长和负载。

## 服务管理

以下命令要求 systemd 正在运行，并且已安装 `nginx` 对应服务单元。`systemctl status` 中 `Loaded` 表示是否加载单元，`Active` 表示运行状态，`Main PID` 是主进程 ID；`enabled` 表示启用开机启动，不代表当前正在运行。

```bash
systemctl status nginx
```
查看 `nginx` 服务状态。

```bash
sudo systemctl start nginx
```
启动 `nginx` 服务。

```bash
sudo systemctl stop nginx
```
停止 `nginx` 服务。

```bash
sudo systemctl restart nginx
```
重启 `nginx` 服务。

```bash
sudo systemctl enable nginx
```
设置 `nginx` 服务开机自启，不会立即启动；同时启用并启动可用 `sudo systemctl enable --now nginx`。

```bash
sudo systemctl disable nginx
```
取消 `nginx` 服务开机自启，不会立即停止已运行的服务。

```bash
journalctl -u nginx
```
查看该服务写入 systemd journal 的日志；Nginx 的访问和错误日志也可能写在独立文件中，应以实际配置为准。读取完整日志可能需要权限。

```bash
journalctl -u nginx -f
```
实时查看 `nginx` 服务日志。

## 包管理

```bash
sudo apt update
```
更新 Debian/Ubuntu 系统的软件包索引。

```bash
sudo apt install nginx
```
在 Debian/Ubuntu 系统中安装 `nginx`。

```bash
sudo apt remove nginx
```
在 Debian/Ubuntu 系统中卸载 `nginx`。

```bash
sudo dnf install nginx
```
在使用 DNF 的 Fedora/RHEL 系发行版中安装 `nginx`，前提是已启用的软件源提供该包。旧环境可能使用 `yum`，以系统实际版本为准。

```bash
sudo dnf remove nginx
```
在使用 DNF 的系统中卸载 `nginx`；卸载前检查受影响的软件包和服务。

## 环境变量

```bash
echo "$PATH"
```
查看 `PATH` 环境变量。

```bash
export APP_ENV=dev
```
设置当前 Shell 及之后启动的子进程可继承的环境变量，不会改变已运行服务的环境；只在本次会话设置，不持久保存。

```bash
unset APP_ENV
```
删除当前终端会话中的环境变量。

```bash
source ~/.bashrc
```
重新加载 Bash 配置文件。

## Python 项目

```bash
python3 --version
```
查看 Python 版本。

```bash
python3 -m venv .venv
```
在当前目录创建 Python 虚拟环境；Debian/Ubuntu 上若提示缺少 venv 支持，需按 Python 版本安装对应的 venv 软件包。

```bash
source .venv/bin/activate
```
激活当前目录下的 Python 虚拟环境。

```bash
python -m pip install -r requirements.txt
```
激活虚拟环境后，根据已有的 `requirements.txt` 安装依赖，确保 pip 属于当前 Python。

```bash
python app.py
```
运行 Python 脚本。

```bash
uvicorn app.app:app --host 127.0.0.1 --port 8067
```
启动已安装的 Uvicorn 服务。`app.app:app` 表示导入 `app.app` 模块中的 `app` 对象，必须按项目结构修改。`127.0.0.1` 只监听本机回环地址；要接受其他主机直接连接，可按需求绑定服务器地址或 `0.0.0.0`，还需检查防火墙、安全组及访问控制。`0.0.0.0` 是监听地址，浏览器访问应使用实际服务器地址。

这个命令以前台方式运行，按 `Ctrl+C` 停止；长期运行应交给 systemd 等进程管理工具。服务运行用户、工作目录、环境变量和 Python 解释器路径都需要在部署配置中明确。

## Git

```bash
git status
```
查看 Git 工作区状态。

```bash
git add .
```
暂存当前目录下的所有改动。

```bash
git commit -m "update notes"
```
提交暂存区改动。

```bash
git pull
```
获取远程提交并按 Git 配置合并或变基到当前分支，可能发生冲突；先检查工作区状态。

```bash
git push
```
推送本地提交到远程仓库。

## 帮助、路径与引号

```bash
man grep
grep --help
help cd
command -v python3
type cd
```

`man` 阅读手册，`--help` 查看支持该选项的程序帮助，`help` 查看 Bash 内建命令，`command -v` 查询命令解析结果，`type` 区分内建命令、别名和外部程序。`man` 中按 `/` 搜索、`n` 跳到下一处、`q` 退出。

```bash
cd "/path/to/my project"
printf '%s\n' "$HOME"
printf '%s\n' '$HOME'
```

双引号保留包含空格的参数，同时允许 `$HOME` 等变量展开；单引号保留字面内容。变量作为路径参数时通常应加双引号，例如 `ls "$HOME"`。未引用的 `*.log` 由 Shell 展开；Bash 默认在无匹配时保留原模式，不等于空列表。

## 管道与重定向

| 语法 | 用途 | 示例 |
| --- | --- | --- |
| `|` | 把左侧标准输出交给右侧标准输入 | `grep 'ERROR' app.log \| wc -l` |
| `>` | 标准输出写入文件，覆盖已有内容 | `ls -la > files.txt` |
| `>>` | 标准输出追加到文件 | `date >> run.log` |
| `2>` | 标准错误写入文件并覆盖 | `ls /path/to/dir 2> errors.log` |
| `2>&1` | 让标准错误指向当前标准输出位置 | `bash run.sh > run.log 2>&1` |
| `<` | 从文件读取标准输入 | `wc -l < app.log` |
| `&&` | 左侧成功时执行右侧 | `cd /srv/app && pwd` |
| `||` | 左侧失败时执行右侧 | `test -f app.log \|\| echo '日志不存在'` |

重定向从左到右处理，`> run.log 2>&1` 与 `2>&1 > run.log` 不等价。文件通常在程序启动前就被打开或截断，不要把输入文件同时作为 `>` 的输出目标。Bash 管道默认使用最后一个命令的退出码，必要时用 `set -o pipefail` 让管道反映上游失败。

```bash
grep -i 'error' app.log | tee errors.txt
```

`tee` 同时向屏幕和文件输出，默认覆盖文件，追加使用 `tee -a`。这条命令会将匹配日志写入 `errors.txt`。

## 文本统计与结构化数据

```bash
wc -l app.log
sort names.txt | uniq -c | sort -nr
cut -d ':' -f 1 /etc/passwd
awk '{print $1}' access.log
sed -n '1,20p' app.log
jq '.status' response.json
```

- `wc -l` 统计换行符数量，末尾没有换行符的最后一行不会另算一个换行。
- `uniq` 只合并相邻重复行，通常先排序；`uniq -c` 的第一列是次数。
- `cut` 按指定分隔符提取字段，`awk` 示例按空白分隔提取第一列，实际日志格式不同要相应调整。
- `sed -n` 示例只显示指定行，不修改源文件。
- `jq` 需要单独安装，输入必须是有效 JSON；示例读取顶层 `status` 字段。复杂 CSV 应使用支持引号和转义的 CSV 工具，不宜直接按逗号切分。

## 编辑文件与退出

```bash
nano /path/to/config.conf
vim /path/to/config.conf
```

选择系统已安装的编辑器。Nano 用 `Ctrl+O` 写入、回车确认文件名、`Ctrl+X` 退出；Vim 按 `i` 输入，按 `Esc` 回到普通模式，然后输入 `:w` 保存、`:q` 退出、`:wq` 保存退出或 `:q!` 放弃修改退出。修改服务配置前备份原文件，并使用该服务的配置检查命令验证。

## 远程连接与文件传输

```bash
ssh user@server.example.com
ssh -p 2222 user@server.example.com
scp -P 2222 ./app.tar.gz user@server.example.com:/srv/uploads/
rsync -av --dry-run ./dist/ user@server.example.com:/srv/app/
```

需要本机安装相应客户端，远端开放 SSH、允许该用户登录并具有目标目录权限。SSH 的端口选项是小写 `-p`，SCP 是大写 `-P`。首次连接时应核对服务器主机密钥指纹。

`scp` 示例从本地上传到远端；反向下载可将远端路径放在前面、本地目标放在后面。`rsync` 的 `--dry-run` 只预览，确认结果后去掉该选项才真正同步；`./dist/` 的末尾斜杠表示同步目录内容。此示例不删除远端多余文件，也不自动重启服务，通常需要远端安装 `rsync`。

## Bash 脚本基础

以下脚本展示参数、条件和循环的基本写法，可保存为 `.sh` 文件，按指定级别筛选已有日志：

```bash
#!/usr/bin/env bash
log_file="${1:-app.log}"

if [ ! -f "$log_file" ]; then
  printf '文件不存在：%s\n' "$log_file" >&2
  exit 1
fi

for level in INFO WARN ERROR; do
  printf '\n[%s]\n' "$level"
  grep -F -- "$level" "$log_file"
  result=$?
  # grep 的 1 表示未匹配到；大于 1 才表示本例需要中止的读取错误。
  if [ "$result" -gt 1 ]; then
    exit "$result"
  fi
done
```

`$1` 是第一个参数，`${1:-app.log}` 在参数未提供或为空时使用默认值；变量赋值的 `=` 两侧不加空格。`[ ... ]` 的括号内侧需要空格，`-f` 检查普通文件。

执行自己的脚本可用 `bash report.sh /path/to/app.log`；直接执行 `./report.sh` 还需要可执行权限及有效的首行解释器声明。包含 Bash 语法的脚本不要随意用 `sh` 或 `zsh` 运行。Windows 编辑的脚本应使用 LF 换行，避免解释器路径末尾出现 `\r`。

## 常见输出解读与部署排查

| 输出或状态 | 如何理解 |
| --- | --- |
| `ls -l` 的 `-rw-r--r--` | 首字符 `-` 是普通文件、`d` 是目录；之后每三位分别对应所有者、组、其他用户的读写执行权限 |
| 目录的 `r/w/x` | 分别涉及列出目录项、修改目录项、进入或遍历目录；目录可写不等于其中每个文件都可写 |
| `ps aux` 的 `USER/PID/%CPU/%MEM/COMMAND` | 运行用户、进程 ID、CPU/内存统计及命令；确认 PID 时同时核对命令和用户 |
| `ss` 的 `127.0.0.1:8067` | 只监听 IPv4 回环地址，远端不能直接连接 |
| `ss` 的 `0.0.0.0:8067` | 监听所有本地 IPv4 接口，不代表防火墙已放行 |
| `df -h` 的 `Avail/Use%` | 文件系统可用空间和使用率；与 `du` 的目录占用统计口径不同 |
| `free -h` 的 `available` | 估计可供新程序使用的内存；不能只用 `free` 列判断内存不足 |
| `systemctl` 的 `active (running)` / `failed` | 服务当前运行 / 启动或运行失败，后者需结合日志定位 |

部署时按“进程或服务状态 → 本机 HTTP 请求 → 监听地址 → 防火墙及云安全组 → 域名和反向代理”的顺序定位。`curl` 收到 HTTP 404/500 说明已获得 HTTP 响应，不代表业务正常；普通 `curl` 默认不因 HTTP 错误状态码返回失败，脚本需要时可用 `curl -f`。

```bash
journalctl -u nginx -n 100 --no-pager
journalctl -u nginx --since "1 hour ago"
sudo nginx -t
```

前两条查看近期 journal 日志，第三条验证已安装 Nginx 的配置；检查通过再按需要 reload/restart。修改 systemd 单元文件后用 `sudo systemctl daemon-reload` 让管理器重新读取单元，它不会自动重启应用。

更新前记录当前版本、配置和数据备份；更新后检查服务、日志和业务接口。回滚需要恢复兼容的程序与配置，数据库结构变更不能仅靠切回代码自动撤销。这里只列部署查询要点，具体命令应结合项目的运行方式。

## 参考文档

- [Bash 手册](https://www.gnu.org/s/bash/manual/bash.html)
- [systemctl 手册](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
- [Uvicorn 运行配置](https://uvicorn.dev/settings/)
