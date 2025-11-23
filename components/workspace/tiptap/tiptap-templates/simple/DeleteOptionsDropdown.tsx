import { TrashIcon, EraserIcon } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface DeleteOptionsDropdownProps {
  onDeleteLocalDraft: () => void;
  existingDocument?: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };
  onDeleteDocument: () => void;
  isDeletingDocument: boolean;
}

export default function DeleteOptionsDropdown({
  onDeleteLocalDraft,
  existingDocument,
  onDeleteDocument,
  isDeletingDocument,
}: DeleteOptionsDropdownProps) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button size="xs" variant="destOutline">
              <TrashIcon weight="duotone" className="size-4" />
              <span className="ml-1">Delete</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete options</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="start" sideOffset={6}>
        <DropdownMenuLabel className="flex items-center gap-2">
          <TrashIcon weight="duotone" className="size-4" />
          <span className="tiptap-button-text">Delete options</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Delete local draft */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <EraserIcon weight="duotone" className="size-4 mr-2" />
              Delete Local Draft
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete local draft?</DialogTitle>
              <DialogDescription>
                This action is not reversible. Your local draft on this device
                will be permanently removed. We will restore the original
                content for this page.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={onDeleteLocalDraft}>
                  Delete draft
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete saved letter - only shown when existingDocument exists */}
        {existingDocument && (
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <TrashIcon weight="duotone" className="size-4 mr-2" />
                Delete Saved Letter
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Delete this letter?</DialogTitle>
                <DialogDescription>
                  This action is not reversible. Your saved letter will be
                  permanently removed from your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button data-style="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    data-style="primary"
                    onClick={onDeleteDocument}
                    disabled={isDeletingDocument}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeletingDocument ? "Deleting..." : "Delete letter"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
