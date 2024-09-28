import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';


class App extends Component {
constructor(props) {
	super(props);
	this.state = {
	items: [],
	itemsToShow: "all",
	id: uuidv4(),
	item: '',
	editItem: false,
	};
}

componentDidMount() {
    document.title = "My Todo List App Using React";
}

handleChange = event => {
	this.setState({
	item: event.target.value
	});
}

handleSubmit = event => {
	event.preventDefault();
	
	const newItem = {
	id: this.state.id,
	title: this.state.item,
	completed: false
	};
	
	const updatedItems = [...this.state.items, newItem];

	if (this.state.item.length > 0) {
	this.setState({
		items: updatedItems,
		id: uuidv4(),
		item: '',
		editItem: false
	});
	}
}

updateTodosToShow = string => {
	this.setState({
	itemsToShow: string
	});
};

handleDoneTask = id => {
	const filteredItems = this.state.items.map(item => {
	if (item.id === id) {
		item.completed = !item.completed;
	}
	return item;
	});

	this.setState({
	items: filteredItems,
	});
}

handleDelete = id => {
	const filteredItems = this.state.items.filter(item => item.id !== id);

	this.setState({
	items: filteredItems
	});
}

handleEdit = id => {
	const filteredItems = this.state.items.filter(item => item.id !== id);

	const selectedItem = this.state.items.find(item => item.id === id);

	this.setState({
	items: filteredItems,
	id: id,
	item: selectedItem.title,
	editItem: true
	});
}

handleDeleteDoneTasks = () => {
	const filteredItems = this.state.items.filter(item => !item.completed);

	this.setState({
	items: filteredItems
	});
}

clearList = () => {
	this.setState({
	items: []
	});
}

render() {
	let items = [];

	if (this.state.itemsToShow === "all") {
	items = this.state.items;
	} else if (this.state.itemsToShow === "todo") {
	items = this.state.items.filter(item => !item.completed);
	} else if (this.state.itemsToShow === "done") {
	items = this.state.items.filter(item => item.completed);			
	}

	return (
	<div className="container">
		<div className="row">
		<div className="col-10 col-md-8 mx-auto mt-4">
		<h3 className="text-capitalize text-center" style={{ fontWeight: 'bold' }}>
		To Do List App
		<i style={{ color: 'rgb(164, 2, 164)', fontSize: '10px', padding: '0px 10px' }}>Alpha 0.01</i>
		</h3>

			<TodoInput
			item={this.state.item}
			handleChange={this.handleChange}
			handleSubmit={this.handleSubmit}
			/>
			<TodoList
			items={items}
			filterDoneTasks={this.filterDoneTasks}
			clearList={this.clearList}
			handleDelete={this.handleDelete}
			handleEdit={this.handleEdit}
			handleDoneTask={this.handleDoneTask}
			handleDeleteDoneTasks={this.handleDeleteDoneTasks}
			updateTodosToShow={this.updateTodosToShow}
			/>
		</div>
		</div>
	</div>
	);
}
}

export default App;
