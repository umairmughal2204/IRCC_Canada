"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import LoadingSkeleton from "./loading";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  fetchApplicationByIdAction,
  updateApplicationAction,
} from "@/actions/applicationActions";
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

export default function EditApplicationForm() {
  const { id } = useParams();
  const router = useRouter();
  const appId = id as string;

  const [formState, dispatch, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) => {
      return await updateApplicationAction(prevState, appId, formData);
    },
    initialState
  );

  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const errorFor = (field: string) => {
    return formState.error &&
      typeof formState.error === "object" &&
      field in formState.error
      ? (formState.error as FieldErrors)[field]?.[0]
      : null;
  };

  // Load application data
  useEffect(() => {
    async function loadApplication() {
      const res = await fetchApplicationByIdAction(appId);
      if (res.data) {
        const data = {
          ...res.data,
          dateOfSubmission: res.data.dateOfSubmission
            ? new Date(res.data.dateOfSubmission).toISOString().split("T")[0]
            : "",
          biometrics: {
            number: res.data.biometrics?.number || "",
            enrolmentDate: res.data.biometrics?.enrolmentDate
              ? new Date(res.data.biometrics.enrolmentDate)
                  .toISOString()
                  .split("T")[0]
              : "",
            expiryDate: res.data.biometrics?.expiryDate
              ? new Date(res.data.biometrics.expiryDate)
                  .toISOString()
                  .split("T")[0]
              : "",
            status: res.data.biometrics?.status || "",
          },
          messages: res.data.messages || "",
          uniqueClientIdentifier: res.data.uniqueClientIdentifier || "",
        };
        setApplication(data);
      }
      setLoading(false);
    }
    loadApplication();
  }, [appId]);

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

  if (loading) return <LoadingSkeleton />;
  if (!application)
    return <p className="text-red-500">Application not found.</p>;

  return (
    <>
      <Card className="max-w-3xl mx-auto shadow-lg bg-white dark:bg-gray-800 pt-4">
        <CardHeader className="flex items-center justify-between border-none">
          <CardTitle>Edit Application</CardTitle>
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
                defaultValue={application.userName}
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
                defaultValue={application.password}
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
                defaultValue={application.email}
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
                defaultValue={application.applicationType}
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
                defaultValue={application.applicationNumber}
              />
              {errorFor("applicationNumber") && (
                <p className="text-sm text-red-500">
                  {errorFor("applicationNumber")}
                </p>
              )}
            </div>

            {/* Applicant Name */}
            <div className="space-y-2">
              <Label htmlFor="applicantName">Applicant Name</Label>
              <Input
                id="applicantName"
                name="applicantName"
                required
                defaultValue={application.applicantName}
              />
              {errorFor("applicantName") && (
                <p className="text-sm text-red-500">
                  {errorFor("applicantName")}
                </p>
              )}
            </div>

            {/* Date of Submission */}
            <div className="space-y-2">
              <Label htmlFor="dateOfSubmission">Date of Submission</Label>
              <Input
                id="dateOfSubmission"
                name="dateOfSubmission"
                type="date"
                defaultValue={application.dateOfSubmission}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={application.status}
                className="w-full p-2 rounded-md"
              >
                {Object.values(ApplicationStatus).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* NEW FIELDS */}
            <div className="space-y-2">
              <Label htmlFor="reviewOfEligibility">Review of Eligibility</Label>
              <Textarea
                id="reviewOfEligibility"
                name="reviewOfEligibility"
                defaultValue={application.reviewOfEligibility}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medical">Medical</Label>
              <Textarea
                id="medical"
                name="medical"
                defaultValue={application.medical}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">Documents</Label>
              <Textarea
                id="documents"
                name="documents"
                defaultValue={application.documents}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interview">Interview</Label>
              <Textarea
                id="interview"
                name="interview"
                defaultValue={application.interview}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biometricsStatusText">
                Biometrics Status Text
              </Label>
              <Textarea
                id="biometricsStatusText"
                name="biometricsStatusText"
                defaultValue={application.biometricsStatusText}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundCheck">Background Check</Label>
              <Textarea
                id="backgroundCheck"
                name="backgroundCheck"
                defaultValue={application.backgroundCheck}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="finalDecision">Final Decision</Label>
              <Textarea
                id="finalDecision"
                name="finalDecision"
                defaultValue={application.finalDecision}
              />
            </div>

            {/* Messages */}
            {/* <div className="space-y-2">
              <Label htmlFor="messages">Messages</Label>
              <Textarea
                id="messages"
                name="messages"
                defaultValue={application.messages}
              />
            </div> */}

            {/* UCI */}
            <div className="space-y-2">
              <Label htmlFor="uci">Unique Client Identifier (UCI)</Label>
              <Input
                id="uci"
                name="uci"
                defaultValue={application.uniqueClientIdentifier}
              />
            </div>

            {/* Biometrics */}
            <div className="space-y-2">
              <Label htmlFor="biometricsNumber">Biometrics Number</Label>
              <Input
                id="biometricsNumber"
                name="biometricsNumber"
                defaultValue={application.biometrics?.number}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBiometrics">
                Biometrics Enrolment Date
              </Label>
              <Input
                id="dateOfBiometrics"
                name="dateOfBiometrics"
                type="date"
                defaultValue={application.biometrics?.enrolmentDate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Biometrics Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                defaultValue={application.biometrics?.expiryDate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biometricStatus">Biometrics Status</Label>
              <select
                id="biometricStatus"
                name="biometricStatus"
                defaultValue={application.biometrics?.status}
                className="w-full p-2 rounded-md"
              >
                {Object.values(BiometricsStatus).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Saving..." : "Update Application"}
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
          <p>Application updated successfully!</p>
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
