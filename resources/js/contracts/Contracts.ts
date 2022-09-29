namespace Contracts {
    export interface Topic {
        id: number,
        title: string,
        permalink: string,
        created_at: string | null,
        updated_at: string | null
    }
}

export default Contracts;