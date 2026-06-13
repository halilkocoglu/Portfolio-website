@extends('layouts.app')

@php
    $title = '404 - ' . __('site.meta.site_name');
@endphp

@section('content')
    <section class="flex flex-1 items-center justify-center px-4 py-24 text-center">
        <div class="max-w-lg">
            <p class="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-7xl font-extrabold text-transparent">
                404
            </p>
            <h1 class="mt-3 text-2xl font-bold text-slate-900">
                {{ __('errors.404.title') }}
            </h1>
            <p class="mt-3 text-slate-600">
                {{ __('errors.404.message') }}
            </p>
            <a href="{{ url('/') }}"
               class="mt-7 inline-block rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-7 py-3 font-semibold text-white transition hover:opacity-90">
                {{ __('errors.404.home') }}
            </a>
        </div>
    </section>
@endsection
