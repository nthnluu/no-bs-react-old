import fetch from "isomorphic-unfetch";
import {Client, defaultExchanges, subscriptionExchange, Provider} from "urql";
import {SubscriptionClient} from "subscriptions-transport-ws";
import ws from "isomorphic-ws";
import {ReactNode} from "react";
import jwt from "jsonwebtoken";

const WithGraphQL = ({children, user}: { children: ReactNode; user: any;}) => {
    const session = false
    const newToken = user.token


    const subscriptionClient = new SubscriptionClient(
        process.env.NEXT_PUBLIC_WS_URL,
        {
            reconnect: true,
            connectionParams: {
                headers: {
                    Authorization: `Bearer ${newToken}`
                }
            },
        },
        ws
    );

    const client = new Client({
        url: process.env.NEXT_PUBLIC_API_URL,
        fetch,
        fetchOptions: {
            headers: {
                Authorization: `Bearer ${newToken}`
            }

        },
        requestPolicy: "cache-and-network",
        exchanges: [
            ...defaultExchanges,
            subscriptionExchange({
                forwardSubscription(operation) {
                    return subscriptionClient.request(operation);
                },
            }),
        ],
    });

    return <Provider value={client}>{children}</Provider>;
};

export default WithGraphQL;