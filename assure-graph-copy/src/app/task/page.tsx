import React from "react";
import AppLayout from "@/components/global/AppLayout";
import TaskClient from "@/components/task/TaskClient";

export default function TaskPage() {
  return (
    <AppLayout>
      <TaskClient />
    </AppLayout>
  );
}
