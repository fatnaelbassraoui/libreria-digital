import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertComponentProps {
  title: string;
  description: string;
  variant?: AlertVariant;
}

export function AlertComponent({
  title,
  description,
  variant = "info",
}: AlertComponentProps) {
  const config = {
    info: {
      icon: <Info className="h-5 w-5" />,
      className: "",
    },
    success: {
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      className: "border-green-500/30",
    },
    warning: {
      icon: <TriangleAlert className="h-5 w-5 text-yellow-500" />,
      className: "border-yellow-500/30",
    },
    error: {
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      className: "border-red-500/30",
    },
  };

  return (
    <Alert className={`max-w-md ${config[variant].className}`}>
      {config[variant].icon}

      <AlertTitle>{title}</AlertTitle>

      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
