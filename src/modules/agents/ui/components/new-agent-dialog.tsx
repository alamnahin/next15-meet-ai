import { ResponsiveDialog } from "@/components/responsive-dialog";

import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewAgentDialog = ({
  open,
  onOpenChange,
}: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="New AI Secretary"
      description="Create a secretary with a custom persona to analyze and summarize your meetings."
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
