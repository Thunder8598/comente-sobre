import axios, { AxiosResponse } from "axios";
import React from "react";
import Contracts from "../../../contracts/Contracts";
import Listing from "../../../utils/Listing";

interface Props {
    permalink: string,
    getListing: () => Listing<Contracts.Comment> | null
}

class FormComment extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <section className="form-comment">
                <form className="d-flex flex-column justify-content-between" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control" placeholder="E-mail" required />
                        <input type="text" name="comment" className="form-control" placeholder="Comentário" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Comentar</button>
                </form>
            </section>
        );
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);
        formData.append("permalink", this.props.permalink);

        try {
            const response = await axios.post<Contracts.Comment>("/api/comment", formData);

            this.props.getListing()?.addItem(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

export default FormComment;