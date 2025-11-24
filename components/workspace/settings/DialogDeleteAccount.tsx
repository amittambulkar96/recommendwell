"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import { WarningCircleIcon } from "@phosphor-icons/react/dist/csr/WarningCircle";
import { useRouter } from "next/navigation";

type DialogDeleteAccountProps = {
  children?: React.ReactNode;
};

export default function DialogDeleteAccount({
  children,
}: DialogDeleteAccountProps) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      //   await deleteUser(); // Need to add logic of dleteting better auth and db user data.
      setIsDeleting(false);
      setOpen(false);
      router.push("/");
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="destructive">
            <TrashIcon size={16} weight="duotone" aria-hidden="true" />
            Delete account
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">
            Delete account?
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone. All your saved
            documents and account data will be deleted.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 rounded-md border p-3 bg-amber-50 dark:bg-amber-950/20">
          <WarningCircleIcon
            className="text-amber-600 dark:text-amber-400 shrink-0"
            size={18}
            weight="duotone"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            This will immediately sign you out and remove your account.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
