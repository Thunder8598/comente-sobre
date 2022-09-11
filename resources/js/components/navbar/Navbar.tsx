import React from "react";

class Navbar extends React.Component {
    render(): React.ReactNode {
        return (
            <nav className="navbar navbar-light bg-light justify-content-between shadow">
                <a className="navbar-brand">Navbar</a>
                <form className="d-flex">
                    <input className="form-control mr-sm-2" type="search" placeholder="Busca" aria-label="Busca" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Busca</button>
                </form>
            </nav>
        );
    }
}

export default Navbar;