# Editor State

ProseMirror 将所有编辑器状态（基本上就是创建一个与当前编辑器一样的编辑器所需的状态）保存在一个对象中。该对象通过应用事务进行更新（创建新状态）。

## `class` EditorState

ProseMirror 编辑器的状态由这种类型的对象表示。状态是一种持久的数据结构--它不会更新，而是使用 `apply` 方法从旧的状态值计算出新的状态值。

一个状态包含多个内置字段，<u>插件还可以定义其他字段</u>。

#### doc

当前文档

#### selection

选择

#### storedMarks: `readonly Mark[]`

一组应用于下一个输入的标记。如果没有设置明确的标记，则标记为空。

#### schema: [`Schema`](/)

当前状态文档的模式

#### plugins: `readonly Plugin[]`

在此状态下处于激活状态的插件。

#### apply(tr: `Transaction`) → `EditorState`

应用给定的事务生成新状态。

#### applyTransaction(rootTr: `Transaction`) → `{state: EditorState, transactions: readonly Transaction[]}`

应用给定的事务的详细变体，返回应用的精确事务（可能受插件事务钩子的影响）以及新状态。

#### tr: `Transaction`

从这个状态开始交易。

#### reconfigure(config: `Object`) → `EditorState`

在此状态的基础上,使用经过调整的活动插件集,创建一个新状态。存在于插件中的状态字段保持不变。不再存在的字段将被删除，新的字段将使用 init 方法初始化，并传入新的配置对象。那些不再存在的将被删除，而那些新的将使用其 init 方法进行初始化，并传入新的配置对象。

  - config
    - plugins⁠?: `readonly Plugin[]`

      新的激活插件集。

#### toJSON(pluginFields⁠?: `Object<Plugin>`) → `any`

将此状态序列化为 JSON。 如果要序列化插件的状态，请将要在生成的 JSON 对象中使用的对象映射属性名称传递给插件对象。 该参数也可以是字符串或数字，在这种情况下它会被忽略，以支持 JSON.stringify 调用 toString 方法的方式。

#### `static` create(config: [`EditorStateConfig`](#interface-editorstateconfig)) → [`EditorState`](#class-editorstate)

创建一个新的状态

#### `static` fromJSON( config: `Object`, json: `any`, pluginFields⁠?: `Object<Plugin>` ) → `EditorState`

反序列化状态的 JSON 表示形式。 配置应该至少有一个模式（`schema`）字段，并且应该包含用于初始化状态的插件数组。 通过将插件实例与它们在 JSON 对象中使用的属性名称相关联，`pluginFields` 可用于反序列化插件的状态。

  - config
    - schema: `Schema`

      The schema to use.
    - plugins⁠?: `readonly Plugin[]`

      The set of active plugins.

## `interface` EditorStateConfig

传给 [`EditorState.create`](#static-create-config-editorstateconfig-%E2%86%92-editorstate) 的对象类型。

#### schema⁠?: `Schema`

要使用的模式（仅在未指定 doc 时相关）。

#### doc⁠?: `Node`

起始文件。必须提供该文件或模式(`schema`)。

#### selection⁠?: `Selection`

文档中的有效选择。

#### storedMarks⁠?: `readonly Mark[]`

初始存储标记集。

#### plugins⁠?: `readonly Plugin[]`

在此状态下应处于激活的插件。

## `class` Transaction `extends Transform`

编辑器状态事务，可应用于状态以创建更新状态。使用 `EditorState.tr` 创建一个实例。

事务不仅跟踪文档的更改（它们是 Transform 的子类），还跟踪其他状态的更改，如选择更新和存储标记集的调整。

此外，你还可以在事务中存储`metadata`(元数据)属性，这些属性是客户端代码或插件可以用来描述事务代表什么的额外信息，这样它们就可以相应地更新自己的状态。

编辑器视图使用一些元数据属性：
  - 一个 `pointer`(指针)属性，其值为 `true`，用于由鼠标或触摸输入直接引起的选择事务;
  - 一个 `composition`(组合)属性，其值为 `ID`，用于识别由 `DOM` 组合输入引起的事务;
  - 一个 `uiEvent` 属性，其值可能是 `paste`(粘贴)、`cut`(剪切)或 `drop`(下拉)。

#### time: `number`

  与该事务相关的时间戳，格式与 Date.now() 相同。

#### storedMarks: `readonly Mark[]`

  该事务设置的存储标记（如果有）。

#### selection: `Selection`

事务的当前选择。默认情况下，该选择是通过事务中的步骤映射的编辑器选择，但可以用 setSelection 覆盖。

#### setSelection(selection: `Selection`) → `Transaction`

更新事务的当前选择。将决定编辑器在应用事务时获得的选择。

#### selectionSet: `boolean`

选择是否被事务明确更新。

#### setStoredMarks(marks: `readonly Mark[]`) → `Transaction`

设置当前`StoredMarks`(存储标记)。

#### ensureMarks(marks: `readonly Mark[]`) → `Transaction`

确认当前的`StoredMarks`(存储标记)（如果为空，则为选择时的标记）与给定的标记集相匹配。如果已经匹配，则不做任何操作。

#### addStoredMark(mark: `Mark`) → `Transaction`

向`StoredMarks`(存储标记)集合添加一个标记。

#### removeStoredMark(mark: `Mark` | `MarkType`) → `Transaction`

从`StoredMarks`(存储标记)集合中删除一个标记或标记类型。

#### storedMarksSet: `boolean`

是否为该事务明确设置了`StoredMarks`(存储标记)。

#### setTime(time: `number`) → `Transaction`

更新事务时间戳

#### replaceSelection(slice: `Slice`) → `Transaction`

使用给定的`Slice`分片替换当前选取

#### replaceSelectionWith(node: `Node`, inheritMarks⁠?: `boolean = true`) → `Transaction`

用给定的节点替换选区。当 `inheritMarks` 为 `true` 且内容为`inline`(内联)时，它将继承插入位置的标记。

#### deleteSelection() → `Transaction`

删除选取

#### insertText(text: `string`, from⁠?: `number`, to⁠?: `number`) → `Transaction`

用包含给定字符串的文本节点替换给定的范围，如果没有给定的范围，则替换选区。

#### setMeta( key: `string` | `Plugin` | `PluginKey`, value: `any` ) → `Transaction`

在此事务中存储`metadata`(元数据)属性，以名称或插件为关键字。

#### getMeta(key: `string` | `Plugin` | `PluginKey`) → `any`

读取给定名称或插件的`metadata`(元数据)属性。

#### isGeneric: `boolean`

如果该事务不包含任何`metadata`(元数据)，则返回 `true`，因此可以安全地进行扩展。

#### scrollIntoView() → `Transaction`

编辑器在更新到该事务产生的状态时，应将选择滚动到视图中。

#### scrolledIntoView: `boolean`

当该事务被调用了 scrollIntoView 时为 True。

#### `type` Command = fn( state: `EditorState`, dispatch⁠?: fn(tr: `Transaction`), view⁠?: `EditorView` ) → `boolean`

`Commands`(命令)是一种函数，它接受一个状态和一个可选的事务分派函数，并且...

- 确定它们是否适用于当前状态
- 如果不适用，则返回`false`
- 如果派发被通过, 执行其效果，可能是通过传递一个事务来调度
- 返回 `true`

在某些情况下，编辑器视图会作为第三个参数传递。