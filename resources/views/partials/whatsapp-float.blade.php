@if ($whatsappUrl = whatsapp_url(__('site.whatsapp.float_message')))
    <a href="{{ $whatsappUrl }}" target="_blank" rel="noopener noreferrer" aria-label="{{ __('site.whatsapp.label') }}"
       class="fixed bottom-5 right-5 z-[100] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:scale-110 hover:shadow-xl transition-all duration-300 active:scale-95">
        <x-icons.whatsapp class="w-7 h-7" />
    </a>
@endif
