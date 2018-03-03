# Git Flow

Git Flow 工作流。

首先，一个Git Flow 的项目，应该有两大分支：`master`分支和`develop`分支。次分支：`release`、`new feature`分支和`hot fix`分支。其中`develop`分支的更新时间线一定不能慢于`master`分支。

>* `master branch`

主分支，一般作为稳定状态分支，与线上环境同步。此分支不允许做`commit`操作。只允许进行`merge`，`hot fix`的操作。

>* `develop branch`

开发分支，顾名思义也就是同步开发过程中的分支。一般也代表了测试完毕后的状态。在项目的每个迭代周期时，将会合并到`master branch`上。

>* `release branch`

发行分支，此分支由`develop branch`生成，仅允许`commit`的操作。在测试通过后，以`Pull Request`的形式合并到`master branch`和`develop branch`上。合并通过后，此分支将只允许删除操作。

>* `new feature`

新需求、功能分支，在一个项目在一次版本迭代后，后续可能会有新的需求功能加入。这时候我们就需要从最新的`develop branch`上新建分支，由此新建的分支一般以新需求或新功能名字来命名。

开发人员在各自的分支上开发完成后，测试完成后，以`Pull Request`的形式申请将这个分支合并到`develop branch`上。通过后，负责人将会`merge`这个分支。在上述操作成功后，这个分支将只能进行`delete branch`的操作。

>* `hot fix`

热修复分支。一个项目是有可能会出现在上线后或用户使用后才发现的`BUG`的情况。这个时候我们就需要进行`hot fix`的操作了。

这个时候，一般都是比较紧急的情况，无法跟随迭代周期进行提交修复，因此我们需要直接从`master branch`上新建分支。并在此新分支上进行`bug fix`，最后测试通过后，合并到`master branch`和`develop branch`上。