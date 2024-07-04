
export default class Env {
    private static urlData: Promise<string> | null = null;

    static async envCall(): Promise<string> {
        if (!Env.urlData) {
            Env.urlData = new Promise<string>(async (resolve, reject) => {
                try {
                    const response = await fetch('/config.json');
                    const config = await response.json();
                    resolve(config.apiUrl);
                } catch (error) {
                    reject(error);
                }
            });
        }
        return Env.urlData;
    }
}