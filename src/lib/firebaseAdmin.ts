import admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  console.log('Firebase config check:', {
    projectId: projectId ? 'present' : 'missing',
    privateKey: privateKey ? 'present' : 'missing',
    clientEmail: clientEmail ? 'present' : 'missing'
  });

  if (!projectId || !privateKey || !clientEmail) {
    throw new Error('Missing required Firebase environment variables');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      privateKey,
      clientEmail,
    }),
  });
}

export const auth = admin.auth();

export const verifyIdToken = async (token: string) => {
  return await auth.verifyIdToken(token);
};
