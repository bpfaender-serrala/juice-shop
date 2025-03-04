import {
  Component,
  type OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core'

interface LineMarker {
  marked: boolean
  lineNumber: number
}

@Component({
  selector: 'app-code-area',
  templateUrl: './code-area.component.html',
  styleUrls: ['./code-area.component.scss']
})
export class CodeAreaComponent implements OnInit {
  @Input('code')
  public code: string = ''

  @Input('vulnLines')
  public vulnLines: number[]

  public lineMarkers: LineMarker[]

  @Output()
    addLine = new EventEmitter<number[]>()

  public langs = ['javascript', 'typescript', 'json', 'yaml']

  ngOnInit (): void {
    this.lineMarkers = this.code.split('\n').map((line, lineIndex) => {
      return {
        lineNumber: lineIndex + 1,
        marked: false
      }
    })
  }

  selectLines (lineNumber): void {
    
    const marker = this.lineMarkers[lineNumber - 1]
    marker.marked = !marker.marked

    
    const markedLineNumbers: number[] = []
    for (const { marked, lineNumber } of this.lineMarkers) {
      if (marked) {
        markedLineNumbers.push(lineNumber)
      }
    }
    this.addLine.emit(markedLineNumbers)
  }
}
