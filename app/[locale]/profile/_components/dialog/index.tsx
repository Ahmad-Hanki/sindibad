import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch } from "react";
import UserForm from "../user-form";

const DialogUserData = ({
  open,
}: {
  open: boolean;
}) => {
  return (
    <div>
      <div>
        <Dialog open={open} modal={false}>
          {open && (
            <div className="fixed inset-0 z-30 h-screen w-full bg-black/80" />
          )}
          <div>
            <DialogContent className="max-w-[550px] max-h-[600px] overflow-y-auto">
              <UserForm />
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default DialogUserData;
