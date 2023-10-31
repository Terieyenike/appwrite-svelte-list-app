import { Client, Databases, ID, Query } from "appwrite";

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("643d4be3528806b2dd88");

export const create = (data) =>
  databases.createDocument(
    "643d4ddb5fed74d34e7a",
    "643d4defa83ec8f41674",
    ID.unique(),
    data
  );

export const getList = databases.listDocuments(
  "643d4ddb5fed74d34e7a",
  "643d4defa83ec8f41674",
  [Query.orderDesc("$createdAt")]
);

export const deleteList = (database_id, collection_id, data) =>
  databases.deleteDocument(database_id, collection_id, data);
