import axios, {AxiosError} from "axios";
import Contracts from "../contracts/Contracts";

class Listing<ItemType> {
    private resource: string;
    private getState: () => Contracts.ListingState<ItemType>;
    private setState: (state: Contracts.ListingState<ItemType>) => void;

    constructor(resource: string, getState: () => Contracts.ListingState<ItemType>, setState: (state: Contracts.ListingState<ItemType>) => void) {
        this.resource = resource;
        this.getState = getState;
        this.setState = setState;
    }

    public loadItems = async (): Promise<void> => {
        try {
            const {next_page_url, items} = {...this.getState()};
            const {data} = await axios.get<Contracts.APIResponse<ItemType>>(next_page_url ?? `/api/${this.resource}`);

            items.push(...data.data);

            if (!items.length) {
                this.setState({message: "Nenhum item encontrado.", items, next_page_url});
                return;
            }

            this.setState({items, next_page_url: data.next_page_url, message: null});
        } catch (error) {
            const {response} = (error as AxiosError);

            switch (response?.status) {
                case 404:
                    this.setState({message: "Nenhum item encontrado.", items: [], next_page_url: null});
                    break;

                default:
                    this.setState({message: "Por favor tente mais tarde.", items: [], next_page_url: null});
                    break;
            }
        }
    }

    public addItem = (item: ItemType): void => {
        const {items} = {...this.getState()};

        items.unshift(item);

        this.setState({...this.getState(), items});
    }
}

export default Listing;
