import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { SignInFlow } from "../types"
import { useState } from "react"
import { useAuthActions } from "@convex-dev/auth/react"
import { TriangleAlert } from "lucide-react"


interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}


export const SignUpCard = ({setState} : SignUpCardProps) => {
    
    const { signIn } = useAuthActions()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pending, setPending] = useState(false)
    const [error, setError] = useState("")

    const handleAuth = (value: "github" | "google") => {
        setPending(true)
        signIn(value)
            .finally(() => {
                setPending(false)
            })
    }

    const handlePasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setError("Passwords do not match.")
            return
        }

        setPending(true)
        signIn("password", { name, email, password, flow: "signUp" })
            .catch(() => {
                setError("Invalid Email & Password")
            })
            .finally(() => {
                setPending(false)
            })
    }

    return(
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Sign up to continue</CardTitle>
                <CardDescription>Use your email or another service to continue</CardDescription>
                {!!error && (
                    <div className="bg-destructive/20 p-2 rounded-md mt-2 text-destructive/100 flex items-center gap-2 text-sm">
                        <TriangleAlert size="16" />
                        {error}
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-5">
                <form className="space-y-2.5" onSubmit={handlePasswordSignUp}>
                    <Input 
                        disabled={pending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                        placeholder="Full Name"
                    />
                    <Input 
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        placeholder="Email"
                    />
                    <Input 
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        placeholder="Password"
                    />
                    <Input 
                        disabled={pending}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        required
                        placeholder="Confirm Password"
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>Sign Up</Button>
                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={pending}
                        onChange={() => handleAuth("google")}
                        variant="outline"
                        className="flex items-center relative"
                    >
                        <FcGoogle className="size-5 absolute left-3" />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        onChange={() => handleAuth("github")}
                        variant="outline"
                        className="flex items-center relative"
                    >
                        <FaGithub className="size-5 absolute left-3" />
                        Continue with GitHub
                    </Button>
                    <p className="pt-2">
                        Already have an account? <span className="text-sky-700 hover:underline cursor-pointer" onClick={() => setState("signIn")}>Sign In</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}