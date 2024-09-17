import RegisterForm from '@/components/RegisterForm'
import { getUser } from '@/lib/actions/pation.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({params : {userId}} : SearchParamProps) => {

  const user = await getUser(userId)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 py-10">
          <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user = {user} />

            <p className="copyright py-12">© 2024 Healthcare</p>
        </div>

      </section>
      <Image
        src="/assets/images/register-img.png"
        height={10}
        width={1000}
        alt="patient"
        className="side-img max-w-[40%]"
      />
    </div>
  )
}

export default Register