import React from "react";
import MyPublications from "./MyPublications";
export default class NewPublication extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            body :  ""
        }
    }

    cleanValues = () => {
        this.setState (
            {
                title : "",
                body :  ""
            }
        )
    }
    setValues = (event) => {
        this.setState(
            { 
                [event.target.id] : event.target.value
            }
        );
    }

    send = (event) => {
        event.preventDefault();
        const url = "http://localhost:8080/publications/insert";
        const uuid = localStorage.getItem("uuid");

        const publication = {
            title: this.state.title,
            body: this.state.body
        }

        const header = {
            method: "POST",
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
        .finally(() => console.info("FINALIZO EL LLAMADO FETCH newPublication"));



        // .then(json => {
        //     console.log("dentro del fetch");
        //     console.log(json);
        //     this.setState( { usuarios : [...this.state.usuarios, json] /*this.state.usuarios.push(json)*/ })
        // })
        
        this.cleanValues();
    }


    render() {
        if (localStorage.getItem("uuid") === null) {
            return (
                <>
                    <h2 className="titulo">Para ver tus publicaciones debes Iniciar Sesion o Registrarte</h2>
                </>
            );
        } else {
            return (
                <>  <div className="newPublication">
                            <h2 className="titulo">Crear Publicacion</h2>
                        <form onSubmit={this.send}>
                            <label htmlFor="title">Titulo</label> <br/>
                            <input type="text" id = "title" required placeholder="titulo" value={this.state.title} onChange={this.setValues} />
                            <br/>
                            <br/>
                            <label htmlFor="body">Contenido</label> <br/>
                            <textarea name="" id="body" cols="43" rows="10" placeholder="Escriba algo aqui..." value={this.state.body} required onChange={this.setValues}></textarea>
                            <br/>
                            <button className="button" type="submit">Enviar</button>
                            <button className="button" type="reset" onClick={this.cleanValues}>Limpiar</button>
                        </form>
                    </div>
                    
                    {/* SE LISTAN TODAS LAS PUBLICACIONES DEL USUARIO LOGEADO */}
                    <MyPublications/>
                </>
            );
        }
    }
}