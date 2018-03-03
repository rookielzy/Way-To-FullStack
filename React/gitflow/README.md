# Git Flow

Git Flow 工作流。

首先，一个Git Flow 的项目，应该有两大分支：`master`分支和`develop`分支。

>* `master branch`

主分支，一般也作为release（发版）分支。这个分支为稳定状态分支，与线上环境同步。此分支不允许做`commit`操作。只允许进行`merge`，`hot fix`的操作。

>* `develop branch`

开发分支，顾名思义也就是同步开发过程中的分支。一般也代表了测试完毕后的状态。在项目的每个发版周期时，将会合并到`master branch`上。