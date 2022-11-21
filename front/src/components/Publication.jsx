import React from "react";
import "../resources/css/publication.css"
export default class Publication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title : this.props.title,
            body: this.props.body
        }
    }

    render() {
        return (
            <div className="publication">
                <h2>{this.state.title}</h2>
                <p>{this.state.body}</p>
            </div>
        );
    }
}
