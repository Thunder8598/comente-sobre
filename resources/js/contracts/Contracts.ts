namespace Contracts {
    export interface ListingState<I> {
        items: I[],
        next_page_url: string | null,
        message: string | null
    }

    export interface APIResponse<I> {
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

    export interface Topic {
        id: number,
        title: string,
        permalink: string,
        created_at: string | null,
        updated_at: string | null
    }

    export interface Comment {
        id: number,
        created_at: string,
        email: string,
        text: string,
        topic: string,
        updated_at: string,
    }
}

export default Contracts;