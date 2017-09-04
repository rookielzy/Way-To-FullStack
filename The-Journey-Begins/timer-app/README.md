# Timer App

![how_to_organize_component](../images/how_to_organize_component.png)

TimersDashboard (green): Parent container 父级容器
– EditableTimerList (red): Displays a list of timer containers
* EditableTimer (aqua): Displays either a timer or a timer’s edit form
· Timer (yellow): Displays a given timer
· TimerForm (blue): Displays a given timer’s edit form
– ToggleableTimerForm (purple): Displays a form to create a new timer
* TimerForm (not displayed): Displays a new timer’s create form

![hierarchica_tree](../images/hierarchica_tree.png)

## Dev Step
In fact, this follows from a handy framework for developing a React app from scratch:
1. Break the app into components  把 UI 划分出组件层级
2. Build a static version of the app  用 React 创建一个静态版本
3. Determine what should be stateful 定义 UI 状态的最小(但完整)表示
4. Determine in which component each piece of state should live 确定你的 State 应该位于哪里
5. Hard-code initial states 静态数据初始化
6. Add inverse data flow  添加反向数据流
7. Add server communication 添加服务器交互功能
