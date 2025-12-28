<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('test', function () {
    return Inertia::render('test');
})->name('test');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TaskController::class, 'index'])->name('dashboard');
    Route::post('tasks', [App\Http\Controllers\TaskController::class, 'store'])->name('tasks.store');
    Route::put('tasks/{task}', [App\Http\Controllers\TaskController::class, 'update'])->name('tasks.update');
    Route::delete('tasks/{task}', [App\Http\Controllers\TaskController::class, 'destroy'])->name('tasks.destroy');
});

require __DIR__.'/settings.php';
