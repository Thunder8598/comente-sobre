import React from "react";

class List extends React.Component {
    render(): React.ReactNode {
        return (
            <section className="list">
                <div className="card">
                    <a href="">
                        <div className="card-body">
                            <h5 className="card-title">Tópico</h5>
                            <p className="card-text">Último post: 11/09/2022</p>
                        </div>
                    </a>
                </div>

                <div className="card">
                    <a href="">
                        <div className="card-body">
                            <h5 className="card-title">Tópico</h5>
                            <p className="card-text">Último post: 11/09/2022</p>
                        </div>
                    </a>
                </div>

                <button className="btn btn-outline-primary">Ver mais</button>
            </section>
        );
    }
}

export default List;