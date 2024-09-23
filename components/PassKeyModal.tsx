"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const PassKeyModal = () => {
  const router = useRouter();
  const [Open, setOpen] = useState(true);
  const [change, setchange] = useState("");
  const path = usePathname()
  const [error , setError] = useState("");


  const encrypteedKey = typeof window !== "undefined" ? localStorage.getItem('accessKey') :null


  useEffect(() => {

    const accsessKey = encrypteedKey && decryptKey(encrypteedKey)
    if(path){

      if(accsessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
        router.push('/admin')
        setOpen(false)
      }
      else{
        setOpen(true)
      }
    }

    
  }, [encrypteedKey]);


  const validatePasskey = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
    e.preventDefault();
    if(change === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
      const encryptrfKey = encryptKey(change)
      localStorage.setItem('accessKey' , encryptrfKey)

      setOpen(false)
    }
    else{
      setError("Invalid passkey , please try again")
    }
  }


  const closeModal = () => {
    setOpen(false);

    router.push("/");
  };

  return (
    <AlertDialog open={Open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Accsess Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To accsess the admin page , please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP maxLength={6} value={change} onChange={(change)=>setchange(change)} >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4 flex justify-center" >{error}</p>}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction onClick={(e)=>validatePasskey(e)} className="shad-primary-btn w-full">Enter Admin Passkey</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
