import { useEffect } from "react";

interface LoadingOverlayProps {
    isLoading: boolean;
    message?: string;
}

export function LoadingOverlay({ isLoading, message = "Carregando..." }: LoadingOverlayProps) {
    useEffect(() => {
        if (!isLoading) return;

        const body = document.body;
        const currentLocks = Number(body.dataset.loadingLocks ?? "0");

        body.dataset.loadingLocks = String(currentLocks + 1);
        if (currentLocks === 0) {
            body.style.overflow = "hidden";
        }

        return () => {
            const activeLocks = Number(body.dataset.loadingLocks ?? "1") - 1;
            if (activeLocks <= 0) {
                delete body.dataset.loadingLocks;
                body.style.overflow = "";
                return;
            }

            body.dataset.loadingLocks = String(activeLocks);
        };
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className="absolute h-screen inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-background/85 backdrop-blur-sm">
            <img
                src="/logo.svg"
                alt="CoinSphere"
                className="h-14 w-14 animate-spin"
                style={{ animationDuration: "1.2s" }}
            />
            <span className="text-sm font-medium text-foreground/90">{message}</span>
        </div>
    );
}