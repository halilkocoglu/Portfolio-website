import { cn } from '../../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  // Temel sınıflar: Interactivity ve Accessibility odaklı
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        // Ana aksiyon butonu (Gradyan)
        default: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:brightness-110',
        
        // Tehlikeli işlemler
        destructive: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white',
        
        // İkincil butonu (Glassmorphism)
        outline: 'border border-purple-500/30 bg-purple-500/5 text-purple-300 hover:bg-purple-500 hover:text-white hover:border-purple-500',
        
        // Koyu arka plan butonu
        secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-white/5',
        
        // Hayalet buton (Sadece hover durumunda belirgin)
        ghost: 'text-slate-400 hover:bg-white/5 hover:text-white',
        
        // Link görünümü
        link: 'text-purple-400 underline-offset-4 hover:underline p-0 h-auto',
        
        // Senin projende kullandığın özel boş varyant
        'custom-bg': '',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-14 rounded-2xl px-10 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
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