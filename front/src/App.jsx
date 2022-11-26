import React, { Component } from "react"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import './resources/css/menu.css';
import AllPublications from "./components/AllPublications";
import NewPublication from "./components/NewPublication";
import NewUser from "./components/NewUser";

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
                    <Route path="/" element={<AllPublications />}/>
                    <Route path="/myPublications" element={<NewPublication />}/>
                    <Route path="/comments" element={<button onClick={this.printUUID}>Mostrar UUID</button>} />
                    <Route path="/signIn" element={<Login />} /> {/*se llama a la clase Login que se encuentra en Login.jsx (renderize en el principal el formulario)  */}
                    <Route path="/signUp" element={<NewUser/>} />
                    <Route path="*" element={<NotFound />} />  {/* cualquier otra ruta mostrara error. NotFound es una funcion creada con un mensaje de error(ir a NotFound.jsx) */}
                    <Route />
                </Routes>

            </BrowserRouter>

        );
    }
}

// node-v16.17.0 se actualizo a node-v18.12.1
// 8.15.0 npm

/* ERROR
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
*/

//SOLUCION
/*
"scripts": {
    se cambio:
    "start": "react-scripts start"
    "build": "react-scripts build"
    
    por:
   "start": "SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts start",
   "build": "SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts build"
 }
*/
// https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported
// https://stackoverflow.com/questions/69719601/getting-error-digital-envelope-routines-reason-unsupported-code-err-oss
