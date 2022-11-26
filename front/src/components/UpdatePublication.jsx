import React from "react";
import "../resources/css/publication.css";
export default class UpdatePublication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            title : this.props.title,
            body : this.props.body
        }
    }

    send = (event) => {
        event.preventDefault();
        const url = "http://localhost:8080/publications/update";
        const uuid = localStorage.getItem("uuid");

        const publication = {
            id: this.state.id,
            title: this.state.title,
            body: this.state.body
        }

        const header = {
            method: "PUT",
            body: JSON.stringify(publication),
            headers: {
                "Content-Type": "application/json",
                credential : uuid
            }
        }
        
        fetch(url, header)
        .then(response => {
            if (!response.ok) throw Error(response.status);
            return response.json();
        })
        .then(json => {
            console.log(json);
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
            localStorage.clear(); {/*si hay un error se limpiaran las credenciales */}
            alert("Se terminó el tiempo de la sesion. Ingrese nuevamente");
            window.location.href="/signIn";
        })
        .finally(() => console.info("FINALIZO EL LLAMADO FETCH UpdatePublication"));

        this.cleanValues();
    }

    setValues = (event) => {
        this.setState(
            { 
                [event.target.id] : event.target.value
            }
        );
    }

    cleanValues = () => {
        this.setState (
            {
                title : "",
                body :  ""
            }
        )
    }

    render() {
        return (
            
            <div className="newPublication">
                <form onSubmit={this.send}>
                    <h2 className="titulo">Editar Publicacion</h2>
                    <label htmlFor="title">Titulo</label> 
                    <br/>
                    <input type="text" id = "title" required placeholder="titulo" value={this.state.title} onChange={this.setValues} />
                    <br/>
                    <br/>
                    <label htmlFor="body">Contenido</label>
                    <br/>
                    <textarea name="" id="body" cols="43" rows="10" placeholder="Escriba algo aqui..." value={this.state.body} required onChange={this.setValues}></textarea>
                    <br/>
                    <button className="button" type="submit">Modificar</button>
                    <button className="button" type="reset" onClick={this.cleanValues}>Limpiar</button>
                </form>
            </div>
        
        );
    }
}