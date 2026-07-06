import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const AlertComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Alert className="max-w-md">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
