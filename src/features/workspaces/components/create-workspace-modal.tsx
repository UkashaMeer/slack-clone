"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"

export const CreateWorkspaceModel = () => {
    const [open, setOpen] = useCreateWorkspaceModal()

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create A Workspace</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}