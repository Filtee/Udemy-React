# 01-React_Fundamentals

## 1. Essential JavaScript for React

### 1.1 Deconstructuring

用于从 Object/Array 中快速获取多个数据

```javascript
// 对于 Object 数据类型
const { title, genres } = getBook(2);
// 对于 Array 数据类型
const [ first, second ] = genres;
```

### 1.2 Rest/Spread Operator

* **Rest Operator**: 用于获取剩余的所有数据
  * 只能放在 Deconstructuring 的末尾

```javascript
const [ primaryGenre, secondaryGenre, ...otherGeners ] = Genres;
```

* **Spread Operator**: 用于添加新数据，将所有原有数据拿出，放在新位置
  * 对于 Object 数据类型，如果添加的是已有的属性，则会重写原有值

```javascript
const newGenres = [ ...genres, "epic fantasy" ];
const newGenres = [ "epic fantasy", ...genres ];
// Obejct
const updateBook = { ...book, pulicationDate: "2001-12-19" };
```

### 1.3 Template Literals

```javascript
const summary = `${tittle} is a book`;
```

### 1.4 Ternaryies

* 三元运算符

```javascript
pages > 100 ? "over a thousand" : "less than 1000";
```

### 1.5 Short-Circuiting

* Or (`||`): 会在第一个值为 Falsy Value 的时候，短路输出第二个值
  * Falsy Value: `0`, `""`, `null`, `undefined`

* **空格合并符** (`??`): 只会在第一个值为 `null` 或 `undefined` 的时候，短路输出第二个值

```javascript
const count = 0 ?? "No data!";
console.log(count); // 输出值为 0
```

### 1.6 Optional Chaining

* 防止读取 `undefined` 的属性

```javascript
// 报错：
const librarything = book.reviews.librarything.reviewcount;
// 使用 Optional Chaining, 返回 undefined
const librarything = book.reviews?.librarything?.reviewcount;
// 再设置空格合并符
const librarything = book.reviews?.librarything?.reviewcount ?? 0;
```

### 1.7 Array Methods

* **map**: 遍历整个数组，返回对每个元素操作后的结果组合成为的新数组

```javascript
const x = [1, 2, 3, 4, 5].map((el) => el * 2);
console.log(x); // [2, 4, 6, 8, 10]
// 重组为每个元素的属性值
const titles = getBooks().map((book) => book.title);
const essentialData = getBooks().map((book) => ({
    title: book.title,
    author: book.author,
    reviewsCount: getTotalReviewCount(book),
}));
```

* **filter**: 遍历整个数组，返回去掉了所有不符合条件的元素组成的新数组

```javascript
const longBooks = books.filter((book) => boo.pages > 500);
```

* **reduce**: 会有一个 accumulator (累加器)

```javascript
// 例子：数字求和
const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0)
```

* **sort**: 对数组进行排列
  * 这不是一个函数式的方法，会改变原有数组的顺序，因此通常需要创建副本（`.slice()`）来进行操作
  * `a` 指向当前数据，`b` 指向下一个数据

```javascript
// 升序排列
const sorted = arr.slice().sort((a, b) => a - b);
// 降序排列
const sortedByPages = arr.slice().sort((a, b) => b.pages - a.pages)
```

### 1.8 Working with Immutable Arrays

* React 中很多数组操作需要是不可变的，不改变底层数组

```javascript
// 1) Add book object to array.
const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secrets",
  author: "J.K Rowling",
}; 
const boosAfterAdd = [...books, newBook];

// 2) Delete book object from array.
const booksAfterDelete = bookAfterAdd.filter((book) => book.id !== 3);

// 3) Update book object in the array.
const booksAfterUpdate = booksAfterDelte.map((book) => (
  book.id === 1 ? { ...book, pages: 1210 } : book
))
```

### 1.9 Asynchronous JavaScript

* **Promises**: 
  * e.g. `fetch` 返回的就是一个 Promise 数据类型
    * `.then()` 

```javascript
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json()) // .json() 也是一个异步方法，返回的是另一个 Promise
  .then((data) => console.log(data)) // 等待 .json() 执行的结果返回
```

* **async / await**: 更优雅的处理异步的方式，同步风格代码

```javascript
async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  console.log(data);
}
// 调用异步函数
const todos = await getTodos();
```



## 2. Components, Props and JSX

### 2.1 Render Root Components

```javascript
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello React!</h1>;
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

* **严格模式** (Strict Mode): 在开发过程中，会渲染所有组件两次，方便寻找 bug，并查看是否使用了过时的 API

```javascript
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello React!</h1>;
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 2.2 Components

每个组件作为 Building Blocks

```javascript
function Pizza() {
  return <h2>Pizza</h2>;
}
```

* React 函数的两个规则
  1. 函数名需要首字母大写
  2. 函数需要返回 Markup，如：`<div></div>`， 每个组件只能返回一个元素

* 嵌套 (Nesting)

  ```javascript
  function App() {
    return (
      <div>
        <h1>Hello React!</h1>
        <Pizza />
      </div>
    );
  }
  
  function Pizza() {
    return <h2>Pizza</h2>;
  }
  ```

  * 嵌套 ≠ 在一个函数中编写另一个函数，**这样非常不好**，如以下

    ```javascript
    function App() {
      function Pizza() {
        return <h2>Pizza</h2>;
      }
      return (
        <div>
          <h1>Hello React!</h1>
          <Pizza />
        </div>
      );
    }
    ```

### 2.3 JSX 

* **JSX**: 一种声明式语法，用俩描述组件的外观以及它们如何基于其数据和逻辑工作，如圆括号中的内容：

  ```javascript
  return (
      <div>
        <h1>Hello React!</h1>
        <Pizza />
      </div>
    );
  }
  ```

  * 每个组件都要返回一个 JSX 块，React 会用于在 UI 上进行渲染
  * JSX 是 JavaScript 的扩展，用于编写 Embeded HTML
  * 每个 JSX 元素<u>会被转化</u>为一个 `React.createElement` 函数调用，因此理论上可以不使用 JSX

* **声明式** (Declarative):  基于现有数据简单地描述 UI 在任何时候应该是什么样子 => "What we want"

  * 对比 => **命令式** (Imperative): 手动操作 DOM 元素 => "How to do things"

### 2.4 Styling

* 需要使用 JavaScript Object 来定义样式
  * 第一个 `{}` 表示使用 JavaScript
  * 第二个 `{}` 表示定义一个 JS Object

```javascript
// 方式一
function Header() {
  return (
    <h1 style={{ color: "red", fontSize: "32px", textTransform: "Uppercase" }}>
      Fast React Pizza Co.
    </h1>
  );
}
// 方式二
function Header() {
  const style = {
    color: "red",
    fontSize: "48px",
    textTransform: "uppercase",
  };
  return <h1 style={style}>Fast React Pizza Co.</h1>;
}
```

* 引入外部 css 文件
  *  不能使用 `class="..."` 而是使用 `className="..."`

```javascript
import "./index.css"
```

### 2.5 Props

* 组件之间传递数据的方式 => 尤其是父组件和子组件之间的通信通道
  * 注意：传递非字符串的其它 JS 数据类型，需要通过 `{}` 还原为 JS 模式

```javascript
function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {/* Props */}
      <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
				{/* 传递非字符串的其它 JS 数据类型 */}
        price={10}
      />
    </main>
  );
}

function Pizza(props) {
  // Catch props =>
  console.log(props);
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} />
      <div>
        <h3>{props.name}</h3>
        <p>{props.ingredients}</p>
        <span>{props.price + 3}</span>
      </div>
    </div>
  );
}
```

* **Props** & **State**: React 用户渲染组件的数据主要是由 props 和 states 组成的

  * **state** 是内部组件数据，可以由组件的逻辑进行更新

  * **props** 是来自父组件 (外部) 的数据，不能被子组件修改，只能由父组件本身更新

    * => **Props is Read-only (Immutable)** 
    * React 的不变性思想：组件不应该修改其函数作用域之外定义的任何数据

    ```javascript
    // 反面例子
    let x = 7;
    funtion Component() {
      x = 23;
      return <h1>Number {x}</h1>
    }
    ```

* **One-way Data Flow**: <u>数据只能从父组件传递到子组件</u> => 通过 props 来实现

* **Destructuring**

```javascript
function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online
      </p>
      <button className="btn">order</button>
    </div>
  );
}
```

### 2.6 Rendering Lists

```javascript
<ul className="pizzas">
  {pizzaData.map((pizza) => (
    <Pizza pizzaObj={pizza} key={pizza.name} />
  )
</ul>
```

* 为什么是 `map` 而不是 `forEach` ?

  => 需要 JSX 来进行渲染，因此需要的是形成一个新的 JSX 组成的数组，而不是原来的数组

### 2.7 Conditional Redering

* 在 JSX 中不能简单地使用 `if-else`  语句

  => 在 JSX 的 JS Mode 中，其实不能写 JavaScript 代码，而是需要写一些实际上会产生值的东西

  => `if-else` 不产生值

* 三种方案

  * With `&&`

  ```javascript
  {numPizzas > 0 && (
  	<ul className="pizzas">
  		{pizzas.map((pizza) => (
  			<Pizza pizzaObj={pizza} key={pizza.name} />
  		))}
  	</ul>
  )}
  ```

  * 用三元运算符

  ```javascript
  <footer className="footer">
  	{isOpen ? (
  		<div className="order">
  			<p>We're open until {closeHour}:00. Come visit us or order online</p>
  			<button className="btn">order</button>
      </div>
  	) : (
  		<p>
  			We're happy to welcome you between {openHour}:00 and {closeHour}:00.
  		</p>
  	)}
  </footer>
  ```

  ```javascript
  // 用于有条件地设置 Class 和 Text
  <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
  ```

* Multiple Returns: 多个 Return 出口

### 2.8 React Fragments

* 不使用 `<div>` 来包裹元素，而是使用 `<>` 或者 `<React.Fragment key="...">` (用来添加 key)

```javascript
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? (
        <>
          <p>Authentic Italian cuisine.</p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
    </main>
  );
```



## 3. State, Events, and Forms

### 3.1 Handle Events

### 3.2 States

* **State**: Data that a component can hold over time. （用来承载 APP 的数据记忆）

  => **Componens's memory**

  * 功能：
    1. 更新状态 => 通过触发 React 重新渲染组件来修改组件的外观
    2. 在渲染过程中承载本地变量

* **使用**

  1. **创建**：`useState()`  => 这是一个 **Hook** (钩子函数)

     React Hook 只能在函数的顶层调用（不能在 `if` 语句、循环语句 或 另一个函数中调用）

     ```javascript
     // 默认值设置为 1
     const [step, setStep] = useState(1);
     ```

  2. **更新**：不能手动设置，而需要调用 `setStep()` => React 的 "Immutable" 思想

     ```javascript
     function handlePrevious() {
       if (step > 1) {
         setStep(step - 1);
       }
     }
     ```

     或者在 `setStep` 中传入一个回调函数（基于现有的状态来进行更新）

     ```javascript
     function handlePrevious() {
       if (step > 1) {
         setStep((prevStep) => prevStep - 1);
       }
     }
     ```

     => **最好使用传入回调函数的形式，而非直接设定值**，不然会在连续调用的时候会出现问题

* **规则**

  * **State** 在每个组件内部都是孤立的

    => 可以把整个应用程序视图 (UI) 视作关于状态的函数 `UI = f(state)`

    * 声明式的核心思想：**把 UI 视作数据随时间变化的反映 (Reflection)**

      React 通过 **state**, **event handler** 和 **JSX** 来描述这种反映过程


### 3.3 Forms

```javascript
function Form() {
  function handleSubmit(e) {
    // 防止刷新页面
    e.preventDefault();
    console.log(e);
  }

  return (
    <form className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}
```

* Controlled Element:

  * 通过 React 控制状态和整个元素

  ```java
  // 定义状态
  const [quantity, setQuantity] = useState(5);
  // 元素设置
  <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
    ...
  </select>



## 4. State Management

### 4.1 Fundamentals

* Types

  1. **local state**: 在组件中定义，只能被该组件及其子组件有权限访问
  2. **global state**: 使用 `Context API` 或 `Redux` 来定义，应用中的每个组件都能访问

  => 尽可能使用本地状态，实在不行采用全局状态

<img src="/Users/filtee/Projects/react/notes/_assets/1.png" />

* Lift state up

### 4.2 Derive State

### 4.3 Seperate Files

### 4.4 Children Props

* `props.children` 传递 tag 之间的任何内容

```javascript
function StepMessage({ step, children }) {
  <p className="message">
    <h3>...</h3>
  	{/* 这里填充 Children Props */}
  	<children>
  </p>
}
```



140e1cfde536a6612435c96caeeb7eb7*795ca9c879dc5683c17008d97cc08895
