# 03-Advanced React + Redux

## 3.1 `useReducer` Hook

 ```javascript
 function reducer(state, action) {
   switch (action.type) {
     case "dec":
       return { ...state, count: state.count - state.step };
     case "inc":
       return { ...state, count: state.count + state.step };
     case "setCount":
       return { ...state, count: state.payload };
     case "setStep":
       return { ...state, step: action.payload };
     case "reset":
       return initialState;
     default:
       throw new Error("Unkown action");
   }
 }
 
 function DateCounter() {
   const [count, dispatch] = useReducer(reducer, 0);
   const dec = function () {
   	dispatch({ type: "dec", payload: 1 });
   };
   ...
 }
 ```

* Why `useReducer`? => 使用 `useState` 进行状态管理，在某些情况下不够
  1. 当组件有一堆状态和状态更新，分布在整个组件的多个 event handler 中时
  2. 当多个状态更新需要在同时进行更新时
  3. 当更新一个状态需要依赖一个或多个其它状态时

```javascript
const [count, dispatch] = useReducer(reducer, 0);
```

* State with `useReducer`
  * 状态被存储在一个 state object 中
  * `useReducer` 需要一个 `reducer` 函数，包含所有更新状态逻辑，**将状态逻辑和组件本身 (event handler) 完全解耦** => `setState()` with superpowers
  * `reducer` 是一个纯函数，会接受当前状态和一个动作，根据这些值返回更新之后的状态
    * `state` 同样是不可变的，`reducer` 中也不允许有 side effect
  * `action` 是一个 object，描述怎样进行状态更新
  * `dispatch` 事用于触发状态更新的函数，从 event handlers 发送 action 给 reducer

<img src="./_assets/12.png">

* `json-server`

  ```bash
  npm i json-server
  ```

  ```json
  	...
  	"scripts": {
      ...
      "server": "json-server --watch data/questions.json --port 8000"
    },
  	...
  ```

  ```bash
  npm run server
  ```

  

