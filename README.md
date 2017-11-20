# Way-To-FullStack
Learning JavaScript to Be A Full Stack Developer

## Introduce Myself
<b>罗志尧</b>，1994年，`FullStack`向往者，`JavaScript`实践者。

## git
> 一般开发的过程中，我们应该将项目分为3大分支。

项目主分支 origin / master | 开发人员分支 fork / master | 本地仓库 fork / master
------------- | ------------- | -------------
项目负责人 | 开发人员 | 开发人员

一般开发的流程：
1. 本地仓库的 fork / master 下新建分支 eg: git checkout -b new-feature

2. 在新分支下，做新功能的开发，或修复Bug。完成后，Commit相关文件

3. 测试过后，切换到 fork / master，进行 git merge new-feature。merge前必须先 git pull orgin master ， git pull fork master。

4. 最后在 origin / master 上提PR

实际的工作中，可能会出现各种问题，常见的有不同的开发的人员修改的同一份文件，这时候就会出现冲突，自己需要仔细看冲突原因，并修复它。

有时候，文件冲突了，但你想放弃自己的更改了，就可以直接使用 git checkout。或者暂时不想修复冲突，就可以使用git stash将相关文件暂存起来。提交完后，再使用 git stash pop 恢复原来没提交，还没修改完的文件。