# 参考手册

这是 [ProseMirror](https://prosemirror.net/) 富文本编辑器的参考手册。它列出并描述了该库导出的全部公共 API。如需更多入门资料，请[参阅指南](/document/)。

ProseMirror 由多个独立模块组成。本参考手册介绍了每个模块的输出 API。例如，如果你想使用 `prosemirror-state` 模块中的内容，可以这样导入：

```
var EditorState = require("prosemirror-state").EditorState
var state = EditorState.create({schema: mySchema})
```

或者使用ES6写法：

```
import {EditorState} from "prosemirror-state"
let state = EditorState.create({schema: mySchema})
```

## 相关概念