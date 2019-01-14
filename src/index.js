// An HTML attribute, <img src="./location"></img>
// Props can be thought of as argument passed to a function

// TodoApp component will have state
// this.setState(() => {});
// this.setState({});
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            title: 'todo-app'
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    // We are not mutating the this.state.todos array.
    // State in React component should be Immutable
    handleOnSubmit(todoValue) {
        // Go and update the state
        const newTodo = [{
            id: Math.random() * 340293842,
            value: todoValue
        }];
        this.setState((currState) => ({
            todos: currState.todos.concat(newTodo)
        }));
    }
    
    render() {
        console.log(this.state);
        return (
            <div>
                <Header title={this.state.title}/>
                <AddTodo handleOnSubmit={this.handleOnSubmit}/>
                <TodoList todos={this.state.todos}/>
            </div>
        );
    }
}

// Header Component

class Header extends React.Component {
    render() {
        return (<h1>{this.props.title}</h1>)
    }
}


// eleements with state in HTML - input, textarea, checkboxes, dropdowns...etc.

// once we controle the state of a component, there is a big advantage?
// all state is getting tracked in 1 place, makes it so much easier to maintain the state
// single source of truth
// this.setState(() => {})
// this.setState({})
class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnchange = this.handleOnchange.bind(this);
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.props.handleOnSubmit(this.state.value);
        this.state.value = '';
    }

    handleOnchange(e) {
        this.setState({
            value: e.target.value
        });
    }
    

    render() {
        return (
            <div>
              <form onSubmit={this.handleOnSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleOnchange}></input>
                <button type="submit">Add</button>
              </form>
            </div>
        );
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>{this.props.todos.map(todo => <Todo key={todo.id} todo={todo}/>)}</ul>
        );
    }
}

class Todo extends React.Component {
    render() {
        return (
            <li>
                {this.props.todo.value}
                <button>Remove</button>
            </li>
        );
    }
}

const appRoot = document.getElementById('app');

ReactDOM.render(<TodoApp />, appRoot);