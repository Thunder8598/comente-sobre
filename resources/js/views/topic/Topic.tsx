import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormComment from "./components/FormComment";
import CommentsList from "./components/CommentsList";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ permalink: string }> { }

class Topic extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <main id="topic">
                <Navbar />
                <FormComment />
                <CommentsList permalink={this.props.match.params.permalink} />
            </main>
        );
    }
}

export default Topic;