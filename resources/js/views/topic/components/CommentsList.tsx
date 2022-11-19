import React from "react";
import Contracts from "../../../contracts/Contracts";
import Listing from "../../../utils/Listing";
import FormComment from "./FormComment";

interface Props {
    permalink: string,
    getListing: () => Listing<Contracts.Comment> | null,
    setListing: (listing: Listing<Contracts.Comment>) => void
}

interface State extends Contracts.ListingState<Contracts.Comment> {
    anwser: number | null,
    showResponses: boolean
}

class CommentsList extends React.Component<Props, State> {
    private listing: Listing<Contracts.Comment>;

    constructor(props: Props) {
        super(props);

        this.state = {
            items: [],
            message: null,
            next_page_url: null,
            anwser: null,
            showResponses: false
        };

        this.listing = new Listing<Contracts.Comment>(`topic/${props.permalink}`, this.getListingState, this.setListingState);
        this.props.setListing(this.listing);
    }

    render(): React.ReactNode {
        const {permalink, getListing} = this.props;
        const {items, message, next_page_url, anwser, showResponses} = this.state;

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
                    items.map(({id, email, text, responses}) => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <small>{email}</small>
                                    <p className="card-text">{text}</p>
                                    <button className="btn btn-link"
                                            onClick={() => this.setState({anwser: id})}>Responder
                                    </button>

                                    <button className="btn btn-link"
                                            onClick={() => this.setState({showResponses: !showResponses})}>Ver respostas
                                    </button>

                                    {
                                        showResponses ?
                                            (
                                                <div>
                                                    {
                                                        responses.map(({email, text}) => (
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <small>{email}</small>
                                                                    <p className="card-text">{text}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ) : <></>
                                    }

                                </div>

                                {
                                    anwser && anwser == id ?
                                        <FormComment permalink={permalink} getListing={getListing}
                                                     responseTo={anwser}/> : <></>
                                }

                            </div>
                        );
                    })
                }

                {next_page_url ?
                    (
                        <div style={{textAlign: "center"}}>
                            <button className="btn btn-outline-primary"
                                    onClick={this.listing.loadItems}>Ver mais
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
