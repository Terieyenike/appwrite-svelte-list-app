// import {
//   PUBLIC_DATABASE_ID,
//   PUBLIC_COLLECTION_ID,
//   PUBLIC_PROJECT_ID,
//   PUBLIC_INSTANCE_URL,
// } from "$env/static/public";
import { Client, Databases, ID } from "appwrite";

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
  "643d4defa83ec8f41674"
);
