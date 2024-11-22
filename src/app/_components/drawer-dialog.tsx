"use client";

import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/media-query";

type DrawerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

const DrawerDialog: React.FC<DrawerDialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Adjust the breakpoint as needed

  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent>
            <div className="max-h-[70dvh] overflow-y-auto">{children}</div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <div className="max-h-[70dvh] overflow-y-auto">{children}</div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DrawerDialog;
