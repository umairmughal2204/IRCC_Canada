"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react"; // adjust import if needed
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { createApplicationAction } from "@/actions/applicationActions"; // you will create this

interface FieldErrors {
  [key: string]: string[];
}

interface FormState {
  error?: FieldErrors | { message?: string[] };
  data?: any;
}

const initialState: FormState = {
  error: {},
};

export default function ApplicationForm() {
  const router = useRouter();
  const [formState, dispatch, isPending] = useActionState(
    createApplicationAction,
    initialState
  );

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const errorFor = (field: string) => {
    return formState.error &&
      typeof formState.error === "object" &&
      field in formState.error
      ? (formState.error as FieldErrors)[field]?.[0]
      : null;
  };

  useEffect(() => {
    if (formState.data && !formState.error) {
      setSuccessDialogOpen(true);
    }

    if (formState.error && "message" in formState.error) {
      toast({
        title: "Error",
        description:
          (formState.error as any).message?.[0] || "Something went wrong",
        variant: "destructive",
      });
    }
  }, [formState]);

  return (
    <>
      <Card className="max-w-3xl mx-auto shadow-lg bg-white dark:bg-gray-800 pt-4">
        <CardHeader className="flex items-center justify-between border-none">
          <CardTitle>Create / Update Application</CardTitle>
          <Button variant="secondary" onClick={() => router.push("/admin/applications")}>
            Back to Applications
          </Button>
        </CardHeader>

        <CardContent>
          <form action={dispatch} className="space-y-6 max-w-2xl mx-auto">
            {/* User Name */}
            <div className="space-y-2">
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                name="userName"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter user name"
              />
              {errorFor("userName") && (
                <p className="text-sm text-red-500">{errorFor("userName")}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter password"
              />
              {errorFor("password") && (
                <p className="text-sm text-red-500">{errorFor("password")}</p>
              )}
            </div>

            {/* Application Type */}
            <div className="space-y-2">
              <Label htmlFor="applicationType">Application Type</Label>
              <Input
                id="applicationType"
                name="applicationType"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Type of application"
              />
              {errorFor("applicationType") && (
                <p className="text-sm text-red-500">{errorFor("applicationType")}</p>
              )}
            </div>

            {/* Application Number */}
            <div className="space-y-2">
              <Label htmlFor="applicationNumber">Application Number</Label>
              <Input
                id="applicationNumber"
                name="applicationNumber"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter application number"
              />
              {errorFor("applicationNumber") && (
                <p className="text-sm text-red-500">{errorFor("applicationNumber")}</p>
              )}
            </div>

            {/* Applicant Name / Principal Applicant */}
            <div className="space-y-2">
              <Label htmlFor="applicantName">Applicant Name / Principal Applicant</Label>
              <Input
                id="applicantName"
                name="applicantName"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter applicant name"
              />
              {errorFor("applicantName") && (
                <p className="text-sm text-red-500">{errorFor("applicantName")}</p>
              )}
            </div>

            {/* Date of Submission */}
            <div className="space-y-2">
              <Label htmlFor="dateOfSubmission">Date of Application Submission</Label>
              <Input
                id="dateOfSubmission"
                name="dateOfSubmission"
                type="date"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
              />
              {errorFor("dateOfSubmission") && (
                <p className="text-sm text-red-500">{errorFor("dateOfSubmission")}</p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status of Application</Label>
              <Input
                id="status"
                name="status"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Pending / Approved / Rejected"
              />
              {errorFor("status") && (
                <p className="text-sm text-red-500">{errorFor("status")}</p>
              )}
            </div>

            {/* Messages */}
            <div className="space-y-2">
              <Label htmlFor="messages">Messages (Send / Read Status)</Label>
              <Textarea
                id="messages"
                name="messages"
                rows={3}
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter messages or status"
              />
              {errorFor("messages") && (
                <p className="text-sm text-red-500">{errorFor("messages")}</p>
              )}
            </div>

            {/* UCI */}
            <div className="space-y-2">
              <Label htmlFor="uci">Unique Client Identifier (UCI)</Label>
              <Input
                id="uci"
                name="uci"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter UCI"
              />
              {errorFor("uci") && (
                <p className="text-sm text-red-500">{errorFor("uci")}</p>
              )}
            </div>

            {/* Biometrics */}
            <div className="space-y-2">
              <Label htmlFor="biometricsNumber">Biometrics Number</Label>
              <Input
                id="biometricsNumber"
                name="biometricsNumber"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter biometrics number"
              />
              {errorFor("biometricsNumber") && (
                <p className="text-sm text-red-500">{errorFor("biometricsNumber")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBiometrics">Date of Biometrics Enrolment</Label>
              <Input
                id="dateOfBiometrics"
                name="dateOfBiometrics"
                type="date"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
              />
              {errorFor("dateOfBiometrics") && (
                <p className="text-sm text-red-500">{errorFor("dateOfBiometrics")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
              />
              {errorFor("expiryDate") && (
                <p className="text-sm text-red-500">{errorFor("expiryDate")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="biometricStatus">Status of Biometrics</Label>
              <Input
                id="biometricStatus"
                name="biometricStatus"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Pending / Completed"
              />
              {errorFor("biometricStatus") && (
                <p className="text-sm text-red-500">{errorFor("biometricStatus")}</p>
              )}
            </div>

            {/* General Error */}
            {"message" in (formState.error ?? {}) && (
              <p className="text-sm text-red-500">
                {(formState.error as any).message?.[0]}
              </p>
            )}

            <CardFooter className="flex justify-end border-none">
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Saving..." : "Save Application"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <p>Application saved successfully!</p>
          <DialogFooter>
            <Button
              onClick={() => {
                setSuccessDialogOpen(false);
                router.push("/admin/applications");
              }}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
