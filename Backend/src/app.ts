import buildServer from "./server";

const server = buildServer();

async function main() {

    // Service initializer
    try {
        const options = {
            host: "0.0.0.0",
            port: 3001,
        };
        await server.listen(options);

        console.log("Server started at http://localhost:3001");
    } catch (e) {
        console.error(e);
    }
}

main();
