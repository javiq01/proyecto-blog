import React from "react";
import { Component } from "react";
import "../resources/css/userForm.css";
// 2h 30min
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            key: ""
        }
    }

    setValues = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    cleanValues = () => {
        this.setState(
            {
                email: "",
                key: ""
            }
        );
    }

    signIn = (event) => {
        event.preventDefault();

        const url = "http://localhost:8080/login/signIn";
        const user = {
            email: this.state.email,
            key: this.state.key
        }
        const header = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(url, header)
            .then(response => {
                if (!response.ok) throw Error(response.status);
                return response.json();
            }
            )
            .then(json => {
                console.log(localStorage);
                localStorage.uuid = json.uuid;
                localStorage.credential = json.credential;
                localStorage.id_user = json.id;
                window.location.href="/myPublications";
            })
            .catch(error => {
                console.error(error);
                localStorage.clear(); {/*si hay un error se limpiaran las credenciales */}
                alert("Credenciales Incorrectas");
            });
        this.cleanValues();
    }



    render() {
        return (
            <> 
                <form className="form-user" onSubmit={this.signIn}>
                    <h2>Iniciar Sesion</h2>
                    <label htmlFor="email">Email</label> <br/>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="correo electronico"
                        required={true}
                        value={this.state.email}
                        onChange={this.setValues}
                    />
                    <br />
                    <br />
                    <label htmlFor="key">Contrase??a</label> <br/>
                    <input
                        type="password"
                        id="key"
                        name="key"
                        placeholder="clave"
                        required={true}
                        value={this.state.key}
                        onChange={this.setValues}
                    />
                    <div>
                        <button className="button" type="submit">Ingresar</button>
                        <button className="button" type="reset" onClick={this.cleanValues}>Limpiar</button>
                    </div>
                </form>
            </>
        );
    }
}