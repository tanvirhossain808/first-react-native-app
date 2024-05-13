import { Account, Client, Storage, ID, Avatars, Databases, Query } from 'react-native-appwrite';
const client = new Client();

export const appWriteConfig = {
    endPoint: "https://cloud.appwrite.io/v1",
    platform: "com.first.native",
    projectId: "663e717600367b939b65",
    databaseId: "663e74040037037fec15",
    userCollectionId: "663e7456000fec35c172",
    // videoCollectionId: "663e74040037037fec15",
    videoCollectionId: "663e7487002d6b17470a",
    storageId: "663e77490016d6ea3f73"
}
// import SignIn from '@/app/(auth)/signin';

// Init your React Native SDK

client
    .setEndpoint(appWriteConfig.endPoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)
const storage = new Storage(client)
export const createUser = async (email: string, password: string, userName: string): Promise<void> => {
    // Register User
    /*   account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
          .then(function (response) {
              console.log(response);
          }, function (error) {
              console.log(error);
          }); */
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            userName

        )
        if (!newAccount) throw Error
        const avatarUrl = avatars.getInitials(userName)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username: userName,
                avatar: avatarUrl,
            }

        )
        return newUser
    }
    catch (error: any) {
        console.log(error);
        throw new Error(error)
    }
}


export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    }

    catch (error) {
        console.log(error);
    }

}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error
        return currentUser.documents[0]

    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const currentAccount = await account.get()
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt")]
        )
        return posts.documents
    }
    catch (error) {
        console.log(error);
        throw new Error(error)
    }
}


export const getLatestPosts = async () => {
    try {
        const currentAccount = await account.get()
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt", Query.limit(7))]
        )
        return posts.documents
    }
    catch (error) {
        console.log(error);
        throw new Error(error)
    }
}
export const searchPosts = async (query) => {
    try {
        const currentAccount = await account.get()
        console.log(currentAccount, "currentAccount");
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.search("title", query)]
        )
        return posts.documents
    }
    catch (error) {
        console.log(error);
        throw new Error(error)
    }
}
export const getUserPosts = async (userId) => {
    try {
        const currentAccount = await account.get()
        // console.log(currentAccount, "currentAccount");
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.equal("creator", userId)]

        )
        console.log('hey');
        return posts.documents
    }
    catch (error) {
        console.log(error);
        throw new Error(error)
    }
}


export const signOut = async () => {
    try {
        const session = await account.deleteSession("current")
        return session

    } catch (error) {
        throw new Error(error)
    }



}
export const getFilePreview = async (fileId, type) => {
    let fileUrl
    // console.log(fileUrl, "hey");
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appWriteConfig.storageId, fileId)
        }
        else if (type === "image") {
            fileUrl = storage.getFilePreview(appWriteConfig.storageId, fileId,
                2000, 2000, "top", 100
            )
        }
        else {
            throw new Error("Invalid file type")
        }
        if (!fileUrl) throw Error
        console.log(fileUrl, "fireurl");
        return fileUrl

    } catch (error) {

        console.log(error);
        throw new Error(error)
    }


}

export const uploadFile = async (file, type) => {

    if (!file) return;

    const asset = {

        name: file.name,
        type: file.mimeType,
        size: file.size,
        uri: file.uri,
    }

    try {
        const uploadFile = await storage.createFile(
            appWriteConfig.storageId,
            ID.unique(),
            asset
        )
        const fileUrl = await getFilePreview(uploadFile.$id, type)
        // console.log("before return");
        return fileUrl
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }


}

export const createVideo = async (form) => {
    console.log(form.thumbnailUrl);
    try {
        const [thumbnailUrl, videoUrl, ...rest] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video")
        ])
        console.log(rest, "thumbnail");
        console.log(videoUrl, "videoUrl");
        const newPost = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )
        console.log(newPost, "newPost");
        return newPost


    } catch (error) {
        // console.log(error);

    }
}


export const addBookMark = async (id) => {

    const update = await databases.updateDocument(appWriteConfig.databaseId, appWriteConfig.videoCollectionId, id, { isMarked: false })
    return update


}