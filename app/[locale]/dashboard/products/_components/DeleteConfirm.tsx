// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteCategory } from "../../categories/_api/delete-category";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function DeleteConfirm({
  open,
  setOpen,
  data,
  local,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: { id: string };
  local: string;
}) {
  const t = useTranslations("dashboard");
  const { mutateAsync } = useDeleteCategory({
    mutationConfig: {
      onSuccess: () => {},
    },
  });
  return (
    <div>
      <Dialog open={open} modal={false}>
        {open && (
          <div className="fixed inset-0 z-30 h-screen w-full bg-black/80" />
        )}
        <div>
          <DialogContent>
            <DialogHeader
              className={`${
                local == "ar" ? " sm:text-right " : " sm:text-left "
              }`}
            >
              <DialogTitle>{t("deleteConfirmation")}</DialogTitle>
              <DialogDescription>
                {t("deleteConfirmationText")}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-x-4  ">
              <DialogClose onClick={() => setOpen(false)}>
                {" "}
                {t("deleteConfirmationCancel")}
              </DialogClose>
              <Button
                onClick={async () => {
                  await mutateAsync({ CategoryId: data.id });
                }}
              >
                {t("deleteConfirmationConfirm")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
