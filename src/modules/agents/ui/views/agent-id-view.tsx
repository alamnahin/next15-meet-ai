"use client";

import { toast } from "sonner";
import { useState } from "react";
import { VideoIcon, BrainIcon, MessageSquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/use-confirm";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { UpdateAgentDialog } from "../components/update-agent-dialog";
import { AgentIdViewHeader } from "../components/agent-id-view-header";

interface Props {
  agentId: string;
};

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions(),
        );
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingCount} associated meetings`,
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <div>
                <h2 className="text-2xl font-medium">{data.name}</h2>
                <p className="text-sm text-muted-foreground">AI Meeting Secretary</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <VideoIcon className="text-blue-700" />
                {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings"} analyzed
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-x-3 rounded-lg bg-blue-50 border border-blue-100 p-4">
                <BrainIcon className="size-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Auto-summarizes meetings</p>
                  <p className="text-xs text-blue-700 mt-1">
                    After each call ends, this secretary generates a structured summary using its persona instructions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-x-3 rounded-lg bg-blue-50 border border-blue-100 p-4">
                <MessageSquareIcon className="size-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Answers questions post-meeting</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Use the &ldquo;Ask AI&rdquo; tab on any completed meeting to chat with this secretary about what was discussed.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Persona & Instructions
              </p>
              <p className="text-neutral-800 leading-relaxed">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Secretary"
      description="This may take a few seconds"
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Secretary"
      description="Something went wrong"
    />
  )
}