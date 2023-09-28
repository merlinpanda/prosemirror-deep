# Selection

A ProseMirror selection can be one of several types. This module defines types for classical text selections (of which cursors are a special case) and node selections, where a specific document node is selected. It is possible to extend the editor with custom selection types.

ProseMirror 选择是多种类型之一。本模块定义了经典文本选择（光标是一种特殊情况）和节点选择（选择特定文档节点）的类型。还可以通过自定义选择类型来扩展编辑器。

## `abstract class` Selection

编辑器选择的超类。每个选择类型都应扩展该类。不应直接实例化。

#### new Selection( $head: `ResolvedPos`, ranges⁠?: `readonly SelectionRange[]`)

>  - $anchor: ResolvedPos
>
>    选区的解析锚点（修改选区时保持不变的一侧）。
>
>  - $head: ResolvedPos
>
>    选区的解析头（修改选区时移动的一侧）。
>
>  - ranges: readonly SelectionRange[]
>
>    选择涵盖的范围。

#### anchor: `number`

The selection's anchor, as an unresolved position.

#### head: `number`

选取头

#### from: `number`

选择范围的下限。

#### to: `number`

选择范围的上限。

#### $from: `ResolvedPos`

选区主要范围的下限(`resolved`)。

#### $to: `ResolvedPos`

选区主要范围的上限(resolved)。

#### empty: `boolean`

所选内容是否没有包含任何内容。

#### `abstract` eq(selection: `Selection`) → `boolean`

测试该选择是否与另一个选择相同。

#### `abstract` map(doc: `Node`, mapping: `Mappable`) → `Selection`

通过可映射的事物来映射此选择。 `doc` 应该是我们要映射到的新文档。

#### content() → `Slice`

获取此选择的内容作为`Slice`(切片)。

#### replace( tr: `Transaction`, content⁠?: `Slice = Slice.empty` )

用`Slice`(切片)替换所选内容，或者，如果未给出`Slice`(切片)，则删除所选内容。 将附加到给定的`transaction`(交换)。

#### replaceWith(tr: `Transaction`, node: `Node`)

将选择替换为给定`Node`(节点)，将更改附加到给定`transaction`(事务)。

#### `abstract` toJSON() → `any`

将选择转换为 `JSON` 表示形式。 当为自定义选择类实现此操作时，**请确保为对象提供一个`type`(类型)属性，该属性的值与您注册类时使用的 `ID` 相匹配。**

#### getBookmark() → `SelectionBookmark`

获取此选择的书签，该书签是无需访问当前文档即可映射的值，稍后再次解析为给定文档的真实选择。 （这主要由历史记录用来跟踪和恢复旧的选择。）此方法的默认实现只是将选择转换为文本选择并返回其书签。

#### visible: `boolean`

控制当此类型的选择在浏览器中处于激活状态时，所选范围是否应对用户可见。 默认为 `true`。

#### `static` findFrom( $pos: `ResolvedPos`, dir: `number`, textOnly⁠?: `boolean = false` ) → `Selection`

Find a valid cursor or leaf node selection starting at the given position and searching back if dir is negative, and forward if positive. When textOnly is true, only consider cursor selections. Will return null when no valid selection position is found.

从给定位置开始查找有效的光标或叶节点选择，如果 `dir` 为负则向后搜索，如果为正则向前搜索。 当 `textOnly` 为 `true` 时，仅考虑光标选择。 当没有找到有效的选择位置时将返回 `null`。

#### `static` near($pos: `ResolvedPos`, bias⁠?: `number = 1`) → `Selection`

Find a valid cursor or leaf node selection near the given position. Searches forward first by default, but if bias is negative, it will search backwards first.

在给定位置附近查找有效的光标或叶节点选择。默认情况下会先向前搜索，但如果偏置`bias⁠`为负值，则会先向后搜索。

#### `static` atStart(doc: `Node`) → `Selection`

Find the cursor or leaf node selection closest to the start of the given document. Will return an AllSelection if no valid position exists.

查找最接近给定文档开头的光标或叶节点选择。 如果不存在有效位置，将返回 `AllSelection`。

#### `static` atEnd(doc: `Node`) → `Selection`

Find the cursor or leaf node selection closest to the end of the given document.

查找最接近给定文档末尾的光标或叶节点选择。

#### `static` fromJSON(doc: `Node`, json: `any`) → `Selection`

Deserialize the JSON representation of a selection. Must be implemented for custom classes (as a static class method).

反序列化所选内容的 `JSON` 表示形式。 必须为**自定义类实现**（作为静态类方法）。

#### `static` jsonID( id: `string`, selectionClass: `{fromJSON: fn(doc: Node, json: any) → Selection}` ) → `{fromJSON: fn(doc: Node, json: any) → Selection}`

To be able to deserialize selections from JSON, custom selection classes must register themselves with an ID string, so that they can be disambiguated. Try to pick something that's unlikely to clash with classes from other modules.

为了能够反序列化 `JSON` 中的选择，自定义选择类必须使用 `ID` 字符串注册自身，以便可以消除歧义。 尝试选择不太可能与其他模块中的类发生冲突的内容。

## `class` TextSelection `extends Selection`

A text selection represents a classical editor selection, with a head (the moving side) and anchor (immobile side), both of which point into textblock nodes. It can be empty (a regular cursor position).

文本选区代表一个经典的编辑器选区，它有一个头部（移动端）和一个锚点（固定端），两者都指向文本块节点。它可以是空的（即表现为一个普通的光标位置）。

#### `new` TextSelection( $anchor: `ResolvedPos`, $head⁠?: `ResolvedPos = $anchor` )

Construct a text selection between the given points.

在给定点之间构建文本选区。

#### $cursor: ResolvedPos

Returns a resolved position if this is a cursor selection (an empty text selection), and null otherwise.

如果是光标选区（空文本选区），则返回已解析的位置，否则为空。

#### `static` create( doc: `Node`, anchor: `number`, head⁠?: `number = anchor` ) → `TextSelection`

Create a text selection from non-resolved positions.

从未解析的位置创建文本选择。

#### `static` between( $anchor: `ResolvedPos`, $head: `ResolvedPos`, bias⁠?: `number` ) → `Selection`

Return a text selection that spans the given positions or, if they aren't text positions, find a text selection near them. bias determines whether the method searches forward (default) or backwards (negative number) first. Will fall back to calling Selection.near when the document doesn't contain a valid text position.

返回跨越给定位置的文本选择，或者，如果它们不是文本位置，则查找它们附近的文本选择。 `bias⁠`(偏差)决定该方法是先向前搜索（默认）还是向后搜索（负数）。 当文档不包含有效的文本位置时，将回退到调用 Selection.near。
