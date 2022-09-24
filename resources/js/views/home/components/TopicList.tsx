import React from "react";
import List from "../../../components/list/List";
import { Link } from "react-router-dom";

interface Topic {
    title: string,
    permalink: string
}

class TopicList extends List<Topic>{
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
                    items.map(({ title, permalink }) => {
                        return (
                            <div className="card">
                                <Link to={`/topic/${permalink}`}>
                                    <div className="card-body">
                                        <h5 className="card-title">{title}</h5>
                                        <p className="card-text">Último post: 11/09/2022</p>
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