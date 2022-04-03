import React, { Component } from "react";
import {Link} from "react-router-dom";


export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>DOGS</h1>
                    <h3>Bienvenidos a mi super pagina</h3>
                </div>
                <br />
                <br />
                <br />
                
                <Link to = "/home">
                    ENTER
                </Link>
            </div>
        )
    }
};