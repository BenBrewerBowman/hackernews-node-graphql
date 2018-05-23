const { GraphQLServer } = require('graphql-yoga')


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length;

const resolvers = {

  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links, 
    link: (root, args) => {
      const id = args.id;
      return links.filter(link => {
        return link.id == id;
      })[0];
    }
  },
  Mutation: {
    createLink: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      const { id, url, description } = args;
      let link = links.filter(link => link.id == id)[0];
      if (url) link.url = url;
      if (description) link.description = description;
      return link;
    },
    deleteLink: (root, args) => {
      const id = args.id;
      const linkIndex = links.findIndex(link => link.id == id);
      const linkCopy = {...links[linkIndex]};
      links.splice(linkIndex,1);
      return linkCopy;
    }
  }
}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log("Server is running on http://localhost:4000"));
