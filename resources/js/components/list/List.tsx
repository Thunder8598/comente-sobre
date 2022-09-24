import React from "react";
import axios, { AxiosError } from "axios";

interface State<I> {
    items: I[],
    next_page_url: string | null,
    message: string | null
}

interface APIResponse<I> {
    current_page: number,
    data: I[],
    first_page_url: string,
    from: number,
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
}

abstract class List<I> extends React.Component<any, State<I>>{
    protected resource: string = "";

    constructor(props: any) {
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
            const { data } = await axios.get<APIResponse<I>>(next_page_url ?? `/api/${this.resource}`);

            items.push(...data.data);

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