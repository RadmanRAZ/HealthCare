import AppointmentForm from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import { getPatient } from "@/lib/actions/pation.action";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({params :{userId}}:SearchParamProps ) {

    const patient = await getPatient(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm 
            type = "create"
            userId = {userId}
            patientId = {patient.$id}

          />
          

            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 Healthcare</p>
        </div>

      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[395px] bg-bottom"
      />
    </div>
  );
}
