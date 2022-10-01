import React from "react";
import List from "../../../components/list/List";
import Contracts from "../../../contracts/Contracts";

interface Props {
    permalink: string
}

class CommentsList extends List<Contracts.Comment, Props> {
    constructor(props: Props) {
        super(props);

        this.resource = `topic/${props.permalink}`;
    }

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
                    items.map(({ email, text }) => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <small>{email}</small>
                                    <p className="card-text">{text}</p>
                                </div>
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

export default CommentsList;