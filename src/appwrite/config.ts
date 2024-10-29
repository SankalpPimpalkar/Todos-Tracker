const config = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectionListsId: String(process.env.NEXT_PUBLIC_APPWRITE_LISTS_COLLECTION_ID),
    appwriteCollectionTodosId: String(process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID),
}

export default config;