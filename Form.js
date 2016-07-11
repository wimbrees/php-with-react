import React, { Component } from 'react';

var serialize = require('form-serialize');

export class Form extends Component {
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" name="titulo" ref="titulo" placeholder="titulo"/>
                <input type="text" name="duracion" ref="duracion" placeholder="duracion"/>
                <input type="submit"/>
            </form>
        );
    }

    handleSubmit(e) {        
        e.preventDefault();   
        let data = serialize(e.target, { hash: true });
        this.props.postNewMovie(data);
    }
}
