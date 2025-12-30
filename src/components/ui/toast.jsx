import { cn } from '../../lib/utils';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import React from 'react';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[380px]',
            className,
        )}
        {...props}
    />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
    // Radix animasyonları ve projenin glassmorphism temasıyla birleştirilmiş temel sınıflar
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-2xl border p-5 pr-8 shadow-2xl transition-all backdrop-blur-md data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
    {
        variants: {
            variant: {
                // Başarılı/Bilgi mesajları için mor tema
                default: 'bg-slate-900/90 border-purple-500/30 text-white shadow-purple-500/10',
                // Hata mesajları için kırmızı tema
                destructive: 'destructive group border-red-500/50 bg-red-950/90 text-red-50 shadow-red-500/10',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(toastVariants({ variant }), className)}
            {...props}
        />
    );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Action
        ref={ref}
        className={cn(
            'inline-flex h-8 shrink-0 items-center justify-center rounded-lg border bg-transparent px-3 text-xs font-bold ring-offset-background transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:pointer-events-none disabled:opacity-50',
            className,
        )}
        {...props}
    />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Close
        ref={ref}
        className={cn(
            'absolute right-2 top-2 rounded-lg p-1 text-white/50 opacity-0 transition-opacity hover:text-white focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
            className,
        )}
        toast-close=""
        {...props}
    >
        <X className="h-4 w-4" />
    </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Title
        ref={ref}
        className={cn('text-sm font-bold tracking-tight', className)}
        {...props}
    />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Description
        ref={ref}
        className={cn('text-xs opacity-80 leading-relaxed', className)}
        {...props}
    />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
};