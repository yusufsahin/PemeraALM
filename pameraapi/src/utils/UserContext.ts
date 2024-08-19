class UserContext {
    private static userId: string | null = null;

    static setUserId(id: string) {
        this.userId = id;
    }

    static getUserId(): string {
        return this.userId || 'system'; // Fallback to 'system' if no user is identified
    }

    static clear() {
        this.userId = null;
    }
}

export default UserContext;

