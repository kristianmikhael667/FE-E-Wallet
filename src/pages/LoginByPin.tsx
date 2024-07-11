import { zodResolver } from "@hookform/resolvers/zod";
import { loginByPinSchema, LoginByPinType, userLogin } from "@/utils/api/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ChangeEvent } from "react";
import Logo from "../assets/logo/logo.svg";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useToken } from "@/utils/contexts/useToken";

const LoginByPin = () => {
  const { toast } = useToast();
  const { changeToken } = useToken();

  const form = useForm<LoginByPinType>({
    resolver: zodResolver(loginByPinSchema),
    defaultValues: {
      phone: "",
      pin: "",
    },
  });

  async function onSubmit(data: LoginByPinType) {
    try {
      const result = await userLogin(data);
      if (result.statusCode == 201) {
        console.log(result.data.user.full_name);

        toast({
          title: "Success Login",
          description: `Hello, ${result.data.user.full_name} welcome back!`,
        });
        changeToken(result.data.token);
      } else {
        toast({
          title: "Failed Login",
          description: `${result.message}`,
        });
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <section className="flex h-screen items-center justify-center bg-primary-first">
      <div className="container">
        <div className="p-20 mobile:p-5 w-full bg-[#F3F6FF] rounded-xl">
          <div className="flex justify-center">
            <img src={Logo} className="flex justify-center mb-5" />
          </div>
          <Form {...form}>
            <form
              data-testid="form-login"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <>
                      <Input
                        data-testid="input-phone"
                        placeholder="+62xxxxxxxx"
                        type="text"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <FormMessage className="mt-2" />
                    </>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <>
                      <Input
                        data-testid="input-pin"
                        placeholder="******"
                        maxLength={6}
                        type="password"
                        onInput={(e: ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          field.onChange(e);
                        }}
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <FormMessage className="mt-2" />
                    </>
                  )}
                />
              </div>
              <Button
                data-testid="btn-submit"
                type="submit"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className="text-white bg-primary-first hover:bg-[#464BD8]/80 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <div
                      className="inline-block mr-2 h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-white dark:text-white"
                      role="status"
                    ></div>
                    Loading
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
          <p className="text-end mt-2">
            Baru di AltaPay?{" "}
            <Link
              to={"/register"}
              className="text-lg font-semibold text-[#737373] hover:text-black"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginByPin;
