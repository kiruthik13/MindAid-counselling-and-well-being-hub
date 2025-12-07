import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function TestFirebase() {
    const testRegister = () => {
        createUserWithEmailAndPassword(auth, "test123456@gmail.com", "password123")
            .then(() => alert("User created! Check Firebase Console."))
            .catch((err) => alert(err.message));
    };

    return (
        <div className="p-10 flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Firebase Connection Test</h1>
            <button
                onClick={testRegister}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Test Firebase Signup
            </button>
            <p className="text-sm text-gray-500">
                Clicking this will attempt to create a user "test123456@gmail.com" in your Firebase Auth.
            </p>
        </div>
    );
}
