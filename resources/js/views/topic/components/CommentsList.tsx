import React from "react";
import Contracts from "../../../contracts/Contracts";
import Listing from "../../../utils/Listing";

interface Props {
    permalink: string,
    setListing: (listing: Listing<Contracts.Comment>) => void
}

interface State extends Contracts.ListingState<Contracts.Comment> {
}

class CommentsList extends React.Component<Props, State> {
    private listing: Listing<Contracts.Comment>;

    constructor(props: Props) {
        super(props);

        this.state = {
            items: [],
            message: null,
            next_page_url: null
        };

        this.listing = new Listing<Contracts.Comment>(`topic/${props.permalink}`, this.getListingState, this.setListingState);
        this.props.setListing(this.listing);
    }

    render(): React.ReactNode {
        const {items, message, next_page_url} = this.state;

        console.log(this.state)

        return (
            <section className="list">
                {
                    !items.length && message ?
                        (
                            <div className="card">
                                <div className="card-body">
                                    <h5 style={{textAlign: "center"}} className="card-title">{message}</h5>
                                </div>
                            </div>
                        ) : <></>
                }

                {
                    items.map(({email, text}) => {
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
                        <div style={{textAlign: "center"}}>
                            <button className="btn btn-outline-primary" onClick={this.listing.loadItems}>Ver mais
                            </button>
                        </div>
                    ) : <></>
                }
            </section>
        );
    }

    componentDidMount(): void {
        this.listing.loadItems();
    }

    private setListingState = (data: Contracts.ListingState<Contracts.Comment>) => {
        this.setState(data);
    }

    private getListingState = (): Contracts.ListingState<Contracts.Comment> => {
        return this.state;
    }
}

export default CommentsList;
