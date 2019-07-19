/**
 * This file was automatically generated by Nexus 0.11.7
 * Do not make changes to this file directly
 */

import * as types from "../types"


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Mutation: {};
  Post: { // root type
    content?: string | null; // String
    createdAt: any; // DateTime!
    id: string; // ID!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: any; // DateTime!
  }
  Query: {};
  Subscription: {};
  User: { // root type
    email: string; // String!
    id: string; // ID!
    name: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post'] | null; // Post
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    publish: NexusGenRootTypes['Post'] | null; // Post
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    content: string | null; // String
    createdAt: any; // DateTime!
    id: string; // ID!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: any; // DateTime!
  }
  Query: { // field return type
    feed: NexusGenRootTypes['Post'][] | null; // [Post!]
    filterPosts: NexusGenRootTypes['Post'][] | null; // [Post!]
    me: NexusGenRootTypes['User'] | null; // User
    post: NexusGenRootTypes['Post'] | null; // Post
    posts: NexusGenRootTypes['Post'][] | null; // [Post!]
  }
  Subscription: { // field return type
    posts: NexusGenRootTypes['Post'] | null; // Post
  }
  User: { // field return type
    email: string; // String!
    id: string; // ID!
    name: string; // String!
    posts: NexusGenRootTypes['Post'][] | null; // [Post!]
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createDraft: { // args
      content?: string | null; // String
      title: string; // String!
    }
    deletePost: { // args
      id?: string | null; // ID
    }
    publish: { // args
      id?: string | null; // ID
    }
  }
  Query: {
    filterPosts: { // args
      searchString?: string | null; // String
    }
    post: { // args
      id?: string | null; // ID
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Post" | "Query" | "Subscription" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: types.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}