import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { login, logout, create_user } from "@/api/users";

export default function LoginCard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    return (
        <Card className="m-20 w-96">
            <CardHeader>
                <CardTitle className="text-center">{message || "Welcome"}</CardTitle>
            </CardHeader>
            <CardContent>
                <input
                    className="w-full mb-4 p-2 bg-[#FDDA25] rounded"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full mb-4 p-2 bg-[#FDDA25] rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <div className="Login-Logout mb-6">
                    <button
                        className="w-32 p-2 mb-4 border rounded-xl"
                        onClick={() => {
                            login(username, password).then((res) => {
                                console.log(res);
                                setMessage(res.message);
                            });
                        }}
                    >
                        Log in
                    </button>
                    <button
                        className="w-32 p-2 border rounded-xl"
                        onClick={async () => {
                            logout().then((res) => {
                                console.log(res);
                                setMessage(res.message);
                            });
                        }}
                    >
                        Log Out
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="mb-4">Are you new?</h1>
                    <button
                        className="w-40 p-3 border rounded-xl"
                        onClick={() => {
                            create_user(username, password).then((res) => {
                                console.log(res);
                                setMessage(res.message);
                            });
                        }}
                    >
                        Create User
                    </button>
                </div>
            </CardFooter>
        </Card>
    );
}