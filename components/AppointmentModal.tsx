"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Appointment } from "@/types/appwrite.types";
import AppointmentForm from "./forms/AppointmentForm";

const AppointmentModal = ({
  type,
  paitentId,
  userId,
  appointmentId,
  title ,
  description
}: {
  type: "schedule" | "cancel" | "create";
  paitentId : string;
  userId : string;
  appointmentId : Appointment;
  title : string;
  description:string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"} `}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment </DialogTitle>
          <DialogDescription>
            Please fill in the following form to {type} an appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm 
          userId={userId}
          patientId={paitentId}
          type={type}
          appointment={appointmentId} 
          setOpen={setOpen}
        
        />

      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
