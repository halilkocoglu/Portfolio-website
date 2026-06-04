import { cn } from '../../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default:     'bg-gradient-to-r from-violet-700 to-pink-600 text-white shadow-md shadow-violet-500/20 hover:shadow-violet-500/35 hover:brightness-105',
        destructive: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500',
        outline:     'border-2 border-violet-300/60 bg-white/60 text-violet-700 hover:bg-violet-50 hover:border-violet-400',
        secondary:   'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/60',
        ghost:       'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        link:        'text-violet-700 underline-offset-4 hover:underline p-0 h-auto',
        'custom-bg': '',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm:      'h-9 rounded-lg px-4 text-xs',
        lg:      'h-14 rounded-2xl px-10 text-base',
        icon:    'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
