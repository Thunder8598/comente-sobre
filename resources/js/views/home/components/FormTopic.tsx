import React from "react";
import axios, { AxiosResponse } from "axios";
import { Redirect } from "react-router-dom";
import Contracts from "../../../contracts/Contracts";

interface State {
    redirectTopic: string | null
}

class FormTopico extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            redirectTopic: null
        };
    }

    render(): React.ReactNode {
        const { redirectTopic } = this.state;

        if (redirectTopic)
            return <Redirect to={`/topic/${redirectTopic}`} />

        return (
            <section className="form-topic">
                <form className="d-flex justify-content-between" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" name="topic" className="form-control" id="txt-topico" placeholder="Crie um novo tópico" />
                    </div>
                    <button type="submit" className="btn btn-primary">Criar</button>
                </form>
            </section>
        );
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);

        try {
            const response = await axios.post<FormData, AxiosResponse<Contracts.Topic>>("/api/topic", formData);
            
            this.setState({ redirectTopic: response.data.permalink });
        } catch (error) {
            console.error(error);
        }
    }
}

export default FormTopico;