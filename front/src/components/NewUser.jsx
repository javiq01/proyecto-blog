import React from "react";
import { Component } from "react";
import "../resources/css/userForm.css";

export default class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            key: "",
            keyConfirm: ""
        }
    }

    // {
    //     "email": "user4@gmail.com",
    //     "key": "12348569",
    //     "active": false
    // }

    setValues = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    cleanValues = () => {
        this.setState(
            {
                email: "",
                key: "",
                keyConfirm: ""
            }
        );
    }

    signIn = (email, key) => {
        const url = "http://localhost:8080/login/signIn";
        const user = {
            email: email,
            key: key
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
                localStorage.uuid = json.uuid;
                localStorage.credential = json.credential;
                localStorage.id = json.id;
                window.location.href="/myPublications";
            })
            .catch(error => {
                console.error(error);
                localStorage.clear(); {/*si hay un error se limpiaran las credenciales */}
                alert("Credenciales Incorrectas");
            });
    }

    insertUser = (event) => {
        event.preventDefault();
        if (this.state.key === this.state.keyConfirm) {
            const url = "http://localhost:8080/users/insert";

            const user = {
                email: this.state.email,
                key: this.state.key,
                active: true
            }

            const header = {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
                
            }
            
            fetch(url, header)
            .then(response => {
                if (!response.ok) throw Error(response.status);
                return response.json();
            }
            )
            .then(json => {
                console.log(json);
                this.signIn(json.email, json.key);
            })
            .catch(error => {
                console.error(error);
                localStorage.clear(); {/*si hay un error se limpiaran las credenciales */}
                this.cleanValues();
                alert("Usuario ya existente");
            })
            .finally(() => console.info("FINALIZO EL LLAMADO FETCH newUSER"));
        } else {
            alert("La Confirmacion de su contraseña no concide. Intente de nuevo");
            this.cleanValues();
        }
    }


    render() {
        return (
            <> 
                <form className="form-user" onSubmit={this.insertUser}>
                    <h2>Registrarse</h2>
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
                    <label htmlFor="key">Contraseña</label> <br/>
                    <input
                        type="password"
                        id="key"
                        name="key"
                        placeholder="clave"
                        required={true}
                        value={this.state.key}
                        onChange={this.setValues}
                    />
                    <label htmlFor="keyConfirm">Confirme su contraseña</label> <br/>
                    <input
                        type="password"
                        id="keyConfirm"
                        name="key"
                        placeholder="clave"
                        required={true}
                        value={this.state.keyConfirm}
                        onChange={this.setValues}
                    />
                    <div>
                        <button className="button" type="submit">Registrarse</button>
                        <button className="button" type="reset" onClick={this.cleanValues}>Limpiar</button>
                    </div>
                </form>
            </>
        );
    }
}