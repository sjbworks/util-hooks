import { useEffect } from "react";
import { useLocation } from "react-router";

export const useNavigateGuard = (
  isUnsaved: boolean,
  callbacks?: {
    onCancel?: (url: string) => void;
    onConfirm?: (url: string) => void;
  }
) => {
  const location = useLocation();
  const { onCancel, onConfirm } = callbacks || {};

  const confirmLeavePage = () =>
    window.confirm(
      "You have unsaved changes. Are you sure you want to leave this page?"
    );

  const handleBlockNavigation = (nextLocation: any) => {
    if (!isUnsaved || nextLocation.pathname === location.pathname) return true;
    if (confirmLeavePage()) {
      onConfirm?.(nextLocation.pathname);
      return true;
    } else {
      onCancel?.(nextLocation.pathname);
      return false;
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isUnsaved) return;
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isUnsaved, onCancel, onConfirm, location.pathname]);

  return { handleBlockNavigation };
};
