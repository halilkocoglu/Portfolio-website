import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from './toast';
import { useToast } from './use-toast';
import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function Toaster() {
    const { toasts } = useToast();

    // Bildirim tipine göre otomatik ikon atayan yardımcı fonksiyon
    const getIcon = (variant) => {
        switch (variant) {
            case 'destructive':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            case 'success':
                return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
            default:
                return <Info className="h-5 w-5 text-purple-500" />;
        }
    };

    return (
        <ToastProvider swipeDirection="right" duration={4000}>
            {toasts.map(({ id, title, description, action, variant, ...props }) => {
                return (
                    <Toast key={id} variant={variant} {...props} className="flex items-start gap-4">
                        {/* Sol tarafa durum ikonu eklendi */}
                        <div className="mt-1 shrink-0">
                            {getIcon(variant)}
                        </div>
                        
                        <div className="grid gap-1 flex-1">
                            {title && (
                                <ToastTitle className="text-sm font-bold text-white tracking-tight">
                                    {title}
                                </ToastTitle>
                            )}
                            {description && (
                                <ToastDescription className="text-xs text-slate-200 leading-relaxed">
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        
                        {action}
                        <ToastClose className="hover:bg-white/10 transition-colors" />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}