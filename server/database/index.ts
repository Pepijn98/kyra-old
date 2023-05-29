import mongoose from "mongoose";
import { Nitro } from "nitropack";

import { RuntimeConfig } from "~/types/general";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (_nitroApp: Nitro): Promise<void> => {
    const config = useRuntimeConfig() as RuntimeConfig;

    mongoose.set("strictQuery", true);

    try {
        await mongoose.connect(`mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}/?retryWrites=true&w=majority`, {
            dbName: config.database.name,
        });
        console.log("Connected to database");
    } catch (error) {
        console.error(error);
    }
};
