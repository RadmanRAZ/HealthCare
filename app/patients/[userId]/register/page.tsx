import RegisterForm from '@/components/RegisterForm'
import { getUser } from '@/lib/actions/pation.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({params : {userId}} : SearchParamProps) => {

  const user = await getUser(userId)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user = {user} />

          <div className="text-14-regular flex justify-between mt-20">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 Healthcare</p>
            <Link href="/?admin=true" className="text-green-500" >Admin</Link>
          </div>
        </div>

      </section>
      <Image
        src="/assets/images/register-img.png"
        height={10}
        width={1000}
        alt="patient"
        className="side-img max-w-[40%] !h-max"
      />
    </div>
  )
}

export default Register