import React from "react";

export default class DeletePublication extends React.Component {
    constructor(props) {
        super(props);
    }


    deletePublication = () => {
        let quiereEliminar = window.confirm("¿Esta seguro que desea eliminar esta publicacion?");
        if (quiereEliminar) {
            const uuid = localStorage.getItem("uuid");
            const url = "http://localhost:8080/publications/delete";

            const publication = {
                id: this.props.id,
                title : this.props.title,
                body : this.props.body
            }

            const header = {
                method: "DELETE",
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
                alert("No se puede realizar esta accion debido a que se terminó el tiempo de la sesion. Ingrese nuevamente");
                window.location.href="/signIn";
            })
            .finally(() => console.info("FINALIZO EL LLAMADO FETCH deletePublication"));
        }
    }

    render() {
        return (
            <>
                <button className="publicationButton button" onClick={this.deletePublication}>eliminar</button>
            </>
        );
    }
 }