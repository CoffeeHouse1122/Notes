# 软件工具命令

按软件整理开发和部署中常用的命令，包含参数说明、使用条件和注意事项。各代码块用于按需查询，不是应当连续执行的脚本，不包含配套练习。

## 文档目录

| 文档 | 内容 |
| --- | --- |
| [Docker 常用命令](./Docker常用命令.md) | 镜像、容器、日志、网络、数据卷、镜像仓库和清理 |
| [Docker Compose 常用命令](./DockerCompose常用命令.md) | 项目配置、服务启动停止、更新、日志、环境变量及持久化 |
| [系统常用命令](../系统常用命令/README.md) | Linux、PowerShell、CMD、macOS 的基础操作与 Shell 语法 |

## Docker 与 Compose 的区别

Docker CLI 是操作 Docker 的客户端，负责发送镜像、容器、网络和数据卷等管理请求；Docker 引擎实际管理这些资源。Compose 使用同一套 Docker 基础能力，根据 `compose.yaml` 统一管理一个项目的服务和配套资源，也可以只管理一个服务。

| 概念 | 含义 |
| --- | --- |
| 镜像（image） | 创建容器所用的文件系统和运行配置模板 |
| 容器（container） | 基于镜像创建的运行实例，具有自身状态和可写层 |
| 数据卷（volume） | Docker 管理的持久化存储，生命周期可独立于容器 |
| 绑定挂载（bind mount） | 将 Docker 主机上的指定文件或目录映射进容器 |
| 网络（network） | 连接容器，提供容器间通信等能力 |
| Compose 服务（service） | 配置中一个应用组件的定义，例如 `api`、`redis`，可对应一个或多个容器 |
| Compose 项目（project） | 一组服务及其网络、卷等资源的管理范围 |
| Context | Docker CLI 使用的连接配置，可能指向本机或远端引擎 |

Docker 与 Compose 的关系和命令入口可查阅 [Docker CLI](https://docs.docker.com/reference/cli/docker/) 和 [Compose CLI](https://docs.docker.com/reference/cli/docker/compose/) 官方参考。

## 使用条件

- 本文以 Linux 容器为主。Windows/macOS 上通常通过 Docker Desktop 使用 Linux 容器；Windows 容器的镜像、路径和可用参数不同。
- 先确认安装了 Docker CLI，且目标 Docker 引擎已运行、当前用户有访问权限。Compose 还需要可用的插件，检查命令为 `docker compose version`。
- 使用带空格的 `docker compose` 命令。旧资料中的 `docker-compose` 是另一种历史入口，不要假设两者安装情况和参数完全相同。
- 操作前用 `docker context show`、`docker context ls` 确认目标；显式 `--context`、`--host` 及相关环境变量也可能影响连接。删除、重建和清理发生在目标引擎上，不一定是眼前这台电脑。
- `my-api:1.0`、`api`、`app-data`、`app-net`、`registry.example.com` 等是示例值，需替换为实际资源。它们不表示本机已经存在对应镜像、容器或仓库。
- 拉取、推送和联网构建需要网络可达及必要的仓库权限。镜像还要支持目标主机的操作系统和 CPU 架构。
- 各命令的可用参数以本机 `docker 子命令 --help` 为准。文档于 2026-10-20 整理，并用本机 Docker CLI 29.7.2、Compose 5.4.0 的帮助信息核对部分选项；不表示这些是最低版本要求。

## 跨 Shell 使用

文档中的通用命令尽量写成单行，可在 Bash、Zsh、PowerShell 或 CMD 中输入。真正的差异通常发生在路径、引号、变量、管道和重定向上：

| 内容 | 说明 |
| --- | --- |
| 续行符 | Bash/Zsh 使用反斜杠，PowerShell 使用反引号，CMD 使用 `^`；不要混用 |
| 文件路径 | Windows 与 Linux 路径不同，包含空格时对整个参数加引号 |
| 环境变量 | Bash/Zsh 的 `$NAME`、PowerShell 的 `$env:NAME`、CMD 的 `%NAME%` 不可互换 |
| 容器内路径 | 本文 Linux 容器使用 `/app`、`/data` 等路径，与 Windows 主机盘符路径不同 |
| 退出码 | 外部 Docker 命令后，Bash/Zsh 用 `echo $?`，PowerShell 用 `$LASTEXITCODE`，CMD 在下一行用 `echo %ERRORLEVEL%` |

Docker 参数应放在对应位置，例如 `docker run [Docker 选项] 镜像 [容器内命令及参数]`。镜像名之后的 `-p` 不再是 Docker 的端口映射选项。

## 影响范围与数据

查看状态、日志和帮助一般不改变容器；启动、停止、重建、推送和清理会修改实际状态。删除容器会丢弃其可写层，删除数据卷会删除其中数据。持久化不是备份，镜像归档也不包含数据库卷。

管理 Docker 的权限可能允许访问主机资源；不要为解决普通权限问题随意授予 `--privileged` 或挂载 Docker socket。不要把实际密码和访问令牌写进示例、Git 仓库、命令历史或共享的 `inspect/config` 输出。

Compose 管理的容器优先通过 Compose 调整并重新应用配置，避免手动重建后与配置文件不一致。
