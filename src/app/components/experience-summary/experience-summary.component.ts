import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  Chart,
  Filler,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Subscription } from 'rxjs';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
);

@Component({
  selector: 'app-experience-summary',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './experience-summary.component.html',
  styleUrl: './experience-summary.component.scss',
})
export class ExperienceSummaryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('radarCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  public expirenceYears: number;
  private chart: Chart | null = null;
  private langSub: Subscription | null = null;

  private readonly skillValues = [90, 70, 70, 90, 60];
  private readonly skillKeys = [
    'experience.frontendDev',
    'experience.uxDesing',
    'experience.informationArchitecture',
    'experience.devDesignIntegration',
    'experience.interactivePrototyping',
  ];

  constructor(private translocoService: TranslocoService) {
    this.expirenceYears = this.calculateExperienceYears();
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.langSub = this.translocoService.langChanges$.subscribe(() => {
      this.updateChartLabels();
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
    this.langSub?.unsubscribe();
  }

  calculateExperienceYears(): any {
    const startDate = new Date(2018, 7, 31);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - startDate.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffInYears);
  }

  private getLabels(canvasWidth?: number): string[][] {
    const width = canvasWidth ?? this.canvasRef.nativeElement.clientWidth;
    return this.skillKeys.map((key) =>
      this.wrapLabel(
        this.translocoService.translate(key),
        this.wrapMaxWidth(width),
      ),
    );
  }

  private wrapLabel(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  /*
   * Caratteri massimi per riga dei label calibrati sulle fasce CSS reali:
   * < 250px → 10 char  (desktop min, clamp 200–250px)
   * < 350px → 13 char  (desktop mid + mobile piccolo, 250–350px)
   * < 500px → 16 char  (tablet 769–1024px ~380–500px + mobile medio)
   *  ≥ 500px → 20 char (mobile/tablet larghi, fino a ~740px)
   */
  private wrapMaxWidth(width: number): number {
    // if (width < 250) return 10;
    // if (width < 350) return 13;
    // if (width < 500) return 16;
    return 20;
  }

  /*
   * Scala la font size dei label del radar in base alla larghezza del canvas:
   * < 320px → 9px  (smartphone piccoli)
   * < 480px → 10px (smartphone standard)
   * < 640px → 11px (tablet piccoli)
   *  ≥ 640px → 13px (tablet/desktop)
   */
  private pointLabelFontSize(width: number): number {
    if (width < 250) return 10;
    if (width < 350) return 12;
    if (width < 500) return 14;
    return 16;
  }

  private initChart(): void {
    const initialSize =
      this.canvasRef.nativeElement.parentElement?.clientWidth ?? 400;
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'radar',

      data: {
        labels: this.getLabels(initialSize),
        datasets: [
          {
            data: this.skillValues,
            backgroundColor: 'rgba(255, 242, 0, 0.15)',
            borderColor: 'rgb(255, 242, 0)',
            pointBackgroundColor: 'rgb(255, 242, 0)',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        layout: {
          padding: { top: 0, bottom: 8, left: 8, right: 8 },
        },
        onResize: (chart, size) => {
          const scale = chart.options.scales?.['r'] as any;
          if (scale?.pointLabels?.font) {
            scale.pointLabels.font.size = this.pointLabelFontSize(size.width);
          }
          chart.data.labels = this.getLabels(size.width);
          chart.update('none');
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              display: false,
              stepSize: 20,
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.15)',
            },
            angleLines: {
              color: 'rgba(255, 255, 255, 0.25)',
            },
            pointLabels: {
              color: '#ffffff',
              font: {
                size: this.pointLabelFontSize(initialSize),
                family: 'Poppins',
              },
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    });
  }

  private updateChartLabels(): void {
    if (!this.chart) return;
    this.chart.data.labels = this.getLabels();
    this.chart.update();
  }
}
