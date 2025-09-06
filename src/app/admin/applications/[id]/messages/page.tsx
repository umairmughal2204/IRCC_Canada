"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";

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
import { Loader2, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import {
  fetchMessagesAction,
  addMessageAction,
  updateMessageAction,
  deleteMessageAction,
} from "@/actions/applicationActions";

interface IMessage {
  _id: string;
  content: string;
  sentAt: string;
  readAt?: string | null;
}

export default function MessagesPage() {
  const { id: applicationId } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<IMessage | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    content: "",
    sentAt: "",
    readAt: "",
  });
  const [saving, setSaving] = useState(false);

  // Load messages
  const loadMessages = async () => {
    setLoading(true);
    try {
      const result = await fetchMessagesAction(applicationId as string);
      if (result?.data) {
        setMessages(
          result.data.map((m: any) => ({
            _id: String(m._id),
            content: m.content || "",
            sentAt: m.sentAt || new Date().toISOString(),
            readAt: m.readAt || null,
          }))
        );
      } else {
        toast({
          title: "Error",
          description: result?.error?.message?.[0] || "Failed to fetch messages",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (applicationId) loadMessages();
  }, [applicationId]);

  // Save or update
  const handleSave = async () => {
    if (!form.content.trim()) {
      toast({ title: "Validation Error", description: "Message cannot be empty", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.set("content", form.content);
      if (form.sentAt) fd.set("sentAt", form.sentAt);
      if (form.readAt) fd.set("readAt", form.readAt);

      if (editing) {
        fd.set("messageId", editing._id);
        const result = await updateMessageAction({}, applicationId as string, fd);
        if (result?.error) {
          toast({ title: "Error", description: result.error.message?.[0] || "Failed to update", variant: "destructive" });
        } else {
          toast({ title: "Success", description: "Message updated!" });
          setDialogOpen(false);
          setEditing(null);
          setForm({ content: "", sentAt: "", readAt: "" });
          await loadMessages();
        }
      } else {
        const result = await addMessageAction({}, applicationId as string, fd);
        if (result?.error) {
          toast({ title: "Error", description: result.error.message?.[0] || "Failed to add", variant: "destructive" });
        } else {
          toast({ title: "Success", description: "Message added!" });
          setDialogOpen(false);
          setForm({ content: "", sentAt: "", readAt: "" });
          await loadMessages();
        }
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  // Delete
  const handleDelete = async (mid: string) => {
    if (!mid) return;
    try {
      const result = await deleteMessageAction(applicationId as string, mid);
      if (result?.error) {
        toast({ title: "Error", description: result.error.message?.[0] || "Failed to delete", variant: "destructive" });
      } else {
        setMessages(prev => prev.filter(m => m._id !== mid));
        toast({ title: "Deleted", description: "Message removed." });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  // Filter + pagination
  const filtered = messages.filter(m => m.content.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <CardTitle>Messages</CardTitle>
        <div className="flex gap-2">
          <Input
            placeholder="Search messages..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="sm:w-64"
          />
          <Button
            onClick={() => { setEditing(null); setForm({ content: "", sentAt: "", readAt: "" }); setDialogOpen(true); }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Message
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading messages...
          </div>
        ) : (
          <Suspense fallback={<Loader2 className="animate-spin h-5 w-5" />}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead>Read At</TableHead>
                    <TableHead className="w-[140px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.length ? paginated.map((m, i) => (
                    <TableRow key={`${m._id}-${i}`}>
                      <TableCell className="font-medium">{m.content}</TableCell>
                      <TableCell>{m.sentAt ? new Date(m.sentAt).toLocaleString() : "-"}</TableCell>
                      <TableCell>{m.readAt ? new Date(m.readAt).toLocaleString() : "-"}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setEditing(m); setForm({ content: m.content, sentAt: m.sentAt || "", readAt: m.readAt || "" }); setDialogOpen(true); }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => setConfirmDeleteId(String(m._id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No messages found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Suspense>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} />
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
                  <PaginationNext onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) setDialogOpen(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Message" : "Add Message"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Message</Label>
              <Input
                id="content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="sentAt">Sent At</Label>
              <Input
                type="datetime-local"
                id="sentAt"
                value={form.sentAt ? form.sentAt.substring(0, 16) : ""}
                onChange={(e) => setForm({ ...form, sentAt: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="readAt">Read At</Label>
              <Input
                type="datetime-local"
                id="readAt"
                value={form.readAt ? form.readAt.substring(0, 16) : ""}
                onChange={(e) => setForm({ ...form, readAt: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
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
          <p>Are you sure you want to delete this message?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { if (confirmDeleteId) handleDelete(confirmDeleteId); setConfirmDeleteId(null); }}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
