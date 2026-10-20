# Docker Compose 常用命令

> 先阅读 [环境与通用说明](./README.md)。本文使用 `docker compose` 插件命令，以 Linux 容器和本机/单个目标引擎上的项目为主。各代码块是独立查询示例，不含配套练习，也不应从头连续执行。

## 目录

- [版本、帮助与项目定位](#版本帮助与项目定位)
- [检查和查看配置](#检查和查看配置)
- [拉取与构建镜像](#拉取与构建镜像)
- [创建并启动服务](#创建并启动服务)
- [服务状态、日志和端口](#服务状态日志和端口)
- [在服务中执行命令](#在服务中执行命令)
- [停止、启动、重启和删除](#停止启动重启和删除)
- [更新服务与回滚](#更新服务与回滚)
- [环境变量与配置文件](#环境变量与配置文件)
- [服务配置字段参考](#服务配置字段参考)
- [依赖、网络和持久化](#依赖网络和持久化)
- [多个配置、可选服务与扩容](#多个配置可选服务与扩容)
- [常见问题](#常见问题)

## 版本、帮助与项目定位

`ls` 查看运行中的 Compose 项目，`-a` 包含已停止的项目。运行状态查询需要连接目标 Docker 引擎；`version` 和帮助不证明引擎已经运行。

Compose 命令中的 `api`、`redis` 是配置文件 `services:` 下的服务名，不是镜像名或自动生成的容器名。一般可省略服务名操作本项目中的适用服务，也可指定一个或多个服务。

```text
docker compose version
docker compose --help
docker compose up --help
docker compose ls
docker compose ls -a
```

| 全局选项 | 用途与条件 |
| --- | --- |
| `-f compose.yaml` | 指定现有配置文件，可重复指定以合并配置 |
| `-p myapp` | 指定项目名，决定资源分组；后续查询和变更应保持一致 |
| `--env-file .env.production` | 指定用于 Compose 变量插值等用途的环境文件，不会自动将所有变量注入容器 |
| `--project-directory 路径` | 显式指定项目工作目录，影响默认路径解析等行为 |
| `--profile debug` | 启用配置中声明的可选服务分组 |

没有 `-f` 时，Compose 会从当前目录及父目录查找默认配置文件，容易在错误目录下选中另一项目。项目名优先级依次包括 `-p`、`COMPOSE_PROJECT_NAME`、配置顶层 `name`、默认目录名；项目名只使用小写字母、数字、连字符和下划线，并以小写字母或数字开头。

后文省略全局选项，是假设已经处于正确项目目录并使用一致配置；若实际部署使用了 `-f/-p/--env-file`，后续命令也要保留它们。切换 `--context` 会切换实际引擎。

参考：[Compose 命令入口](https://docs.docker.com/reference/cli/docker/compose/)。

```text
docker compose -f compose.yaml -p myapp ps -a
docker compose -f compose.yaml --env-file .env.production -p myapp up -d
```

## 检查和查看配置

- `--quiet` 只验证，不打印渲染结果；通过时通常无输出。
- `config` 展示合并、变量替换及规范化后的配置；可检查最终端口、镜像、路径和环境变量。
- `--services`、`--images`、`--volumes` 分别列出服务名、镜像引用、卷定义名。
- 验证通过不代表镜像存在、端口空闲、远端可达或程序能够正常运行。
- 解析结果可能包含从环境文件读入的密码等内容，分享或保存前检查。

```text
docker compose config --quiet
docker compose config
docker compose config --services
docker compose config --images
docker compose config --volumes
```

支持该参数的版本可预览变更计划；它不能替代真实运行验证。常规本地 `config` 校验不创建容器，也不拉取镜像；涉及特殊远端配置来源或额外解析选项时需另行判断。

参考：[config](https://docs.docker.com/reference/cli/docker/compose/config/)。

```text
docker compose --dry-run up -d
```

## 拉取与构建镜像

| 操作 | 使用条件与影响 |
| --- | --- |
| `pull` | 下载配置引用的镜像，需网络和仓库权限，不更新运行中的容器 |
| `pull api` | 只拉取指定服务的镜像；依赖是否处理由所用选项决定 |
| `build api` | 服务声明了有效 `build:`，Dockerfile 与上下文存在；构建后不自动替换容器 |
| `build --pull` | 构建时尝试更新所引用的镜像 |
| `build --no-cache` | 不用构建步骤缓存，不等于自动拉取所有依赖的新版本 |

只有 `image:` 没有 `build:` 的服务不能靠 `build` 从未知源代码生成镜像。两者同时存在时，还要结合 `pull_policy` 和命令选项确认行为。团队发布镜像和本地构建镜像是两种来源，选用与项目一致的方式。

```text
docker compose pull
docker compose pull api
docker compose build api
docker compose build --pull --no-cache api
```

## 创建并启动服务

| 参数 | 含义与注意事项 |
| --- | --- |
| `-d` | 后台运行，命令返回后容器继续运行 |
| 服务名 `api` | 选择服务；默认可能启动其所需依赖 |
| `--build` | 启动前构建需要构建的镜像 |
| `--no-deps` | 不启动相关依赖服务；需确认依赖已经可用且配置兼容 |
| `--force-recreate` | 即使配置和镜像未变也重新创建目标容器，会丢弃其可写层 |
| `--pull always` | 启动前尝试拉取镜像，不保证业务依赖可用 |
| `--wait` | 等待服务达到运行或健康状态，隐含后台模式 |
| `--wait-timeout 60` | 为等待就绪设置最多 60 秒，超时导致命令失败，不代表自动回滚 |
| `--remove-orphans` | 移除同项目中不再由当前配置定义的服务容器，先确认是否误用了不完整配置 |

`up` 会创建所需资源，并根据配置或镜像变化重建已有服务容器。没有配置健康检查时，`--wait` 不能凭空判断业务是否可用。

不加 `-d` 的 `up` 会附着输出，按 `Ctrl+C` 通常会停止该次运行的服务；这与 `logs -f` 的退出行为不同。不要把 `--force-recreate` 当作保留容器临时修改的重启操作。

参考：[up](https://docs.docker.com/reference/cli/docker/compose/up/)。

```text
docker compose up -d
docker compose up -d api
docker compose up -d --build api
docker compose up -d --no-deps api
docker compose up -d --force-recreate api
docker compose up -d --wait --wait-timeout 60
```

## 服务状态、日志和端口

- `ps -a` 包括停止的容器；核对 `SERVICE`、`STATE/STATUS`、健康状态和 `PORTS`，不能仅看容器是否存在。
- 日志的 `--tail`、`--since`、`--timestamps`、`-f` 分别控制行数、时间范围、时间戳和持续跟踪。按 `Ctrl+C` 退出跟踪，不停止服务。
- `images` 查看已创建服务容器所使用的镜像；配置中计划使用的镜像可用 `config --images` 查看。
- `top` 查看运行进程；`port api 3000` 查询容器端口 `3000` 对应的已发布主机地址和端口，不会新增映射。

日志依赖应用写入标准输出/错误及引擎日志配置；应用内部文件日志需要另外读取。更详细的状态、挂载和资源占用可先从 `ps` 取得容器名，再用 `docker inspect` 或 `docker stats`。

```text
docker compose ps
docker compose ps -a
docker compose logs --tail 100 api
docker compose logs -f --since 30m --timestamps api redis
docker compose images
docker compose top api
docker compose port api 3000
```

## 在服务中执行命令

`exec` 在已有运行中服务容器内执行命令，默认分配交互终端，自动化可用 `-T` 禁用终端；`-w` 设置容器内工作目录。程序和路径必须存在于镜像中，`exit` 只结束额外启动的 Shell。

`cp` 复制容器文件，反向复制可交换两侧；不会自动重载应用，也不会将临时修改写回原镜像。源文件和目标父目录需存在。

```text
docker compose exec api sh
docker compose exec -T api node --version
docker compose exec -w /app api ls -la
docker compose cp api:/app/logs/error.log ./error.log
```

`run` 根据服务配置创建一个临时容器执行一次性命令，不要求该服务容器正在运行；仍需要镜像和相关配置。`--rm` 在命令退出后清理临时容器，`--no-deps` 不启动依赖。

| 对比 | `exec` | `run` |
| --- | --- | --- |
| 目标 | 已运行的服务容器 | 新建的一次性容器 |
| 常见用途 | 检查运行环境、执行已有工具 | 执行维护脚本、导出或迁移任务 |
| 端口 | 沿用已有容器端口 | 默认不发布服务配置里的端口，确有需要再用 `--service-ports` 或 `-p` |
| 数据影响 | 可修改当前容器及挂载 | 也可能使用服务的真实数据卷；临时容器不等于隔离数据 |

传入命令通常覆盖服务的默认命令，但不会自动绕过镜像或服务的 `entrypoint`；执行前确认入口程序支持所传参数。迁移等写操作需要项目明确的脚本和备份，不能仅因带 `--rm` 就认为没有数据影响。

参考：[run](https://docs.docker.com/reference/cli/docker/compose/run/)、[exec](https://docs.docker.com/reference/cli/docker/compose/exec/)。

```text
docker compose run --rm --no-deps api node --version
```

## 停止、启动、重启和删除

| 命令 | 影响 |
| --- | --- |
| `stop` | 停止容器但保留容器、网络和卷，后续可 `start` |
| `start` | 启动已存在的停止容器，不创建缺失容器，不应用新配置 |
| `restart` | 重启已有容器，不应用更改后的环境变量或镜像 |
| `down` | 停止并删除本项目服务容器及受其管理的相应网络，默认保留卷和镜像 |
| `rm api` | 删除停止的指定服务容器，丢弃其可写层 |

`-t 30` 设置停机等待时间，超时后可能强制终止。应用需支持正常处理停止信号，数据库等有状态服务要留出合适停机时间。

以下是不同的删除范围，不是常规更新的必选步骤：

| 命令 | 额外影响 |
| --- | --- |
| `docker compose down --remove-orphans` | 还移除同项目中当前配置未声明的服务容器 |
| `docker compose down --rmi all` | 还尝试删除服务使用的镜像，可能影响后续启动和回滚 |
| `docker compose down -v` | 还删除本项目声明的具名卷及附着的匿名卷，可导致数据库等数据永久丢失 |
| `docker compose rm -s -f api` | 先停止再删除目标服务容器，并跳过确认 |

`external: true` 的卷和网络不由 `down` 删除；绑定挂载的主机文件也不因删除挂载声明自动删除。默认 `down` 保留匿名卷，但后续 `up` 不保证自动重新关联旧匿名卷。需要稳定复用的数据应使用明确的具名卷或绑定挂载，并做好备份。

参考：[down](https://docs.docker.com/reference/cli/docker/compose/down/)、[restart](https://docs.docker.com/reference/cli/docker/compose/restart/)。

```text
docker compose stop -t 30 api
docker compose start api
docker compose restart -t 30 api
docker compose down
```

## 更新服务与回滚

更新命令会影响真实服务，单实例重建可能短暂中断。`--no-deps` 仅适用于依赖无需同步变更且已经可用的情况；如果依赖也改变，应将相关服务纳入更新范围。

| 修改内容 | 对应处理 |
| --- | --- |
| Compose 中环境变量、端口、挂载改变 | 用同一组项目参数执行 `up -d` 应用配置；单独 `restart` 不够 |
| 镜像内源代码改变 | 重新构建或拉取镜像，再用 `up -d` 创建对应容器 |
| 绑定挂载的配置文件内容改变 | 文件通常立即可见，但应用是否重载取决于自身机制 |
| 只执行了 `pull` 或 `build` | 原容器仍可能运行旧镜像，需要后续 `up` |

更新后检查 `ps`、日志及实际业务接口。回滚通常是恢复此前镜像引用和兼容配置，再执行 `up -d`；不要假定 Compose 会自动保留可用的历史镜像或自动回滚数据库结构。普通单机 Compose 也不自动提供跨主机调度或零停机发布。

镜像由仓库发布时，先更新配置中的镜像引用并核对配置，再按项目运行方式执行：

```text
docker compose pull api
docker compose up -d --no-deps api
```

使用本地源代码和 `build:` 时：

```text
docker compose up -d --build api
```

## 环境变量与配置文件

这几种来源用途不同：

| 位置 | 作用 |
| --- | --- |
| 执行 Compose 的 Shell 环境 | 可为 `${变量}` 插值提供值，通常优先于环境文件的同名插值变量 |
| 项目 `.env` 或全局 `--env-file` | 为 Compose 配置插值及部分 Compose 自身设置提供值 |
| 服务内 `env_file:` | 将文件中的变量注入对应容器 |
| 服务内 `environment:` | 明确设置容器变量，同名项通常覆盖服务 `env_file:` |
| 镜像 `ENV` | 镜像默认环境，可被运行时配置覆盖 |

`.env` 存在不等于里面所有变量都会进入容器；默认环境文件的查找受当前目录、项目目录和相关配置影响，多个环境时显式指定 `--env-file` 更易核对。

`API_IMAGE` 用于选择镜像引用，必须设置为非空值；`APP_ENV` 在未设置或为空时使用 `production`。`${VAR:?提示}`、`${VAR:-默认值}` 属于 Compose 插值，不是直接输入 PowerShell/CMD 的语法。需要阻止 Compose 展开 `$` 时可按场景使用 `$$`。

```yaml
services:
  api:
    image: "${API_IMAGE:?请设置 API_IMAGE}"
    environment:
      # APP_ENV：应用运行环境，需由应用读取。
      APP_ENV: "${APP_ENV:-production}"
```

以下示例只展示环境文件格式，没有创建实际 `.env` 文件。保存实际秘密的环境文件应限制访问并排除版本控制；示例文件只保留占位值和说明。Compose 的 secret 挂载还需要应用支持读取文件，不能把它等同于自动加密或完整秘密管理系统。

参考：[变量插值](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/)、[容器环境变量优先级](https://docs.docker.com/compose/how-tos/environment-variables/envvars-precedence/)。

```dotenv
# API_IMAGE：实际构建或发布的后端镜像，此处仅为名称示例。
API_IMAGE=my-api:1.0
# APP_ENV：传入应用的运行环境标识。
APP_ENV=production
```

## 服务配置字段参考

下面是解释字段关系的配置参考，不是无需修改即可部署的应用。`my-api:1.0` 是自有镜像占位值，必须提供能监听容器 `3000` 端口并读取相应变量的程序；数据路径也必须与程序实际使用位置一致。

| 字段 | 说明与使用条件 |
| --- | --- |
| `name` | 默认项目名，可被 `-p` 覆盖 |
| `services` | 服务定义；CLI 中使用其中的服务名 |
| `image` | 已构建或可拉取的镜像；示例标签不代表建议部署版本或不可变版本 |
| `ports` | 主机回环 `8080` → 容器 `3000`，容器应用需监听可被网络访问的地址 |
| `environment` | 容器环境变量；应用变量名应以实际程序为准 |
| `volumes` | 具名卷挂载；需实际写入该路径且具有权限 |
| `depends_on` | 声明依赖；长语法 `service_healthy` 结合依赖健康检查等待就绪 |
| `restart` | 容器退出后的重启策略，不是持续依赖健康监控 |
| `command` | 覆盖默认启动命令，此处启用 Redis AOF，持久化文件仍需写入卷 |
| `healthcheck` | 检查程序必须存在于镜像；分别定义命令、间隔、超时、失败次数、启动宽限期 |

示例只将 API 端口发布到主机回环地址，Redis 不发布主机端口；它未配置 Redis 认证或 API 健康检查，不能当作完整生产配置。按实际认证方式调整健康检查，生产镜像版本、权限、资源限制和备份需由项目明确。

现代 Compose 文件不需要顶层 `version:`；该字段不用于选择所安装 Compose 的功能版本。YAML 使用空格缩进，端口字符串和需要保持字符串含义的值建议加引号。

```yaml
name: myapp

services:
  api:
    image: my-api:1.0
    ports:
      - "127.0.0.1:8080:3000"
    environment:
      # APP_ENV：应用环境标识。
      APP_ENV: production
      # REDIS_HOST：同一 Compose 网络内的 Redis 服务名。
      REDIS_HOST: redis
      # REDIS_PORT：Redis 容器内端口，不是主机发布端口。
      REDIS_PORT: "6379"
    volumes:
      - app-data:/app/data
    depends_on:
      redis:
        condition: service_healthy
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
      start_period: 10s
    restart: unless-stopped

volumes:
  app-data:
  redis-data:
```

## 依赖、网络和持久化

- 普通 `depends_on` 主要表达启动依赖，不保证数据库或业务已经可用；`service_healthy` 需配合对应服务有效的健康检查。应用仍应能重试依赖连接和应对运行中的依赖故障。
- 默认项目网络中可通过服务名通信，例如 `redis:6379`，不需要先发布 Redis 的主机端口。容器内的 `localhost` 指当前容器；浏览器在主机上不能直接用 Compose 内部服务名访问。
- 默认具名卷通常带项目名前缀。换目录、`-p` 或项目名后可能使用另一组卷，看到“空数据库”时先检查实际挂载，不要立即清理旧卷。
- `down` 后数据保留不代表下次一定挂载正确，也不代表数据已有备份；数据库升级前确认版本兼容与恢复方式。

已有独立管理的数据卷可声明为外部卷：

`shared-app-data` 必须已在目标引擎存在，否则 Compose 不会代为创建。外部卷不会被 Compose `down -v` 删除，但仍可能被其他 Docker 删除或清理命令影响。

参考：[启动依赖与健康检查](https://docs.docker.com/compose/how-tos/startup-order/)、[Compose 网络](https://docs.docker.com/compose/how-tos/networking/)、[卷配置](https://docs.docker.com/reference/compose-file/volumes/)。

```yaml
services:
  api:
    image: my-api:1.0
    volumes:
      - app-data:/app/data

volumes:
  app-data:
    external: true
    name: shared-app-data
```

## 多个配置、可选服务与扩容

- 多个 `-f` 按顺序合并，列表等字段不一定简单覆盖；先用 `config` 检查最终结果。普通多文件合并中的相对路径基于第一个配置文件所在目录，`--project-directory` 可显式调整基准。
- `--profile debug` 要求配置中实际存在相应 `profiles:` 声明；没有 profile 限制的常规服务仍会参与。
- `--scale worker=3` 将已有 `worker` 服务设为 3 个实例。需要服务支持多实例，不能声明固定 `container_name`；相同固定主机端口也会冲突。
- 多实例共享本地文件或数据库卷可能不安全，应按应用并发和数据设计决定；增加容器数量本身不自动产生可用的负载均衡入口。

```text
docker compose -f compose.yaml -f compose.production.yaml config
docker compose -f compose.yaml -f compose.production.yaml up -d
docker compose --profile debug up -d
docker compose up -d --scale worker=3 worker
```

## 常见问题

| 现象 | 优先检查 |
| --- | --- |
| 找不到配置文件 | 当前目录、`-f` 路径、默认文件名 |
| `no such service` | 使用的是 `services:` 下的名称，且读取了正确配置 |
| 插值变量未设置 | 执行 Shell、`--env-file`、变量拼写及 `${VAR:?}` 要求 |
| 修改环境变量后未生效 | 是否只用了 `restart`；是否重新 `up` 并应用了正确配置 |
| `config` 通过但启动失败 | 镜像、端口、权限、挂载源、健康检查与运行依赖 |
| 健康检查一直失败 | 检查工具是否存在、端口/路径/认证是否匹配、启动时间是否足够 |
| 连接数据库失败 | 服务名、容器端口、网络、认证，以及程序是否错误使用 localhost |
| `exec` 提示服务未运行 | `ps -a` 和 `logs` 检查退出原因，或按需要使用 `run` |
| 出现 orphan 提示 | 项目名及配置文件组合是否改变，确认后再决定是否清理 |
| 重建后数据为空 | 项目名、卷名、实际 Mounts、写入路径，是否曾执行 `down -v` |

## 官方参考

- [Compose 命令索引](https://docs.docker.com/reference/cli/docker/compose/)
- [Compose 配置规范](https://docs.docker.com/reference/compose-file/)
- [Compose 服务字段](https://docs.docker.com/reference/compose-file/services/)
