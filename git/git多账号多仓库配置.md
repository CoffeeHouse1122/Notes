## git多账号多仓库配置

1. 首先进入.ssh文件夹，windows一般在`C:\Users\用户名\.ssh`。
```bash
cd ~/.ssh
```

2. 生成密钥，生成两个文件： `id_rsa_xxx` 和 `id_rsa_xxx.pub`，`xxx`用于区分不同密钥，将后缀为`.pub`文件的公钥复制到对应的代码服务器ssh密钥处。
```bash
ssh-keygen -t rsa -f id_rsa_xxx -C "yourmail@xxx.com"
```
3. 添加privateKey 到本地
```bash
ssh-add id_rsa_xxx
```
- 在添加过程中可能遇到如下问题，执行如下命令即可
```bash
# error Could not open a connection to your authentication agent.
ssh-agent bash
# 添加完成后可通过下面的命令查看
ssh-add -l
# 添加错了可以通过ssh-add -d 删除
```

4. 在.ssh文件夹下创建`config`文件(无后缀)，输入以下内容并保存文件。
- 注意： host 和 hostname 尽量保持一致，否则在使用上容易出现问题
```bash
#osOne
# Host hostName 的别名
Host xxx.com
# 服务器地址
HostName xxx.com
# 用户：可配置为邮箱或者用户名
User zhaopeng.qiu
# 对应服务器的认证文件
IdentityFile ~/.ssh/id_rsa_gitlab

#osTwo
Host github.com
HostName github.com
User CoffeeHouse1122
IdentityFile ~/.ssh/id_rsa_github
```

5. 测试连接。
```bash
ssh -T git@Host or HostName
```
- 测试github仓库时遇见这样的错误，是因为缺少`known_hosts`文件。
```bash
The authenticity of host 'github.com (20.205.243.166)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
```
- 此时选择`yes`回车之后即生成缺少的`known_hosts`文件。
```bash
Are you sure you want to continue connecting (yes/no/[fingerprint])?  // 输入yes，回车
```

6. 配置用户信息
```bash
git的配置分为三个级别
system-----系统级别，可以理解为你的电脑账户信息
global-----全局级别，如果配置了，所有项目共用的账户信息
local------项目级别，单独项目配置的账户信息

这三个级别的优先级为 local > global > system

配置global级别的账户信息，执行下面命令
git config --global user.name "xxxx"
git config --global user.email "xxxx"

验证
git config --global --list

仅为每个项目单独的配置local级别的账户信息，执行下面命令

git config --local user.name "xxxx"
git config --local user.email "xxxx"

验证
git config --local --list

```