import React from "react";
import List from "../../../components/list/List";
import { Link } from "react-router-dom";
import Contracts from "../../../contracts/Contracts";

class TopicList extends List<Contracts.Topic>{
    protected resource: string = "topic";

    render(): React.ReactNode {
        const { items, message, next_page_url } = this.state;

        return (
            <section className="list">
                {
                    !items.length && message ?
                        (
                            <div className="card">
                                <div className="card-body">
                                    <h5 style={{ textAlign: "center" }} className="card-title">{message}</h5>
                                </div>
                            </div>
                        ) : <></>
                }

                {
                    items.map(({ title, permalink, updated_at }) => {
                        return (
                            <div className="card">
                                <Link to={`/topic/${permalink}`}>
                                    <div className="card-body">
                                        <h5 className="card-title">{title}</h5>
                                        <p className="card-text">{updated_at ? `Último post: ${new Date(updated_at).toLocaleDateString()}` : ""}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                }

                {next_page_url ?
                    (
                        <div style={{ textAlign: "center" }}>
                            <button className="btn btn-outline-primary" onClick={this.loadItems}>Ver mais</button>
                        </div>
                    ) : <></>
                }
            </section>
        );
    }
}

export default TopicList;