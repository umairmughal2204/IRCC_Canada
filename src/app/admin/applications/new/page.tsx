"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

import { createApplicationAction } from "@/actions/applicationActions";
import { ApplicationStatus, BiometricsStatus } from "@/types/application";

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
          <Button
            variant="secondary"
            onClick={() => router.push("/admin/applications")}
          >
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

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter applicant email"
              />
              {errorFor("email") && (
                <p className="text-sm text-red-500">{errorFor("email")}</p>
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
                <p className="text-sm text-red-500">
                  {errorFor("applicationType")}
                </p>
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
                <p className="text-sm text-red-500">
                  {errorFor("applicationNumber")}
                </p>
              )}
            </div>

            {/* Applicant Name */}
            <div className="space-y-2">
              <Label htmlFor="applicantName">
                Applicant Name / Principal Applicant
              </Label>
              <Input
                id="applicantName"
                name="applicantName"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter applicant name"
              />
              {errorFor("applicantName") && (
                <p className="text-sm text-red-500">
                  {errorFor("applicantName")}
                </p>
              )}
            </div>

            {/* Date of Submission */}
            <div className="space-y-2">
              <Label htmlFor="dateOfSubmission">
                Date of Application Submission
              </Label>
              <Input
                id="dateOfSubmission"
                name="dateOfSubmission"
                type="date"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
              />
              {errorFor("dateOfSubmission") && (
                <p className="text-sm text-red-500">
                  {errorFor("dateOfSubmission")}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status of Application</Label>
              <select
                id="status"
                name="status"
                className="w-full rounded-md border-none shadow-sm bg-gray-50 dark:bg-gray-700 p-2"
                required
                defaultValue={ApplicationStatus.Approved}
              >
                {Object.values(ApplicationStatus).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errorFor("status") && (
                <p className="text-sm text-red-500">{errorFor("status")}</p>
              )}
            </div>

            {/* UCI */}
            <div className="space-y-2">
              <Label htmlFor="uniqueClientIdentifier">
                Unique Client Identifier (UCI)
              </Label>
              <Input
                id="uniqueClientIdentifier"
                name="uniqueClientIdentifier"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter UCI"
              />
              {errorFor("uniqueClientIdentifier") && (
                <p className="text-sm text-red-500">
                  {errorFor("uniqueClientIdentifier")}
                </p>
              )}
            </div>

            {/* Biometrics */}
            <div className="space-y-2">
              <Label htmlFor="biometricsNumber">Biometrics Number</Label>
              <Input
                id="biometricsNumber"
                name="biometricsNumber"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter biometrics number"
              />
              {errorFor("biometrics.number") && (
                <p className="text-sm text-red-500">
                  {errorFor("biometrics.number")}
                </p>
              )}
              {errorFor("biometricsNumber") && (
                <p className="text-sm text-red-500">
                  {errorFor("biometricsNumber")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBiometrics">
                Date of Biometrics Enrolment
              </Label>
              <Input
                id="dateOfBiometrics"
                name="dateOfBiometrics"
                type="date"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
              />
              {errorFor("biometrics.enrolmentDate") && (
                <p className="text-sm text-red-500">
                  {errorFor("biometrics.enrolmentDate")}
                </p>
              )}
              {errorFor("dateOfBiometrics") && (
                <p className="text-sm text-red-500">
                  {errorFor("dateOfBiometrics")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                required
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
              />
              {errorFor("biometrics.expiryDate") && (
                <p className="text-sm text-red-500">
                  {errorFor("biometrics.expiryDate")}
                </p>
              )}
              {errorFor("expiryDate") && (
                <p className="text-sm text-red-500">{errorFor("expiryDate")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="biometricsStatus">Status of Biometrics</Label>
              <select
                id="biometricsStatus"
                name="biometricsStatus"
                className="w-full rounded-md border-none shadow-sm bg-gray-50 dark:bg-gray-700 p-2"
                defaultValue={BiometricsStatus.Completed}
              >
                {Object.values(BiometricsStatus).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errorFor("biometrics.status") && (
                <p className="text-sm text-red-500">
                  {errorFor("biometrics.status")}
                </p>
              )}
              {errorFor("biometricsStatus") && (
                <p className="text-sm text-red-500">
                  {errorFor("biometricsStatus")}
                </p>
              )}
            </div>

            {/* ---------------- New 7 Fields ---------------- */}
            <div className="space-y-2">
              <Label htmlFor="reviewOfEligibility">Review of Eligibility</Label>
              <Input
                id="reviewOfEligibility"
                name="reviewOfEligibility"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter review of eligibility"
              />
              {errorFor("reviewOfEligibility") && (
                <p className="text-sm text-red-500">
                  {errorFor("reviewOfEligibility")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="medical">Medical</Label>
              <Input
                id="medical"
                name="medical"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter medical status"
              />
              {errorFor("medical") && (
                <p className="text-sm text-red-500">{errorFor("medical")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">Documents</Label>
              <Input
                id="documents"
                name="documents"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter documents status"
              />
              {errorFor("documents") && (
                <p className="text-sm text-red-500">{errorFor("documents")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interview">Interview</Label>
              <Input
                id="interview"
                name="interview"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter interview status"
              />
              {errorFor("interview") && (
                <p className="text-sm text-red-500">{errorFor("interview")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="biometricsStatusText">
                Biometrics Status Text
              </Label>
              <Input
                id="biometricsStatusText"
                name="biometricsStatusText"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter biometrics status text"
              />
              {errorFor("biometricsStatusText") && (
                <p className="text-sm text-red-500">
                  {errorFor("biometricsStatusText")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundCheck">Background Check</Label>
              <Input
                id="backgroundCheck"
                name="backgroundCheck"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter background check status"
              />
              {errorFor("backgroundCheck") && (
                <p className="text-sm text-red-500">
                  {errorFor("backgroundCheck")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="finalDecision">Final Decision</Label>
              <Input
                id="finalDecision"
                name="finalDecision"
                className="border-none shadow-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Enter final decision"
              />
              {errorFor("finalDecision") && (
                <p className="text-sm text-red-500">
                  {errorFor("finalDecision")}
                </p>
              )}
            </div>
            {/* ---------------- End New Fields ---------------- */}

            {/* General Error */}
            {"message" in (formState.error ?? {}) && (
              <p className="text-sm text-red-500">
                {(formState.error as any).message?.[0]}
              </p>
            )}

            <CardFooter className="flex justify-end border-none">
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
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
