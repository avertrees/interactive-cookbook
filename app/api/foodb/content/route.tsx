import { NextRequest, NextResponse } from "next/server";
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { firebaseConfig } from '@/firebase.config'
// https://dev.to/reeshee/how-to-use-firebase-storage-to-upload-and-retrieve-files-in-nextjs-pages-router-2p16
async function filePOST(request: NextRequest, res: NextResponse) {
  // Initialize the Firebase app with the provided configuration
  const app = initializeApp(firebaseConfig)
  // Get a reference to the Firebase Storage and parse the request data as a FormData object
  const storage = getStorage(app)
  // More code to handle uploads incoming...
}

async function fileGET(request: NextRequest) {
  // Extract the 'file' parameter from the request URL.
  const file = '/data/content.json' //request.query.file
  // Check if the 'image' parameter exists in the URL.
  if (file && typeof file === 'string') {
    try {
      // Initialize the Firebase app with the provided configuration.
      const app = initializeApp(firebaseConfig)
      // Get a reference to the Firebase storage.
      const storage = getStorage(app)
      // Create a reference to the specified file in storage.
      const fileRef = ref(storage, file)
      console.log("fileRef is: ", fileRef)
      // Get the download URL of the file.
      const filePublicURL = await getDownloadURL(fileRef)
      console.log("filePublicURL is: ", filePublicURL)
      // Return a JSON response with the file's public URL and a 200 status code.
      return NextResponse.json(filePublicURL, { status: 200 })
    } catch (e: any) {
      // If an error occurs, log the error message and return a JSON response with a 500 status code.
      const error = e.message || e.toString()
      console.log(error)
      return NextResponse.json(error, { status: 200 })
    }
  }
  // If the 'file' parameter is not found in the URL, return a JSON response with a 400 status code.
  return NextResponse.json({ error: 'Invalid Request' }, { status: 400 })
}

export const GET = async (
  request: NextRequest
) => {
  return await fileGET(request)
}


// // Disable parsing the body by Next.js default behavior
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }
