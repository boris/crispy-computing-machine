/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx) {
        const url = "https://api.unminable.com/v4/address/_SOME_BTC_ADDR_?coin=BTC"

        async function gatherResponse(response) {
            const { headers } = response;
            const contentType = headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                return JSON.stringify(await response.json());
            }
            return response.text();
        }

        const init = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
        };

        const response = await fetch(url, init);
        const results = await gatherResponse(response);
        return new Response(results, init);
    },
};
