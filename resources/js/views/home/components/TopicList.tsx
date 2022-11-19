import React from "react";
import { Link } from "react-router-dom";
import Contracts from "../../../contracts/Contracts";
import Listing from "../../../utils/Listing";

interface State extends Contracts.ListingState<Contracts.Topic> { }

class TopicList extends React.Component<any, State> {
    private listing: Listing<Contracts.Topic>;

    constructor(props: any) {
        super(props);

        this.state = {
            items: [],
            message: null,
            next_page_url: null
        };

        this.listing = new Listing<Contracts.Topic>("topic", this.getListingState, this.setListingState);
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
                            <button className="btn btn-outline-primary" onClick={this.listing.loadItems}>Ver mais</button>
                        </div>
                    ) : <></>
                }
            </section>
        );
    }

    componentDidMount(): void {
        this.listing.loadItems();
    }

    private setListingState = (data: Contracts.ListingState<Contracts.Topic>): void => {
        this.setState(data);
    }

    private getListingState = (): Contracts.ListingState<Contracts.Topic> => {
        return this.state;
    }
}

export default TopicList;
