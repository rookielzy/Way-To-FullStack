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

找出哪一些是`state`，然后考虑：
1. 它是通过 props 从父级传来的吗？如果是，他可能不是 state。
2. 它随着时间推移不变吗？如果是，它可能不是 state。
3. 你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。

对你应用的每一个`state`：
1. 确定每一个需要这个 state 来渲染的组件。
2. 找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)
3. 这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。
4. 如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。

TimerDashboard: isOpend EditableTimerList ToggleableTimerForm

EditableTimerList: EditableTimer

EditableTimer: editFormOpen TimerForm Timer

TimerForm: Two input fields