import React, { Component } from 'react';

export default class TrelloComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styleStatus: {fontSize : '0.7em', color: 'red'},
            styleAction: { display: 'none' },
            edit: false,
            task: this.props.item,
        }
    }

    render() {
        return (
            <div className="trello-container">
                <div className="trello-header">
                    <span style={this.state.styleStatus}>{this.state.task.status}</span>
                    <span className="fill-remaining-space"></span>
                    <button style={ {fontSize : '0.7em' }} onClick={this.onEditOrUpdate}>{this.state.edit ? 'Enregistrer' : 'Edit'}</button>
                </div>
                <input style={ {fontSize : '0.9em' }} className="modifyTask"
                    value={this.state.task.task}
                    onChange={this.onChangeTask}/>
                <div className="trello-action" style={this.state.styleAction}>
                    <button onClick={this.onChangeStatus1}>Todo</button>
                    <button onClick={this.onChangeStatus2}>In progress</button>
                    <button onClick={this.onChangeStatus3}>Completed</button>
                    <button onClick={this.onDelete}>Delete</button>
                </div>
            </div>
        )
    }

    onDelete = (event) => {
        this.props.onDelete(this.state.task.id, this.state.task);
    }
    onEditOrUpdate = (event) => {
        if ( this.state.edit ) {
            this.props.onUpdate(this.state.task.id, this.state.task);
        }
        this.setState({ edit: !this.state.edit });
        if ( this.state.edit ) {
            this.setState({styleAction: { display: 'none' }});
        } else {
            this.setState({styleAction: {}});
        }
    }

    onChangeTask = (event) => {
        this.setState({ task: { task: event.target.value, id: this.state.task.id, status: this.state.task.status } });
    }
    onChangeStatus1 = (event) => {
        this.setState({ task: { status: 'Todo', task: this.state.task.task, id: this.state.task.id }, 
                        styleStatus: {fontSize : '0.7em', color: 'red'}
        });
    }
    onChangeStatus2 = (event) => {
        this.setState({ task: { status: 'In progress', task: this.state.task.task, id: this.state.task.id }, 
                        styleStatus: {fontSize : '0.7em', color: 'blue'}
        });
    }
    onChangeStatus3 = (event) => {
        this.setState({ task: { status: 'Completed', task: this.state.task.task, id: this.state.task.id  }, 
                        styleStatus: {fontSize : '0.7em', color: 'green'}
        });
    }

};
