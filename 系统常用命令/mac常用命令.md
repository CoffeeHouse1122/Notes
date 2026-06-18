# mac 系统常用命令

> 适用于 macOS 终端，默认 shell 通常为 zsh。执行删除、格式化、权限修改等命令前，请先确认路径是否正确。

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

```bash
less file.txt
```

### 查看前几行或后几行

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

```bash
ifconfig
ipconfig getifaddr en0
```

### 测试网络连通性

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

```bash
curl -O https://example.com/file.zip
curl -L https://example.com
```

### 查看端口占用

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

```bash
top
```

### 结束进程

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

```bash
brew cleanup
```

## shell 配置

### 查看当前 shell

```bash
echo $SHELL
```

### 编辑 zsh 配置

```bash
vim ~/.zshrc
```

### 重新加载 zsh 配置

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

```bash
ls -la > files.txt
ls -la >> files.txt
```

### 管道组合

```bash
ps aux | grep node
cat app.log | grep error
```
