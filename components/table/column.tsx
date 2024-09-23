"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { Patient } from "@/types/appwrite.types";
import { formatDate } from "react-datepicker/dist/date_utils";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constance";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pendding" | "scheduled" | "cancelled";
  email: string;
  patient: Patient;
  schedule : Date
  primaryPhysician : string
};

export const columns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",

    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => <div className="">{formatDateTime(row.original.schedule).dateTime}</div>,
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Doctor",
    cell: ({ row }) => {

      const doctors = Doctors.find((doctor)=> doctor.name === row.original.primaryPhysician)

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctors?.image || ''}
            alt={doctors?.name || ''}
            width={100}
            height={100}
            className="size-8"

          />
          {doctors?.name}
        </div>
      )

    },
  },
  {
    id: "actions",
    header : ()=><div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return(
        <div className="flex gap-1">
          <AppointmentModal/>
        </div>
      )

    },
  },
];
