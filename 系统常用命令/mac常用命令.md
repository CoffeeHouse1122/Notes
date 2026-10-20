# mac 系统常用命令

> 适用于 macOS 终端，交互语法以 Zsh 为准。每个代码块都是独立示例，不要从头连续执行；路径、文件名、PID 和网络接口需按实际情况替换。执行删除、权限修改、关机等操作前确认目标及影响，详见 [使用说明](./README.md)。

## 目录与文件

### 查看当前位置

```bash
pwd
```

### 查看目录内容

```bash
ls
ls -la
ls -lh
```

### 切换目录

```bash
cd /path/to/dir
cd ~
cd ..
cd -
```

### 创建目录

```bash
mkdir demo
mkdir -p a/b/c
```

### 创建文件

```bash
touch file.txt
```

### 复制文件或目录

源文件或目录需存在，文件目标的父目录需存在；已有目标可能被覆盖。复制目录时，目标不存在与目标已是目录的结果不同：后者通常在目标目录中再放入源目录。

```bash
cp source.txt target.txt
cp -R source_dir target_dir
```

### 移动或重命名

```bash
mv old.txt new.txt
mv file.txt /path/to/dir/
```

### 删除文件或目录

删除通常不进入废纸篓。`-r` 递归删除目录，`-f` 不询问确认并忽略不存在的目标；这是按需查询的操作，不能当作普通查看命令执行。删除单个文件需要确认时可用 `rm -i file.txt`。

```bash
rm file.txt
rm -r dir
rm -rf dir
```

## 查看文件内容

### 直接输出

```bash
cat file.txt
```

### 分页查看

空格翻页，`/` 输入搜索词，`n` 跳到下一处，`q` 退出。

```bash
less file.txt
```

### 查看前几行或后几行

`tail -f` 持续查看新增内容，按 `Ctrl+C` 停止跟踪，不会停止写入日志的程序。

```bash
head file.txt
head -n 20 file.txt
tail file.txt
tail -n 20 file.txt
tail -f app.log
```

## 查找与搜索

### 按文件名查找

```bash
find . -name "*.md"
find /path/to/dir -type f -name "*.js"
```

### 按内容搜索

```bash
grep "keyword" file.txt
grep -R "keyword" .
grep -Rni "keyword" .
```

### 使用 Spotlight 命令搜索

```bash
mdfind "keyword"
mdfind "kMDItemFSName == '*.pdf'"
```

## 系统信息

### 查看 macOS 版本

```bash
sw_vers
```

### 查看硬件信息

```bash
system_profiler SPHardwareDataType
```

### 查看 CPU 架构

```bash
uname -m
arch
```

### 查看当前用户

```bash
whoami
id
```

### 查看环境变量

```bash
env
echo $PATH
```

## 磁盘与空间

### 查看磁盘使用情况

```bash
df -h
```

### 查看目录占用空间

`*` 默认不包含隐藏文件；Zsh 默认在通配符没有任何匹配时报告 `no matches found`。需要统计整个当前目录（含隐藏内容）可用 `du -sh .`。

```bash
du -sh *
du -sh /path/to/dir
```

### 查看挂载磁盘

```bash
diskutil list
```

### 弹出磁盘

```bash
diskutil eject /Volumes/DISK_NAME
```

## 网络命令

### 查看 IP 地址

`en0` 是示例接口，不保证是当前使用的 Wi-Fi 或有线接口。可先运行 `networksetup -listallhardwareports` 查看硬件端口和设备名，再选择实际接口；未配置 IPv4 地址时可能没有输出。

```bash
ifconfig
ipconfig getifaddr en0
```

### 测试网络连通性

不带 `-c` 的 `ping` 通常持续运行，按 `Ctrl+C` 停止。ICMP 不响应可能是网络策略造成，不等于 HTTP 服务一定不可用。

```bash
ping baidu.com
ping -c 4 google.com
```

### 查看域名解析

```bash
nslookup example.com
dig example.com
```

### 下载文件

`-O` 按 URL 中的文件名保存，`-L` 跟随重定向；真实下载可能需要同时使用 `curl -fLO URL`。`example.com/file.zip` 仅是示例地址，不保证文件存在；`-f` 让 HTTP 错误状态导致失败。

```bash
curl -O https://example.com/file.zip
curl -L https://example.com
```

### 查看端口占用

`-nP` 禁用主机名及端口名称解析，`LISTEN` 表示 TCP 监听状态。查看其他用户的进程可能需要额外权限；`127.0.0.1` 表示回环监听，不等于其他电脑可以访问。

```bash
lsof -i :3000
lsof -nP -iTCP -sTCP:LISTEN
```

## DNS 缓存

### 刷新 DNS

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

## 进程管理

### 查看进程

```bash
ps aux
ps aux | grep node
```

### 实时查看系统资源

按 `q` 退出；macOS 的 `top` 字段和选项与 Linux 不完全一致，不要直接套用 Linux 的全部参数。

```bash
top
```

### 结束进程

`PID` 和 `process_name` 要替换为真实值。`kill` 默认发送 SIGTERM，请求退出但不保证立即结束；`kill -9` 无法让程序正常清理。`pkill` 可能匹配多个进程，先核对对象，优先使用应用自身或服务管理工具的停止方式。

```bash
kill PID
kill -9 PID
pkill process_name
```

## 应用与系统操作

### 打开文件或目录

```bash
open file.txt
open .
open /Applications
```

### 使用指定应用打开

```bash
open -a "Visual Studio Code" .
open -a Safari https://www.apple.com
```

### 重启 Finder

```bash
killall Finder
```

### 重启 Dock

```bash
killall Dock
```

### 关机与重启

以下命令分别会立即发起关机和重启，会中断当前工作，不作为普通命令尝试执行。

```bash
sudo shutdown -h now
sudo shutdown -r now
```

## 剪贴板

### 复制到剪贴板

```bash
echo "hello" | pbcopy
cat file.txt | pbcopy
```

### 读取剪贴板

```bash
pbpaste
```

## 截图

### 保存全屏截图

```bash
screencapture ~/Desktop/screen.png
```

### 延迟 5 秒截图

```bash
screencapture -T 5 ~/Desktop/screen.png
```

### 交互式选择区域

```bash
screencapture -i ~/Desktop/area.png
```

## 权限与所有者

### 查看权限

```bash
ls -l
```

### 修改权限

```bash
chmod 755 script.sh
chmod +x script.sh
```

### 修改所有者

```bash
sudo chown user:group file.txt
sudo chown -R user:group dir
```

## 压缩与解压

### zip 压缩

```bash
zip file.zip file.txt
zip -r dir.zip dir
```

### unzip 解压

```bash
unzip file.zip
unzip file.zip -d target_dir
```

### tar 压缩与解压

```bash
tar -czf archive.tar.gz dir
tar -xzf archive.tar.gz
```

## Homebrew

以下命令需要已安装 Homebrew，并且 `brew` 在 PATH 中。Homebrew 是第三方包管理工具，不是 macOS 自带命令。

### 查看版本

```bash
brew --version
```

### 更新 Homebrew

```bash
brew update
```

### 搜索软件包

```bash
brew search nginx
```

### 安装软件包

```bash
brew install git
```

### 卸载软件包

```bash
brew uninstall git
```

### 查看已安装软件包

```bash
brew list
```

### 清理缓存

清理旧版本及符合清理规则的下载缓存等内容，不代表清空所有缓存。可先用 `brew cleanup -n` 查看计划清理的内容。

```bash
brew cleanup
```

## shell 配置

### 查看配置的登录 Shell 与当前 Shell

`$SHELL` 通常反映账户配置的登录 Shell，不保证是当前正在执行命令的 Shell。

```bash
echo $SHELL
```

在 Zsh 中用 `echo "$ZSH_VERSION"` 查看版本，在 Bash 中用 `echo "$BASH_VERSION"`。从 Zsh 临时进入 Bash 后，`$SHELL` 仍可能保持原来的值。

可使用以下命令查看当前 Shell 进程：

```bash
ps -p $$ -o comm=
```

### 编辑 zsh 配置

```bash
vim ~/.zshrc
```

### 重新加载 zsh 配置

这会在当前 Zsh 会话重新执行配置文件内容，不只是读取设置；文件需存在且内容应由自己确认。不要在 Bash 中直接加载 Zsh 配置。

```bash
source ~/.zshrc
```

### 查看命令位置

```bash
which git
whereis git
```

## Vim 简明操作

### 打开文件

```bash
vim file.txt
```

### 常用按键

```text
i      进入插入模式
Esc    返回普通模式
:w     保存
:q     退出
:wq    保存并退出
:q!    不保存强制退出
```

## 常用组合示例

### 查看最近修改的文件

```bash
ls -lt
```

### 统计文件行数

```bash
wc -l file.txt
```

### 查看命令历史

```bash
history
history | grep git
```

### 将命令输出写入文件

`>` 覆盖目标文件，`>>` 追加；不要同时把同一个文件用作输入与覆盖输出。

```bash
ls -la > files.txt
ls -la >> files.txt
```

### 管道组合

`|` 将前一个命令的标准输出传给后一个命令。`ps ... | grep ...` 也可能显示搜索命令自身；直接筛选文件可简化为 `grep 'error' app.log`。

```bash
ps aux | grep node
cat app.log | grep error
```

## 帮助、引用与条件执行

macOS 的基础工具通常用 `man` 查帮助，不保证支持 GNU 工具常见的 `--help`。单引号保留字面内容，双引号允许变量展开；路径和变量包含空格时加引号。

Zsh 交互中常用的 `|`、`>`、`>>`、`2>`、`2>&1`、`&&`、`||` 与 Bash 的基本用法相近，详见 [Linux 管道与重定向](./Linux常用命令.md#管道与重定向)。`echo $?` 查看上一条命令退出码，应立即执行；`0` 通常表示成功，其他数值依工具定义。

```bash
man ls
man zsh
command -v git
cd "/path/to/my project"
printf '%s\n' "$HOME"
printf '%s\n' '$HOME'
```

## macOS、Linux 与脚本的区别

- macOS 自带的 `sed`、`date`、`stat` 等工具与 Linux 上常见的 GNU 版本选项有差异。例如原地修改文件时 macOS 的 `sed -i` 需要提供备份后缀参数，不能直接复制所有 Linux 命令行。
- macOS 使用 launchd 管理服务，不能直接使用 Linux 的 `systemctl`。Homebrew 安装的部分服务可用 `brew services list` 查看，具体启动停止方式以软件说明为准。
- `ssh`、`scp` 可用于远程连接和传输，基本示例见 [远程连接与文件传输](./Linux常用命令.md#远程连接与文件传输)。`rsync` 的版本和可用参数需先检查。
- Zsh 与 Bash 在数组下标、未引用变量展开和无匹配通配符的处理上不同。日常工具命令可以共用，但脚本不要假定完全兼容。
- Bash 脚本明确用 `bash script.sh`，Zsh 脚本用 `zsh script.zsh`。系统提供的 Bash 版本可能不支持较新语法，先用 `bash --version` 核对；直接执行脚本还需有效解释器声明和执行权限。

## 参考文档

- [Zsh 官方手册](https://zsh.sourceforge.io/Doc/Release/)
- [Homebrew 命令手册](https://docs.brew.sh/Manpage)
- 系统工具优先以本机 `man` 手册为准，以匹配当前 macOS 版本。
