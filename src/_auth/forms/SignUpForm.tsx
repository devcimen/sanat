import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUser, useSignInAccount } from "@/lib/react-query/queriesAndMutations"

const SignUpForm = () => {
    const { toast } = useToast();

    const { mutateAsync: createNewUserAccount, isLoading: isCreatingUser } = useCreateUser();

    const { mutateAsync: signInAccount, isLoading: isSigningIn } = useSignInAccount();

    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        const newUser = await createUserAccount(values);

        if (!newUser) {
            return toast({
                title: "Sign up failed, please try again.",
            });
        }

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        });

        if (!session) {
            return toast({
                title: "Sign in failed, please try again.",
            });
        }

        
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/SANAT.svg" alt="logo" />
                <h3 className="h4-bold md:h3-bold pt-5 sm:pt-12">Create a new account</h3>
                <p className="text-dark-3 small-medium md:base-regular mt-2">To use SANAT, please enter your details</p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" placeholder="Enter your name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" placeholder="Enter your username..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" className="shad-input" placeholder="Enter your email..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" placeholder="Enter your password..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isCreatingUser ? (
                            <div className="flex-center gap-2">
                                <Loader />
                                Loading...
                            </div>
                        ) : "Sign up"}
                    </Button>

                    <p className="text-small-regular text-dark-3 text-center mt-2">
                        Already have an account?
                        <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">
                            Log in
                        </Link>
                    </p>

                </form>
            </div>
        </Form >
    )
}

export default SignUpForm