import React from "react";
import "../resources/css/publication.css"
import Publication from "./Publication";
export default class MyPublications extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            publications: []
        }
    }

    componentDidMount() {
        this.findMyPublications();
    }

    findMyPublications = () => {
        const id_user = localStorage.getItem("id_user");
        const url = "http://localhost:8080/publications/findByUserId/" + id_user;

        // const header = {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         credential : uuid
        //     },
            
        // }

        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log("fetch findMyPublications")
                console.log(json);
                this.setState({publications : json})
            })
            .catch(error => console.error(error))
            .finally(() => console.info("FINALIZO EL LLAMADO A fetch MyPublications"));
    }

    imprimir = () => {
        if (this.state.publications.length > 0) {
            return (
                <>
                    {
                        this.state.publications.map(publication => 
                            <Publication id={publication.id} title={publication.title} body={publication.body} showButtons={true}></Publication>
                        )
                    }
                </>
            );
        } else {
            return (
                <div>
                    <h3 className="titulo"> No tienes publicaciones creadas</h3>
                </div>

            );
        }
    }
    render() {
        return (
            <>
                
            <div className= "Mis publicaciones">
                <h2 className="titulo">Mis Publicaciones</h2>
                {this.imprimir()}
            </div>
                
            </>
        );
    }
}