import React from "react";
import "../resources/css/publication.css"
import DeletePublication from "./DeletePublication";
import ModalApp from "./ModalApp";
export default class Publication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            title : this.props.title,
            body: this.props.body,
            showButtons: this.props.showButtons
        }
    }

    showButtons = () => {
        if (this.state.showButtons) {
            return (
                <div className="divPublicationButton">
                    <ModalApp id={this.state.id} title={this.state.title} body={this.state.body}></ModalApp>
                    <DeletePublication id={this.state.id} title={this.state.title} body={this.state.body}/>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="publication">
                <div className="" >
                    <h2>{this.state.title}</h2>
                    <p>{this.state.body}</p>
                </div>
                {this.showButtons()}
            </div>
        );
    }
}
