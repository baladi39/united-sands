"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type RequestProjectContextValue = {
  open: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const RequestProjectContext = createContext<RequestProjectContextValue | null>(
  null,
);

export function RequestProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openForm, closeForm }),
    [open, openForm, closeForm],
  );

  return (
    <RequestProjectContext.Provider value={value}>
      {children}
    </RequestProjectContext.Provider>
  );
}

export function useRequestProject() {
  const ctx = useContext(RequestProjectContext);
  if (!ctx)
    throw new Error(
      "useRequestProject must be used within a RequestProjectProvider",
    );
  return ctx;
}
