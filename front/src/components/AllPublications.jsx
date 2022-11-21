import React from "react";
import Publication from "./Publication";
export default class AllPublications extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            publications: []
        }
    }

    componentDidMount() {
        this.findAllPublications();
        // console.log(this.state.publications)
    }

    findAllPublications = () => {
        const url = "http://localhost:8080/publications/findAll";
        fetch(url)
            .then(response => response.json())
            .then(json =>  {
                console.log("fetch findAllPublications")
                console.log(json);
                this.setState({publications : json})
            })
            .catch(error => console.error(error))
            .finally(() => console.info("FINALIZO EL LLAMADO"));

    }

    render() {
        return (
        <>
            <h2 className="titulo">Todas Las Publicaciones</h2>
            {
                this.state.publications.map(publication => 
                    <Publication title = {publication.title} body={publication.body}></Publication>
                )
            }
        </>
        );
    }
}