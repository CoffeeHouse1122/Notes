# Docker 常用命令

> 阅读前先确认 [环境、占位值与 Shell 差异](./README.md)。本文命令针对 Linux 容器，代码块是独立查询示例，不是连续部署步骤。Compose 项目另见 [Docker Compose 常用命令](./DockerCompose常用命令.md)。

## 目录

- [版本、帮助与目标引擎](#版本帮助与目标引擎)
- [镜像查询与拉取](#镜像查询与拉取)
- [构建镜像](#构建镜像)
- [创建并运行容器](#创建并运行容器)
- [查看容器与运行状态](#查看容器与运行状态)
- [启动、停止、重启和删除](#启动停止重启和删除)
- [日志、诊断与资源使用](#日志诊断与资源使用)
- [在容器内执行命令](#在容器内执行命令)
- [文件复制](#文件复制)
- [数据卷与绑定挂载](#数据卷与绑定挂载)
- [网络与端口](#网络与端口)
- [仓库登录与推送](#仓库登录与推送)
- [镜像保存与加载](#镜像保存与加载)
- [清理资源](#清理资源)
- [常见问题](#常见问题)

## 版本、帮助与目标引擎

```text
docker --version
docker version
docker info
docker --help
docker run --help
docker context show
docker context ls
```

- `--version` 查看客户端版本；`version` 同时尝试读取 Client 和 Server 版本。
- `info` 查看引擎信息，需要能连接引擎；只有客户端正常不代表服务端可用。
- `context show` 查看当前 Context，`context ls` 列出连接配置；带 `*` 的是当前选择。

```text
docker --context production ps
docker context use desktop-linux
```

以上 Context 名称仅为示例，必须已存在。`--context` 只为这次调用指定连接；`context use` 会改变后续命令默认使用的连接。使用远端引擎时尤其要核对操作目标。

## 镜像查询与拉取

```text
docker images
docker image ls --digests
docker pull nginx:alpine
docker image inspect my-api:1.0
docker image history my-api:1.0
```

| 命令或参数 | 用途与条件 |
| --- | --- |
| `images` / `image ls` | 查看目标引擎的本地镜像，不是仓库中的全部镜像 |
| `--digests` | 显示可用的内容摘要，便于识别镜像内容 |
| `pull 仓库:标签` | 从仓库下载镜像，需要网络及必要权限，不更新已有容器 |
| `image inspect` | 查看已有镜像的架构、配置等信息 |
| `image history` | 查看镜像构建层的历史摘要，不等同于完整源代码或 Dockerfile |

`nginx:alpine` 是公开镜像示例；标签可以指向新内容，并非永久固定版本。部署需要可追溯时记录版本及镜像 digest；省略标签通常使用 `latest`，它不保证对应语义上的最新稳定版。

## 构建镜像

```text
docker build -t my-api:1.0 .
docker build -f docker/Dockerfile -t my-api:1.0 .
docker build --pull --no-cache -t my-api:1.0 .
```

| 参数 | 含义 |
| --- | --- |
| `-t my-api:1.0` | 给构建结果指定镜像名和标签 |
| `-f docker/Dockerfile` | 指定 Dockerfile；不写时通常在构建上下文根目录找 `Dockerfile` |
| 最后的 `.` | 构建上下文是当前目录，不是可以随意省略的标点 |
| `--pull` | 尝试获取构建所引用镜像的新版本 |
| `--no-cache` | 不使用构建步骤缓存；不等于自动更新所有软件源或基础镜像 |

需要有效 Dockerfile、构建器及上下文文件。`COPY`/`ADD` 的本地来源受构建上下文约束，不能任意读取上下文之外的路径。用 `.dockerignore` 排除依赖目录、日志、Git 元数据和不应进入上下文的秘密文件。

构建得到的新镜像不会替换已运行的容器；需按新镜像重新创建容器。密码、令牌不要通过 Dockerfile 的 `ARG/ENV` 当作秘密传递；确有构建鉴权需求时使用构建器支持的 secret 功能。

参考：[构建命令](https://docs.docker.com/reference/cli/docker/image/build/)、[构建上下文](https://docs.docker.com/build/concepts/context/)。

## 创建并运行容器

```text
docker run -d --name api -p 127.0.0.1:8080:3000 --restart unless-stopped my-api:1.0
```

条件：`my-api:1.0` 已存在或可拉取，`api` 名称未被其他容器占用，主机 `8080` 可绑定，镜像启动的应用在容器内监听 `0.0.0.0:3000` 等可从容器网络访问的地址。

| 参数 | 含义与注意事项 |
| --- | --- |
| `-d` | 后台运行，返回容器 ID；不代表应用已就绪 |
| `--name api` | 指定容器名，停止的容器也会保留名称 |
| `-p 127.0.0.1:8080:3000` | 将主机 IPv4 回环地址的 `8080` 映射到容器 `3000`，默认 TCP |
| `-p 8080:3000` | 省略主机 IP 时通常发布到所有主机地址，扩大访问范围 |
| `-e APP_ENV=production` | 设置容器环境变量；此例 `APP_ENV` 表示应用环境，只有应用读取它才生效 |
| `--env-file app.env` | 从实际存在的文件读取容器环境变量，文件格式与 Compose 插值规则不要混淆 |
| `--restart unless-stopped` | 异常或引擎重启后按策略恢复；手动停止的容器保持停止，不是健康检查修复机制 |
| `--cpus 1.5` | 限制可使用的 CPU 配额，不是指定某个 CPU 核心 |
| `--memory 512m` | 设置内存上限；过低可能导致进程被 OOM 杀死 |
| `--network app-net` | 加入已存在的网络 |
| `--mount ...` | 挂载存储，详见后文 |
| `-i`、`-t` | 分别保持标准输入打开、分配终端；交互常合写 `-it` |
| `--rm` | 退出后移除容器及关联匿名卷，不移除具名卷；不能与重启策略同时使用 |

容器依靠主进程持续运行：主进程退出，容器就停止。Dockerfile 中的 `EXPOSE` 不会自动向主机发布端口。容器内部只监听 `127.0.0.1` 的应用通常无法通过上述端口映射访问。

参数以 [docker run 官方参考](https://docs.docker.com/reference/cli/docker/container/run/) 为准。

## 查看容器与运行状态

```text
docker ps
docker ps -a
docker ps --filter status=exited
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
docker port api
```

`-a` 包括停止的容器；`--filter` 筛选结果；`--format` 控制显示列，不改变容器。

| 输出 | 含义 |
| --- | --- |
| `Up` | 容器主进程在运行，不一定能提供业务服务 |
| `Exited (0)` | 主进程退出码为 0，可能是正常完成的一次性任务 |
| `Exited (非零)` | 需要结合日志、退出码及 OOM 状态判断 |
| `Restarting` | 正在按策略重启，反复出现通常需要排查启动失败 |
| `healthy` / `unhealthy` | 已配置健康检查时的检查结果，未配置则不会自动获得这类验证 |
| `127.0.0.1:8080->3000/tcp` | 主机地址和端口映射到容器端口 |
| 单独的 `3000/tcp` | 不能据此认定端口已经发布到主机 |

## 启动、停止、重启和删除

```text
docker start api
docker stop --timeout 30 api
docker restart --timeout 30 api
docker rm api
```

| 操作 | 使用条件及影响 |
| --- | --- |
| `run` | 从镜像创建新容器；重复同名运行会冲突 |
| `start` | 启动已经存在的停止容器，沿用创建时配置 |
| `stop --timeout 30` | 请求停止并等待最多 30 秒，超过时间后可强制终止 |
| `restart` | 重启已有容器，不自动应用新镜像或新的创建参数 |
| `rm` | 删除已停止容器，丢弃可写层；默认不删除具名卷 |

```text
docker kill api
docker rm -f api
```

上述两条用于明确需要强制操作的场景：默认强制终止主进程，第二条还删除容器。可能中断写入或丢失未持久化内容，应先使用应用正常停机方式或 `stop`。Compose 管理的服务优先用 Compose 操作。

## 日志、诊断与资源使用

```text
docker logs --tail 100 api
docker logs -f --since 30m --timestamps api
docker inspect api
docker inspect --format "{{json .State}}" api
docker stats --no-stream api
docker top api
docker system df
docker system df -v
```

- `--tail 100` 限制末尾行数；`--since 30m` 查看最近半小时；`--timestamps` 显示时间戳；`-f` 持续跟踪，用 `Ctrl+C` 退出，不停止容器。
- `logs` 主要读取容器标准输出和标准错误，结果还受日志驱动和保留策略影响。应用只写内部文件时，不能假设日志会出现在这里。
- `inspect` 的 `State.ExitCode`、`State.OOMKilled`、`State.Error` 和 `State.Health` 可辅助定位故障；健康字段是否存在取决于配置。
- `inspect` 还可能包含环境变量、挂载路径等信息，分享前检查敏感内容。
- `stats` 默认实时刷新，`--no-stream` 只输出一次；`top` 查看容器中的进程。
- `system df` 查看引擎存储占用，`-v` 展示详细信息；共享镜像层使各行大小不宜简单相加。

应用标为 `unhealthy` 不会单凭 Docker 重启策略自动重启。需要结合业务健康检查、日志、资源和实际进程退出情况处理。

参考：[日志命令](https://docs.docker.com/reference/cli/docker/container/logs/)。

## 在容器内执行命令

```text
docker exec -it api sh
docker exec api node --version
docker exec -w /app api ls -la
```

`exec` 在已有运行中容器启动一个额外进程。`-w` 设置此次命令的容器内工作目录，`-u 用户或UID` 可指定执行身份；命令及其依赖必须存在于镜像中。

镜像可能没有 `bash`，也可能连 `sh` 都没有；不要把“可执行文件不存在”误判为容器没启动。在通过 `exec` 新开的 Shell 中执行 `exit`，只结束这次 Shell 会话。自动化或管道输入通常不要加 `-t`，需要输入时保留 `-i`。

`docker attach api` 连接的是容器主进程的输入输出，不是新开 Shell；按 `Ctrl+C` 可能影响主进程，查看日志优先用 `logs`。

参考：[exec 命令](https://docs.docker.com/reference/cli/docker/container/exec/)。

## 文件复制

```text
docker cp api:/app/logs/error.log ./error.log
docker cp ./config.json api:/app/config.json
```

第一条从容器复制到本地，第二条反向复制；命令左右两侧决定方向。源文件和目标父目录需存在，复制可能覆盖目标文件，运行或停止的容器都可以使用。

直接复制配置不会自动触发应用重载，写到容器可写层的修改也不会进入原镜像。正式配置应通过镜像构建或挂载维护；复制仍在写入的数据库文件不保证备份一致。

## 数据卷与绑定挂载

```text
docker volume ls
docker volume create app-data
docker volume inspect app-data
docker run -d --name api-data --mount type=volume,source=app-data,target=/app/data my-api:1.0
```

具名卷 `app-data` 由 Docker 管理，容器删除后可继续保留；应用必须实际把需要持久化的数据写到 `/app/data`，并拥有读写权限。卷不是自动备份，存储在别处的数据仍可能丢失。

以下绑定挂载命令是不同主机环境的备选写法；执行前确认源目录存在：

```bash
docker run -d --name web-files --mount type=bind,source=/srv/site,target=/usr/share/nginx/html,readonly nginx:alpine
```

Linux 主机将 `/srv/site` 只读映射到容器网页目录。

```powershell
docker run -d --name web-files --mount "type=bind,source=F:\Sites\demo,target=/usr/share/nginx/html,readonly" nginx:alpine
```

Windows Docker Desktop 场景使用实际 Windows 路径，并需允许 Docker 访问源目录。

| 选项 | 说明 |
| --- | --- |
| `type=volume` / `type=bind` | Docker 数据卷 / 主机路径 |
| `source` | 卷名或主机源路径 |
| `target` | 容器内绝对路径 |
| `readonly` | 挂载只读，不允许通过该挂载写入 |

绑定挂载的源路径属于引擎所在主机；连接远程引擎不能直接挂载客户端电脑文件。挂载会遮住容器目标目录原来的内容。常规 `--mount type=bind` 在源路径不存在时报错；`-v` 的绑定挂载写法可能自动创建目录，文件路径写错时容易因此产生误解。

参考：[数据卷](https://docs.docker.com/engine/storage/volumes/)、[绑定挂载](https://docs.docker.com/engine/storage/bind-mounts/)。

## 网络与端口

```text
docker network ls
docker network create app-net
docker network inspect app-net
docker network connect app-net api
docker network disconnect app-net api
```

`create` 默认创建本机用户定义的 bridge 网络；`connect` 把已有容器加入网络，`disconnect` 会中断对应网络连接。同一用户定义网络中的容器通常可按容器名或网络别名访问。

容器访问另一个容器时使用目标容器名和容器端口，例如 `redis:6379`；容器里的 `localhost` 默认指自己。`-p` 用于从主机外部或主机访问容器，不是同一网络中容器互访的必要条件。

`host.docker.internal` 常用于 Docker Desktop 中容器访问主机服务，不能假设所有原生 Linux 环境默认提供同名解析。

## 仓库登录与推送

```text
docker login registry.example.com
docker tag my-api:1.0 registry.example.com/team/my-api:1.0
docker push registry.example.com/team/my-api:1.0
docker logout registry.example.com
```

仓库地址和命名空间需替换，推送前确保目标仓库和权限正确。`tag` 增加镜像引用，不会重新构建镜像；`push` 会上传镜像供有权限的人拉取，推送前确认镜像未包含秘密文件。

登录凭据的保存取决于凭据助手配置。自动化可使用 `--password-stdin` 从可信秘密来源读取令牌，避免把密码作为命令行参数或写入提交文件。

参考：[登录命令](https://docs.docker.com/reference/cli/docker/login/)。

## 镜像保存与加载

```text
docker save -o my-api-1.0.tar my-api:1.0
docker load -i my-api-1.0.tar
```

`-o` 指定归档输出文件，`-i` 指定输入文件；输出位置需要空间与写权限。使用工具参数可避免不同 Shell 的二进制重定向差异。

镜像归档不包含运行容器的新写入、数据卷或部署配置。`docker export/import` 操作容器文件系统快照，不能代替保留镜像层与配置的 `save/load`；数据库备份应使用数据库自身支持的一致性备份方式。

参考：[save 命令](https://docs.docker.com/reference/cli/docker/image/save/)。

## 清理资源

先用 `docker system df -v`、`docker ps -a`、`docker volume ls` 核对资源，再按实际需求选择操作。以下是不同清理范围，不应全部依次执行。

| 命令 | 范围与注意事项 |
| --- | --- |
| `docker image rm my-api:1.0` | 删除指定镜像引用；容器引用等条件可能阻止移除 |
| `docker volume rm app-data` | 删除指定未被容器引用的卷及数据，不能靠重建容器恢复 |
| `docker network rm app-net` | 删除指定网络，仍有连接端点时通常无法删除 |
| `docker container prune` | 清理停止的容器，包含其可写层 |
| `docker image prune` | 默认清理悬空镜像；不等于所有旧版本镜像 |
| `docker image prune -a` | 扩大到没有容器引用的镜像，可能删掉为回滚保留的版本 |
| `docker builder prune` | 清理构建缓存，之后构建可能变慢 |
| `docker volume prune` | 当前版本默认清理没有容器引用的匿名本地卷 |
| `docker volume prune -a` | 也包括没有容器引用的具名卷，可能删除仍需要的数据库数据 |
| `docker system prune` | 清理停止容器、未用网络、悬空镜像和未用构建缓存，默认不删卷 |
| `docker system prune -a` | 扩大镜像清理范围，并非只多清理缓存 |
| `docker system prune --volumes` | 在系统清理中加入未使用匿名卷，不应理解为所有具名卷 |

“未使用”是 Docker 的资源引用判断，不代表业务上不需要。`-f/--force` 通常跳过清理确认，不提供更安全的过滤。不同版本的卷清理行为应核对本机帮助；不要把清理命令直接写入无审查的定时任务。

参考：[system prune](https://docs.docker.com/reference/cli/docker/system/prune/)、[volume prune](https://docs.docker.com/reference/cli/docker/volume/prune/)。

## 常见问题

| 现象 | 优先检查 |
| --- | --- |
| 无法连接 Docker daemon | 引擎是否启动、Context/环境变量、连接端点及权限 |
| 容器名已被占用 | `docker ps -a` 检查同名旧容器，明确选择启动、重命名或删除 |
| 主机端口已被占用 | 其他容器或主机进程是否占用该地址和端口 |
| 容器启动后立即退出 | `docker logs`、主进程命令、配置、依赖和退出状态 |
| `exec` 找不到 `bash/sh` | 镜像是否包含该程序；精简镜像可能没有 Shell |
| `exec format error` | 镜像架构、可执行文件格式、脚本解释器及换行格式 |
| 服务启动但无法访问 | 容器内监听地址、主机端口映射、防火墙和反向代理 |
| 重建后数据消失 | 原数据是否只写在容器可写层，或挂载到了不同的卷/路径 |
| 镜像拉取失败 | 镜像名/标签、登录权限、仓库网络及平台支持 |

返回码与输出应结合判断：Docker 命令成功不保证应用业务正常。部署后仍需检查实际接口、日志和持久化数据。
