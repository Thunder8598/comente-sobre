import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormComment from "./components/FormComment";
import CommentsList from "./components/CommentsList";
import { RouteComponentProps } from "react-router-dom";
import Listing from "../../utils/Listing";
import Contracts from "../../contracts/Contracts";

interface Props extends RouteComponentProps<{ permalink: string }> { }

class Topic extends React.Component<Props> {
    private listing: Listing<Contracts.Comment> | null;

    constructor(props: Props) {
        super(props);

        this.listing = null;
    }

    render(): React.ReactNode {
        return (
            <main id="topic">
                <Navbar />
                <FormComment permalink={this.props.match.params.permalink} getListing={this.getListing} />
                <CommentsList permalink={this.props.match.params.permalink} setListing={this.setListing} />
            </main>
        );
    }

    private setListing = (listing: Listing<Contracts.Comment>) => {
        this.listing = listing;
    }

    private getListing = () => this.listing;
}

export default Topic;