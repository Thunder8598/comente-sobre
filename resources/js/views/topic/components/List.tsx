import React from "react";

class List extends React.Component {
    render(): React.ReactNode {
        return (
            <section className="list">
                <div className="card">
                    <div className="card-body">
                        <small>teste@teste.com.br</small>
                        <p className="card-text">Último post: 11/09/2022</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <small>teste@teste.com.br</small>
                        <p className="card-text">Último post: 11/09/2022</p>
                    </div>
                </div>

                <button className="btn btn-outline-primary">Ver mais</button>
            </section>
        );
    }
}

export default List;