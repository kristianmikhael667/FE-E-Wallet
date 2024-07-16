import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import {
  merchantRegister,
  registerSchema,
  RegisterType,
  userRegister,
} from "@/utils/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      pin: "",
      confirm_pin: "",
    },
  });

  async function onSubmit(data: RegisterType) {
    try {
      if (role == "customer") {
        const result = await userRegister(data);
        if (result.statusCode == 201) {
          toast({
            title: "Success Register Customer",
            description: `${result.message}`,
          });
          navigate("/login");
        } else {
          toast({
            title: "Register Failed Merchant",
            description: `${result.message}`,
          });
        }
      } else if (role == "merchant") {
        const result = await merchantRegister(data);
        if (result.statusCode == 201) {
          toast({
            title: "Success Register Merchant",
            description: `${result.message}`,
          });
          navigate("/login");
        } else {
          toast({
            title: "Register Failed Merchant",
            description: `${result.message}`,
          });
        }
      } else {
        toast({
          title: "Role error",
          description: "Role is required",
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
    <section className="flex flex-col w-full h-screen justify-center bg-[#464BD8]">
      <div className="flex flex-col justify-center items-center container lg:px-96 md:px-64 sm:px-32 xs:px-24">
        <div className="py-3 px-5 w-full bg-[#F3F6FF] rounded-xl">
          <div className="flex justify-center">
            <img src="/logo/logo.svg" className="flex justify-center mb-2" />
          </div>
          <Form {...form}>
            <form
              data-testid="form-login"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              {/* Section Choose Role */}
              <div className="space-y-3">
                <div className="mb-2">
                  <div className="flex flex-col space-y-1">
                    <div className="flex flex-row justify-center items-center gap-3">
                      <div
                        className={`flex-1 border-2  rounded-xl hover:border-[#464BD8] ${
                          role === "customer"
                            ? "border-[#464BD8]"
                            : "border-gray-300"
                        }`}
                        onClick={() => setRole("customer")}
                      >
                        <div className="flex flex-col space-x-3 space-y-0 p-3">
                          <div className="flex flex-col items-center justify-center font-bold text-lg lg:text-xl">
                            <img
                              src={"ImageCustomer"}
                              alt="Customer"
                              className="w-16 pb-3"
                            />
                            <p>Customer</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex-1 border-2 rounded-xl  hover:border-[#464BD8] ${
                          role === "merchant"
                            ? "border-[#464BD8]"
                            : "border-gray-300"
                        }`}
                        onClick={() => setRole("merchant")}
                      >
                        <div className="flex flex-col space-x-3 space-y-0 p-3">
                          <div className="flex flex-col items-center justify-center font-bold text-lg lg:text-xl">
                            <img
                              src={"ImageStore"}
                              alt="Merchant"
                              className="w-16 pb-3"
                            />
                            <p>Merchant</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <>
                      <Input
                        type="text"
                        data-testid="input-name"
                        placeholder="Full Name"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <FormMessage className="mt-2" />
                    </>
                  )}
                />
              </div>
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <Input
                        data-testid="input-email"
                        placeholder="Email"
                        type="email"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <FormMessage className="mt-2" />
                    </>
                  )}
                />
              </div>
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <>
                      <Input
                        data-testid="input-phone"
                        placeholder="Phone Number"
                        min={10}
                        type="number"
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
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <>
                      <Input
                        data-testid="input-pin"
                        placeholder="PIN"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <FormMessage className="mt-2" />
                    </>
                  )}
                />
              </div>
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="confirm_pin"
                  render={({ field }) => (
                    <>
                      <Input
                        data-testid="input-confirm-pin"
                        placeholder="Confirm PIN"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="text-white bg-[#464BD8] hover:bg-[#464BD8]/80 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center "
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
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
          <p className="text-end">
            <Link
              to={"/login"}
              className="text-sm text-[#737373] hover:text-black"
            >
              Already Have an Account?
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
