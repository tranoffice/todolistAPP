import React, { Component } from 'react';
import Task from './models.js';
import {default as UUID} from "node-uuid";
import TrelloComponent from './Trello.js';
import { getTodoTasks } from './apiCall.js';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styleCreate: {display: 'none'},
            styleAsk: {},
            openCreate: false,
            task: new Task(),
            tasks: [{ id: UUID.v4(), task: 'Bonjour, ajoutez votre première tâche !', status: 'Todo'}]
        };
        this.taskDelete = this.taskDelete.bind(this);
        this.taskUpdate = this.taskUpdate.bind(this);
    }
    
    componentDidMount() {
        this.taskSelectAll();
    }

    taskSelectAll() {
        console.log('-----------------------------???');
        fetch('http://127.0.0.1:3001/todotasks', {method: 'GET'}).then(res => res.json())
        .then( data => {
            this.setState({ tasks : data });
            console.log('-----------------------------');
            console.log(this.state.tasks);
        })
        .catch(err => {console.error('err!!!!', err);});
    }

    taskDelete(id, dTask) {
        let lTasks = [...this.state.tasks];
        lTasks.splice(lTasks.indexOf(dTask), 1);
        console.log(lTasks);
        this.setState({
            task: new Task(),
            tasks: this.state.tasks.filter(el => el !== dTask)
        });
                console.log(this.state.tasks);
    }
    taskUpdate(id, uTask) {
        console.log('---Update Task-' + id);
        console.log(uTask);
    }

    onChange = (event) => {
        this.setState({ task: { id: UUID.v4(), task: event.target.value, status: 'Todo'} });
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            task: new Task(),
            tasks: [...this.state.tasks, this.state.task]
        });
    }
    onCancel = (event) => {
        event.preventDefault();
        this.setState({
            styleCreate: {display: 'none'},
            styleAsk: {},
        });
    }
    
    openCreate = (event) => {
        event.preventDefault();
        this.setState({ styleCreate: {}, styleAsk: {display: 'none'} });
    }

    render() {
        return (
            <div className="todolist-container">
                <div className="todolist-title">
                    <span>Tâches du jour :</span>
                </div>

                { this.state.tasks.map((item, index) => 
                    <TrelloComponent item={item} key={index} 
                        onDelete={this.taskDelete}
                        onUpdate={this.taskUpdate}
                    /> ) }

                <div style={this.state.styleCreate}>
                    <div className="createForm">
                        <input className="inputTask" placeholder="Décrire votre tâche ..." value={this.state.task.task} onChange={this.onChange} />
                    </div>
                    <div>
                        <button onClick={this.onSubmit}>Ajouter</button>
                        <button onClick={this.onCancel}>Annuler</button>
                    </div>
                </div>
                <div style={this.state.styleAsk} className="openCreate" onClick={this.openCreate}>
                    <button>+ Ajouter une tâche ...</button>
                </div>
            </div>
        );
    }
}