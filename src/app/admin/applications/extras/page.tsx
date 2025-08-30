"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// ✅ Import server actions
import {
  fetchSecurityQuestionsAction,
  addSecurityQuestionAction,
  updateSecurityQuestionAction,
  deleteSecurityQuestionAction,
} from "@/actions/applicationActions";

// Security Question interface
interface ISecurityQuestion {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export default function SecurityQuestionsPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<ISecurityQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ISecurityQuestion | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({ question: "", answer: "" });
  const [saving, setSaving] = useState(false);

  // 🔹 Replace with actual applicationId (from props/context/auth)
  const applicationId = "replace-with-real-application-id";

  const loadQuestions = async () => {
    setLoading(true);
    const result = await fetchSecurityQuestionsAction(applicationId);

    if (result?.data) {
      // ✅ Ensure mapped into correct type
      setQuestions(
        result.data.map((q: any) => ({
          _id: q._id.toString(),
          question: q.question,
          answer: q.answer,
          createdAt: q.createdAt || new Date().toISOString(),
        }))
      );
    } else {
      toast({
        title: "Error",
        description: result?.error?.message?.[0] || "Failed to fetch questions",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      if (editing) {
        const fd = new FormData();
        fd.set("questionId", editing._id);
        fd.set("newAnswer", form.answer);

        const result = await updateSecurityQuestionAction({}, applicationId, fd);

        if (result?.error) {
          toast({ title: "Error", description: result.error.message?.[0], variant: "destructive" });
        } else {
          toast({ title: "Success", description: "Security answer updated!" });
          setDialogOpen(false);
          await loadQuestions();
        }
      } else {
        const fd = new FormData();
        fd.set("question", form.question);
        fd.set("answer", form.answer);

        const result = await addSecurityQuestionAction({}, applicationId, fd);

        if (result?.error) {
          toast({ title: "Error", description: result.error.message?.[0], variant: "destructive" });
        } else {
          toast({ title: "Success", description: "Security question added!" });
          setDialogOpen(false);
          await loadQuestions();
        }
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteSecurityQuestionAction(applicationId, id);
    if (result?.error) {
      toast({ title: "Error", description: result.error.message?.[0], variant: "destructive" });
    } else {
      setQuestions((prev) => prev.filter((q) => q._id !== id));
      toast({ title: "Deleted", description: "Question removed." });
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  // Filtering + Pagination
  const filtered = questions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <CardTitle>Security Questions</CardTitle>
        <div className="flex gap-2">
          <Input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="sm:w-64"
          />
          <Button
            onClick={() => {
              setEditing(null);
              setForm({ question: "", answer: "" });
              setDialogOpen(true);
            }}
          >
            Add Question
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Loading questions...
          </div>
        ) : (
          <Suspense fallback={<Loader2 className="animate-spin h-5 w-5" />}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Answer</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[140px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.length > 0 ? (
                    paginated.map((q) => (
                      <TableRow key={q._id}>
                        <TableCell className="font-medium">{q.question}</TableCell>
                        <TableCell>{q.answer}</TableCell>
                        <TableCell>{new Date(q.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditing(q);
                                setForm({ question: q.question, answer: q.answer });
                                setDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => setConfirmDeleteId(q._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No security questions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Suspense>
        )}

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>

      {/* Add/Edit Question Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Security Answer" : "Add Security Question"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {!editing && (
              <div>
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                />
              </div>
            )}
            <div>
              <Label htmlFor="answer">Answer</Label>
              <Input
                id="answer"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this security question?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDeleteId) handleDelete(confirmDeleteId);
                setConfirmDeleteId(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
