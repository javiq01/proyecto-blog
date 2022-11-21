import React, { Component } from "react"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import './resources/css/menu.css';
import AllPublications from "./components/AllPublications";
import NewPublication from "./components/NewPublication";

export default class App extends Component {

    constructor(props) {
        super(props);
    }
    
    printUUID=()=>{
        console.log(localStorage);
        alert(localStorage.getItem("uuid"))
    }

    signOff = () => {
        if(localStorage.getItem("uuid").length !== 0) {
            localStorage.clear();
            window.location.href="/publications";
        }
    }

    createNav = () =>{
        console.log("CREATE NAV");
        console.log(localStorage.getItem("uuid"));
        if (localStorage.getItem("uuid") === null) {
            return (
                <>
                    <NavLink className="enlace" to="/signIn" >Ingresar</NavLink>
                    <NavLink className="enlace" to="/signUp" >Registrarse</NavLink>
                </>
            );
        }else {
            return(
                <>
                    <NavLink className="enlace" onClick={this.signOff}>Salir</NavLink>
                </>
            );
        }
    }

    render() {
        return (
            <BrowserRouter>

                <nav className="menu">
                    {/* nav para las rutas establecidas */}
                    <div className="div1">
                        {/* <NavLink className="enlace" to="/" >Principal</NavLink> */}

                        <NavLink className="enlace" to="/publications" >Publicaciones</NavLink>
                        <NavLink className="enlace" to="/myPublications" >Mis Publicaciones</NavLink>

                        <NavLink className="enlace" to="/comments" >Comentarios</NavLink>
                    </div>
                    <div className="div2">
                        {this.createNav()}
                    </div>
                </nav>


                <Routes>
                    {/* rutas establecidas */}
                    <Route path="/publications" element={<AllPublications />}/>
                    <Route path="/myPublications" element={<NewPublication />}/>
                    <Route path="/comments" element={<button onClick={this.printUUID}>Mostrar UUID</button>} />
                    <Route path="/signIn" element={<Login />} /> {/*se llama a la clase Login que se encuentra en Login.jsx (renderize en el principal el formulario)  */}
                    <Route path="/signUp" element={<registrarUsuario/>} />
                    <Route path="*" element={<NotFound />} />  {/* cualquier otra ruta mostrara error. NotFound es una funcion creada con un mensaje de error(ir a NotFound.jsx) */}
                    <Route />
                </Routes>

            </BrowserRouter>

        );
    }
}