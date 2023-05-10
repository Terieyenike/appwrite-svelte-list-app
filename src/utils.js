import {
  PUBLIC_DATABASE_ID,
  PUBLIC_COLLECTION_ID,
  PUBLIC_PROJECT_ID,
  PUBLIC_INSTANCE_URL,
} from "$env/static/public";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

const databases = new Databases(client);

client.setEndpoint(PUBLIC_INSTANCE_URL).setProject(PUBLIC_PROJECT_ID);

export const create = (data) =>
  databases.createDocument(
    PUBLIC_DATABASE_ID,
    PUBLIC_COLLECTION_ID,
    ID.unique(),
    data
  );

export const getList = databases.listDocuments(
  PUBLIC_DATABASE_ID,
  PUBLIC_COLLECTION_ID
);

export const deleteList = (database_id, collection_id, data) =>
  databases.deleteDocument(database_id, collection_id, data);
