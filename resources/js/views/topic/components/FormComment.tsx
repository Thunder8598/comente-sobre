import axios, {AxiosResponse} from "axios";
import React from "react";
import Contracts from "../../../contracts/Contracts";
import Listing from "../../../utils/Listing";

interface Props {
    permalink: string,
    getListing: () => Listing<Contracts.Comment> | null,
    responseTo?: number
}

class FormComment extends React.Component<Props> {
    render(): React.ReactNode {
        const {responseTo} = this.props;

        return (
            <section className="form-comment">
                <form className="d-flex flex-column justify-content-between" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control" placeholder="E-mail" required/>
                        <input type="text" name="comment" className="form-control" placeholder="Comentário" required/>
                        <input type="hidden" name="response_to" value={responseTo}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Comentar</button>
                </form>
            </section>
        );
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        evt.preventDefault();

        const listing = this.props.getListing();
        const formData = new FormData(evt.currentTarget);
        formData.append("permalink", this.props.permalink);

        try {
            const {data: comment} = await axios.post<Contracts.Comment>("/api/comment", formData);

            if (comment.response_to) {
                const mainComment = listing?.findItem(comment.response_to);

                if (!mainComment)
                    return;

                mainComment.responses.push(comment);
                listing?.replaceItem(mainComment);
                return;
            }

            listing?.addItem(comment);
        } catch (error) {
            console.error(error);
        }
    }
}

export default FormComment;
