# Reference manual

This is the reference manual for the ProseMirror rich text editor. It lists and describes the full public API exported by the library. For more introductory material, please see the guide.

ProseMirror is structured as a number of separate modules. This reference manual describes the exported API per module. If you want to use something from the prosemirror-state module, for example, you can import it like this:

```
var EditorState = require("prosemirror-state").EditorState
var state = EditorState.create({schema: mySchema})
```

Or, using ES6 syntax:

```
import {EditorState} from "prosemirror-state"
let state = EditorState.create({schema: mySchema})
```
