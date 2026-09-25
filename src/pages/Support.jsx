import React, { useState } from "react";
import { LifeBuoy, Plus, AlertTriangle, Paperclip, Send } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SUPPORT_TICKETS, TICKET_CONVERSATION } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function Support() {
  const [tickets, setTickets] = useState(SUPPORT_TICKETS);
  const [selected, setSelected] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [conv, setConv] = useState(TICKET_CONVERSATION);
  const [draft, setDraft] = useState("");
  const [subject, setSubject] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setConv((c) => [...c, { from: "you", text: draft, date: "2026-09-22 16:20" }]);
    setDraft("");
  };

  const createTicket = () => {
    setTickets((t) => [{ id: "tk-" + Date.now(), subject: subject || "New ticket", status: "open", priority: "medium", updated: "2026-09-22", messages: 1 }, ...t]);
    setNewOpen(false); setSubject("");
  };

  return (
    <div>
      <PageHeader title="Support center" subtitle="Get help from the EVRST team" icon={LifeBuoy}
        actions={<Button onClick={() => setNewOpen(true)}><Plus className="w-4 h-4 mr-2" /> New ticket</Button>} />

      {/* Security warning */}
      <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 mb-6">
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          EVRST support will <span className="font-semibold text-foreground">never</span> ask for your password, withdrawal PIN, 2FA code, private key, or seed phrase. Never share these with anyone.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ticket list */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-foreground mb-3">Your tickets</h3>
          <div className="space-y-2">
            {tickets.map((t) => (
              <button key={t.id} onClick={() => { setSelected(t); setConv(TICKET_CONVERSATION); }}
                className={cn("w-full text-left rounded-xl border p-3 transition-colors",
                  selected?.id === t.id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/30")}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground truncate">{t.subject}</span>
                  <StatusBadge status={t.status} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{t.id} · updated {t.updated} · {t.messages} msgs</div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="rounded-2xl border border-border bg-card flex flex-col h-[600px]">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{selected.subject}</h3>
                  <StatusBadge status={selected.status} />
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{selected.id} · Priority: {selected.priority}</div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
                {conv.map((m, i) => (
                  <div key={i} className={cn("flex", m.from === "you" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                      m.from === "you" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
                      <p>{m.text}</p>
                      <div className={cn("text-[10px] mt-1", m.from === "you" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <div className="flex items-end gap-2">
                  <button className="p-2.5 rounded-xl border border-border hover:bg-muted"><Paperclip className="w-4 h-4 text-muted-foreground" /></button>
                  <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a reply…" rows={1}
                    className="flex-1 resize-none rounded-xl bg-muted border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 max-h-24" />
                  <Button onClick={send} size="icon" disabled={!draft.trim()}><Send className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <LifeBuoy className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">Select a ticket</h3>
              <p className="text-sm text-muted-foreground mt-1">Choose a ticket from the list to view the conversation, or create a new one.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Create a support ticket</DialogTitle>
            <DialogDescription>Describe your issue and our team will respond shortly.</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <div><Label>Subject</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary of your issue" className="mt-1.5" /></div>
            <div><Label>Message</Label><textarea rows={4} placeholder="Describe your issue in detail…" className="w-full mt-1.5 rounded-xl bg-muted border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button onClick={createTicket}>Create ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}