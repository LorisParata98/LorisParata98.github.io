import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AppUpdateService } from '../../services/app-update.service';

@Component({
  selector: 'app-update-prompt',
  standalone: true,
  imports: [TranslocoPipe],
  template: `
    @if (updateService.updateAvailable()) {
      <div
        class="fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] bg-black border border-yellow-300 rounded-lg shadow-2xl p-4 flex flex-col gap-3 animate-slide-in"
        role="alertdialog"
        aria-live="polite"
      >
        <div class="flex flex-col gap-1">
          <h3
            class="m-0 text-sm font-bold uppercase tracking-wider text-yellow-300"
          >
            {{ 'update.title' | transloco }}
          </h3>
          <p class="m-0 text-sm text-white/70 leading-relaxed">
            {{ 'update.message' | transloco }}
          </p>
        </div>
        <div class="flex justify-end items-center gap-3">
          <button
            type="button"
            class="text-xs text-white/50 hover:text-white underline transition-colors"
            (click)="updateService.dismiss()"
          >
            {{ 'update.later' | transloco }}
          </button>
          <button
            type="button"
            class="px-3 py-1.5 rounded-md bg-yellow-300 text-black text-xs font-semibold hover:bg-yellow-400 transition-colors"
            (click)="updateService.applyUpdate()"
          >
            {{ 'update.update' | transloco }}
          </button>
        </div>
      </div>
    }
  `,
})
export class UpdatePromptComponent {
  readonly updateService = inject(AppUpdateService);
}
