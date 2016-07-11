import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Form } from './Form';

export class Main extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        $.ajax({
            url: 'db.php',
            type: 'GET',
            dataType: 'json'
        })
        .done(data => {
            this.setState({
                data
            });
        });
    }

    render() {
        let movies = this.state.data.reverse().map(movie =>             
            <div className="border" key={movie.id} onClick={this.deleteMovie.bind(this, movie.id)}>
                <p>{movie.id}</p>            
                <p>{movie.titulo}</p>            
                <p>{movie.actor}</p>            
                <p>{movie.duracion}</p>            
            </div>
        );
        return (
            <div>
                <Form postNewMovie={this.postNewMovie.bind(this)}/>
                {movies}
            </div>
        );
    }

    postNewMovie(data) {
        $.ajax({
            url: 'db.php',
            type: 'POST',
            dataType: 'json',
            data
        })
        .done(data => {
            this.setState({data});
        });
    }

    deleteMovie(id) {
        $.ajax({
            url: `db.php/${id}`,
            type: 'DELETE',
            dataType: 'json'
        })
        .done(data => {
            this.setState({data});
        });
    }
}

ReactDOM.render(<Main />, document.getElementById('react-container'));
