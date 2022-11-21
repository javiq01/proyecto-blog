import React from "react";
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
        console.info(this.state);
    }

    send = (event) => {
        event.preventDefault();
        const url = "http://localhost:8080/publications/insert";
        const uuid = localStorage.getItem("uuid");
        console.log(uuid);

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
            },
            
        }
        
        fetch(url, header)
        .then(response => {
            if (!response.ok) throw Error(response.status);
            return response.json();
        }
        )
        .then(json => {
            console.log("desde new Publication en el fetch del send")
            console.log(json);
            
        })
        .catch(error => {
            console.error(error);
            localStorage.clear(); {/*si hay un error se limpiaran las credenciales */}
            alert("Credenciales Incorrectas");
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
        // console.log("render new publication");
        if (localStorage.getItem("uuid") === null) {
            return (
                <>
                    <h2>Para ver tus publicaciones debes Iniciar Sesion o Registrarte</h2>
                </>
            );
        } else {
            return (
                <>
                    <form onSubmit={this.send}>
                        <h2>Crear Publicacion</h2>
                        <label htmlFor="title">Titulo</label> <br/>
                        <input type="text" id = "title" required placeholder="titulo" value={this.state.title} onChange={this.setValues} />
                        <br/>
                        <br/>
                        <label htmlFor="body">Contenido</label> <br/>
                        <textarea name="" id="body" cols="30" rows="10" placeholder="Escriba algo aqui..." required onChange={this.setValues}></textarea>
                        <br/>
                        <button type="submit">Enviar</button>
                        <button type="reset" onClick={this.cleanValues}>Limpiar</button>
                    </form>
                </>
            );
        }
    }
}