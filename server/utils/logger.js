import morgan from "morgan";

morgan.token("graphql-log", (req) => {
  const { operationName, variables, query } = req.body;
  return `GRAPHQL: \nOperation Name: ${operationName} \nVariables: ${JSON.stringify(
    variables
  )} \nQuery: ${query}`;
});
