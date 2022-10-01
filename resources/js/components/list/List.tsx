import React from "react";
import axios, { AxiosError } from "axios";
import Contracts from "../../contracts/Contracts";

interface State<I> {
    items: I[],
    next_page_url: string | null,
    message: string | null
}

abstract class List<I, P = any> extends React.Component<P, State<I>>{
    protected resource: string = "";

    constructor(props: P) {
        super(props);

        this.state = {
            items: [],
            next_page_url: null,
            message: null
        }
    }

    componentDidMount(): void {
        this.loadItems();
    }

    protected loadItems = async (): Promise<void> => {
        try {
            const { next_page_url, items } = this.state;
            const { data } = await axios.get<Contracts.APIResponse<I>>(next_page_url ?? `/api/${this.resource}`);

            items.push(...data.data);

            if (!items.length) {
                this.setState({ message: "Nenhum item encontrado." });
                return;
            }

            this.setState({ items, next_page_url: data.next_page_url, message: null });
        } catch (error) {
            const { response } = (error as AxiosError);

            switch (response?.status) {
                case 404:
                    this.setState({ message: "Nenhum item encontrado." });
                    break;

                default:
                    this.setState({ message: "Por favor tente mais tarde." });
                    break;
            }
        }
    }
}

export default List;