# 02-Intermediate_React

## 1. Components, Composition, and Reusability

### 1.1 Component Catagories

* 绝大部分组件可以被划分为三类：
  1. Stateless / presentational components => 小，可复用
  2. Stateful components => 可复用
  3. Structural components => 构成结构的组件，不可复用

### 1.2 Prop Drilling

* 需要将 Props 传递很深时，非常麻烦 => 采用 Component Composition

```javascript
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
```

### 1.3 Component Composition

* 组件组合 => 更优雅的组件组合方式
  * 可以轻松改变组件内部需要展示的子组件 => 使用 `{children}` 来传递组件
  * 应用场景：
    1. 创建高度可复用和灵活的组件
    2. 解决 **Prop Drilling** 的问题

```javascript
function modal() {
  return (
  	<div className="modal">
    	<Success />
    </div>
  )
}

function success() {
  return <p>Well done!</p>
}
```

```javascript
<Modal>
  <Success />
</Modal>

function modal({children}) {
  return (
    <div>
    	{children}
    </div>
  )
}

function Success() {
  return <p>Well done!</p>
}
```

### 1.4 Props as a Component API



### 1.5 Prop Types

```javascript
import PropTypes from "prop-types";
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  message: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};
```



## 2. How React Works