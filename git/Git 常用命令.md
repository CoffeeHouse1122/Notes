# Git常用命令

### 创建版本库
---
```
git clone <url>     #克隆远程版本库
git init            #初始化本地版本库
```

### 修改和提交
---

```
git status                      #查看状态
git diff                        #查看变更内容
git add .                       #跟踪所有改动过的文件
git add <file>                  #跟踪指定的文件
git mv <old><new>               #文件改名
git rm <file>                   #删除文件
git rm --cached <file>          #停止跟踪文件但不删除
git commit -m "commit message"  #提交所有更新过的文件
git commit --amend              #修改最后一次提交
```

### 查看提交历史
---

```
git log            #查看提交历史
git log -p <file>  #查看指定文件的提交历史
git blame <file>   #以列表方式查看指定文件的提交历史
```

### 撤销
---

```
git reset --hard HEAD     #撤销工作目录中所有为提交文件的修改内容
git checkout HEAD <file>  #撤销指定的未提交文件的修改内容
git revert <commit>       #撤销指定的提交
```




