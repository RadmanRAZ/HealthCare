"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcnForm";
import { Input } from "@/components/ui/input";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/pation.action";
import { FormFieldType } from "./forms/PatientForm";



const RegisterForm = ({user} : {user: User}) => {

  const router = useRouter()
  const [isLoading , setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email : "",
      phone : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({name , email , phone}: z.infer<typeof UserFormValidation>) {
    
    
    setIsLoading(true)
    try {
      const userData = {name , email , phone}
      const user = await createUser(userData)

      if(user){
        router.push(`/patients/${user.$id}/register`)
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="space-y-4">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="radman"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        

        <SubmitButton isLoading = {isLoading} >Get Startted</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
