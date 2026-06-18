# Linux 常用命令

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
查看当前用户执行过的历史命令。

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
创建一个空文件，或更新已有文件的修改时间。

```bash
cp app.log backup/app.log
```
复制文件到指定位置。

```bash
cp -r app backup
```
递归复制目录及其中所有内容。

```bash
mv app.log logs/app.log
```
移动文件，也可以用于重命名文件。

```bash
rm app.log
```
删除指定文件。

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
find . -name "*.log"
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
以管理员权限执行命令。

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
修改文件的所有者和所属用户组。

## 进程和端口

```bash
ps aux
```
查看当前系统中的进程列表。

```bash
ps aux | grep python
```
查找包含 `python` 的进程。

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
根据进程 ID 结束进程。

```bash
kill -9 1234
```
强制结束指定进程。

```bash
pkill python
```
结束进程名匹配 `python` 的进程。

```bash
ss -tulnp
```
查看当前监听中的 TCP/UDP 端口及对应进程。

```bash
ss -tulnp | grep 8067
```
查看 `8067` 端口是否正在被占用。

```bash
lsof -i :8067
```
查看占用 `8067` 端口的进程，需要系统已安装 `lsof`。

## 网络请求

```bash
ping 127.0.0.1
```
测试网络连通性。

```bash
curl http://127.0.0.1:8067
```
发送 HTTP 请求并输出响应内容。

```bash
curl -I http://127.0.0.1:8067
```
只查看 HTTP 响应头。

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
设置 `nginx` 服务开机自启。

```bash
sudo systemctl disable nginx
```
取消 `nginx` 服务开机自启。

```bash
journalctl -u nginx
```
查看 `nginx` 服务日志。

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
sudo yum install nginx
```
在 CentOS/RHEL 系统中安装 `nginx`。

```bash
sudo yum remove nginx
```
在 CentOS/RHEL 系统中卸载 `nginx`。

## 环境变量

```bash
echo $PATH
```
查看 `PATH` 环境变量。

```bash
export APP_ENV=dev
```
设置当前终端会话中的环境变量，关闭终端后失效。

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
在当前目录创建 Python 虚拟环境。

```bash
source .venv/bin/activate
```
激活当前目录下的 Python 虚拟环境。

```bash
pip install -r requirements.txt
```
根据 `requirements.txt` 安装依赖。

```bash
python app.py
```
运行 Python 脚本。

```bash
uvicorn app.app:app --host 127.0.0.1 --port 8067
```
启动 FastAPI/Uvicorn 服务并监听 `8067` 端口。

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
拉取远程仓库的最新代码。

```bash
git push
```
推送本地提交到远程仓库。
