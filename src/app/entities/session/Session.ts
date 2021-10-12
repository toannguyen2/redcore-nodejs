class Session {
    id: string
    // tslint:disable-next-line:variable-name
    user_id: string
    agent: string
    create_at: any

    constructor(id: string, userId: string, agent: string) {
        this.id = id;
        this.user_id = userId;
        this.agent = agent;
    }
}

export default Session;
