import React, { Component } from 'react';
import Task from './models.js';
import {default as UUID} from "node-uuid";
import TrelloComponent from './Trello.js';

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
        fetch('http://localhost:3001/todotasks', {method: 'GET'})
        .then(res => res.json())
        .then( data => {
            this.setState({ tasks : JSON.parse(data) });
        })
        .catch(err => {console.error('err!!!!', err);});
    }

    taskDelete(id, dTask) {

        console.log('DELETE ID=' + id);
        console.log(dTask);

        fetch('http://localhost:3001/todotask/' + id, {
            method: 'DELETE',
        }).then(res => {
            if ( res.status === 200 ){
                return res.json();
            } else {
                var error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
        } )
        .catch(err => {console.error('err', err);});


        let lTasks = [...this.state.tasks];
        lTasks.splice(lTasks.indexOf(dTask), 1);
        this.setState({
            task: new Task(),
            tasks: [...this.state.tasks, lTasks]
        });
    }

    taskUpdate(id, uTask) {
        fetch('http://localhost:3001/todotask/' + id, {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(uTask),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if ( res.status === 200 ){
                return res.json();
            } else {
                var error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
        } )
        .then(data => {
            console.log(data);
        })
        .catch(err => {console.error('err', err);});
    }

    onChange = (event) => {
        this.setState({ task: { id: UUID.v4(), task: event.target.value, status: 'Todo'} });
    }
    
    onSubmit = (event) => {
        const sendBody = JSON.stringify(this.state.task);
        console.log(sendBody);
        fetch('http://localhost:3001/todotasks', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(this.state.task),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if ( res.status === 200 ){
                return res.json();
            } else {
                var error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
        } )
        .then(data => {
            console.log(data);
            this.setState({
                task: new Task(),
                tasks: [...this.state.tasks, this.state.task]
            })
        })
        .catch(err => {console.error('err', err);});
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
